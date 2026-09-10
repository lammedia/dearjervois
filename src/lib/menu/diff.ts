import type { Menu, MenuItem, MenuSection } from "./types";
import { countItems } from "./types";

/**
 * Diffing a freshly extracted menu against the live one.
 *
 * This is the safety mechanism behind the brief's hard rule: a parsing error
 * must never silently change a live price. Nothing here writes anything — it
 * produces a report for a human to approve, and the publish step consumes that
 * approval rather than the extraction directly.
 */

export type ChangeKind =
  | "unchanged"
  | "price-changed"
  | "content-changed"
  | "added"
  | "removed"
  | "renamed";

export type FieldChange = { field: string; before?: string; after?: string };

export type DiffEntry = {
  kind: ChangeKind;
  sectionTitle: string;
  /** Present unless the item is new. */
  itemKey?: string;
  name: string;
  changes: FieldChange[];
  /**
   * True when the extractor was unsure, or when a match was made fuzzily.
   * Any entry flagged here must be resolved by a human before publishing.
   */
  needsReview: boolean;
  confidence?: number;
};

export type DiffSummary = {
  detected: number;
  unchanged: number;
  priceChanged: number;
  contentChanged: number;
  added: number;
  removed: number;
  renamed: number;
  /** Entries a human must look at before this import can be published. */
  needsReview: number;
};

export type MenuDiff = {
  summary: DiffSummary;
  entries: DiffEntry[];
  sectionsAdded: string[];
  sectionsRemoved: string[];
  /** False when anything is flagged; the publish action reads this. */
  safeToAutoPublish: boolean;
};

/** Below this, a fuzzy name match is treated as two different items. */
const RENAME_THRESHOLD = 0.82;

/** Below this, an extracted value is never trusted without human review. */
const CONFIDENCE_THRESHOLD = 0.9;

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalisePrice(value?: string): string {
  // "$24.00", "24", "$24" all mean the same thing on a printed menu.
  return (value ?? "")
    .replace(/[^0-9./|+-]/g, "")
    .replace(/\.00\b/g, "")
    .trim();
}

/** Character-level Levenshtein similarity, 0–1. */
function editSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }

  return 1 - previous[b.length] / Math.max(a.length, b.length);
}

/**
 * Word-level Dice coefficient. Edit distance alone under-scores a name that
 * merely gained or lost a word ("Kimchi fried rice" -> "Kimchi fried rice
 * bowl" scores only 0.77), which is exactly the rename shape worth catching.
 * Dice is tolerant of that while still separating genuinely different items
 * ("Rice" vs "Rice bowl" scores 0.67 and stays two items).
 */
function tokenSimilarity(a: string, b: string): number {
  const left = a.split(" ").filter(Boolean);
  const right = new Set(b.split(" ").filter(Boolean));
  if (!left.length || !right.size) return 0;

  const shared = left.filter((token) => right.has(token)).length;
  return (2 * shared) / (left.length + right.size);
}

/** Used only to spot renames for review, never to merge silently. */
function similarity(a: string, b: string): number {
  return Math.max(editSimilarity(a, b), tokenSimilarity(a, b));
}

function matchItem(
  candidate: MenuItem,
  pool: MenuItem[],
): { item: MenuItem; exact: boolean } | null {
  const target = normalise(candidate.name);

  const exact = pool.find((item) => normalise(item.name) === target);
  if (exact) return { item: exact, exact: true };

  let best: MenuItem | null = null;
  let bestScore = 0;
  for (const item of pool) {
    const score = similarity(target, normalise(item.name));
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return best && bestScore >= RENAME_THRESHOLD
    ? { item: best, exact: false }
    : null;
}

function diffFields(before: MenuItem, after: MenuItem): FieldChange[] {
  const changes: FieldChange[] = [];

  if (normalisePrice(before.price) !== normalisePrice(after.price)) {
    changes.push({ field: "price", before: before.price, after: after.price });
  }
  if ((before.description ?? "") !== (after.description ?? "")) {
    changes.push({
      field: "description",
      before: before.description,
      after: after.description,
    });
  }

  const beforeTags = [...(before.dietary ?? [])].sort().join(",");
  const afterTags = [...(after.dietary ?? [])].sort().join(",");
  if (beforeTags !== afterTags) {
    changes.push({ field: "dietary", before: beforeTags, after: afterTags });
  }

  return changes;
}

function sectionsByTitle(sections: MenuSection[]): Map<string, MenuSection> {
  return new Map(sections.map((s) => [normalise(s.title), s]));
}

/**
 * Compare an extracted menu against the live one.
 *
 * Items are matched within their section by normalised name, falling back to a
 * fuzzy match that is reported as a rename needing review — never applied
 * silently. Items whose live `source` is "manual" are always flagged, so a
 * hand-made correction is never overwritten by a re-import without a human
 * saying so.
 */
export function diffMenus(live: Menu, incoming: Menu): MenuDiff {
  const entries: DiffEntry[] = [];
  const liveSections = sectionsByTitle(live.sections);
  const incomingSections = sectionsByTitle(incoming.sections);

  const sectionsAdded: string[] = [];
  const sectionsRemoved: string[] = [];

  for (const section of incoming.sections) {
    const liveSection = liveSections.get(normalise(section.title));
    if (!liveSection) sectionsAdded.push(section.title);

    // Consumed as we match, so two similarly named items can't both claim the
    // same live row.
    const pool = [...(liveSection?.items ?? [])];

    for (const item of section.items) {
      const lowConfidence =
        item.confidence !== undefined && item.confidence < CONFIDENCE_THRESHOLD;
      const match = matchItem(item, pool);

      if (!match) {
        entries.push({
          kind: "added",
          sectionTitle: section.title,
          name: item.name,
          changes: [
            { field: "name", after: item.name },
            { field: "price", after: item.price },
          ],
          needsReview: true, // a new item is always worth a human glance
          confidence: item.confidence,
        });
        continue;
      }

      pool.splice(pool.indexOf(match.item), 1);
      const changes = diffFields(match.item, item);
      const protectedByEdit =
        match.item.source === "manual" && changes.length > 0;

      if (!match.exact) {
        entries.push({
          kind: "renamed",
          sectionTitle: section.title,
          itemKey: match.item._key,
          name: item.name,
          changes: [
            { field: "name", before: match.item.name, after: item.name },
            ...changes,
          ],
          needsReview: true,
          confidence: item.confidence,
        });
        continue;
      }

      if (changes.length === 0) {
        entries.push({
          kind: "unchanged",
          sectionTitle: section.title,
          itemKey: match.item._key,
          name: item.name,
          changes: [],
          needsReview: false,
          confidence: item.confidence,
        });
        continue;
      }

      const priceChanged = changes.some((c) => c.field === "price");
      entries.push({
        kind: priceChanged ? "price-changed" : "content-changed",
        sectionTitle: section.title,
        itemKey: match.item._key,
        name: item.name,
        changes,
        // Money and hand-edits always get eyes on them.
        needsReview: priceChanged || protectedByEdit || lowConfidence,
        confidence: item.confidence,
      });
    }

    // Anything left unmatched in this section is gone from the new PDF.
    for (const orphan of pool) {
      entries.push({
        kind: "removed",
        sectionTitle: section.title,
        itemKey: orphan._key,
        name: orphan.name,
        changes: [{ field: "name", before: orphan.name }],
        needsReview: true,
      });
    }
  }

  // Whole sections missing from the new PDF: report every item as removed
  // rather than quietly dropping a category.
  for (const section of live.sections) {
    if (incomingSections.has(normalise(section.title))) continue;
    sectionsRemoved.push(section.title);
    for (const item of section.items) {
      entries.push({
        kind: "removed",
        sectionTitle: section.title,
        itemKey: item._key,
        name: item.name,
        changes: [{ field: "name", before: item.name }],
        needsReview: true,
      });
    }
  }

  const count = (kind: ChangeKind) =>
    entries.filter((e) => e.kind === kind).length;

  const summary: DiffSummary = {
    detected: countItems(incoming),
    unchanged: count("unchanged"),
    priceChanged: count("price-changed"),
    contentChanged: count("content-changed"),
    added: count("added"),
    removed: count("removed"),
    renamed: count("renamed"),
    needsReview: entries.filter((e) => e.needsReview).length,
  };

  return {
    summary,
    entries,
    sectionsAdded,
    sectionsRemoved,
    safeToAutoPublish: summary.needsReview === 0,
  };
}

/** The one-line report the CMS shows after an upload. */
export function describeDiff(diff: MenuDiff): string[] {
  const { summary } = diff;
  const lines = [`${summary.detected} items detected`];

  if (summary.unchanged) lines.push(`${summary.unchanged} unchanged`);
  if (summary.priceChanged)
    lines.push(
      `${summary.priceChanged} price${summary.priceChanged === 1 ? "" : "s"} changed`,
    );
  if (summary.contentChanged)
    lines.push(`${summary.contentChanged} description/tag changed`);
  if (summary.added)
    lines.push(`${summary.added} new item${summary.added === 1 ? "" : "s"}`);
  if (summary.removed)
    lines.push(
      `${summary.removed} removed item${summary.removed === 1 ? "" : "s"}`,
    );
  if (summary.renamed)
    lines.push(`${summary.renamed} possibly renamed`);

  return lines;
}
