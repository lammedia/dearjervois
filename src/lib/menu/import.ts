import type { MenuDiff } from "./diff";
import type { ExtractionWarning } from "./extract";
import type { Menu, MenuPdf } from "./types";

/**
 * The upload → extract → compare → preview → approve → publish workflow.
 *
 * Modelled as an explicit state machine so that "published" is only reachable
 * through "approved", and "approved" only through a diff a human has seen.
 * There is no transition from extraction straight to the live menu.
 */

export type ImportStatus =
  | "uploaded"
  | "extracting"
  | "extracted"
  | "failed"
  | "awaiting-review"
  | "approved"
  | "published"
  | "discarded";

export type MenuImport = {
  _id: string;
  status: ImportStatus;
  pdf: MenuPdf;
  /** What the extractor produced. Never rendered to the public site. */
  candidate?: Menu;
  diff?: MenuDiff;
  warnings: ExtractionWarning[];
  error?: string;
  /** Snapshot of the live menu at approval time, so publishing is reversible. */
  previousMenu?: Menu;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
};

/**
 * Whether an import may be published.
 *
 * Both conditions matter: an import that was never reviewed cannot publish even
 * if the diff looks clean, and an approved import that has since acquired
 * review flags cannot publish either.
 */
export function canPublish(record: MenuImport): {
  ok: boolean;
  reason?: string;
} {
  if (record.status !== "approved") {
    return { ok: false, reason: `Import is "${record.status}", not approved.` };
  }
  if (!record.candidate || !record.diff) {
    return { ok: false, reason: "Import has no extracted menu to publish." };
  }
  if (record.diff.summary.needsReview > 0) {
    return {
      ok: false,
      reason: `${record.diff.summary.needsReview} change(s) still flagged for review.`,
    };
  }
  return { ok: true };
}

/**
 * Apply an approved import to the live menu.
 *
 * Item `_key`s are carried over from the matched live items so identity — and
 * therefore the next diff — stays stable across imports. Returns a new Menu;
 * persisting it (and retaining `previousMenu` for rollback) is the caller's job.
 */
export function applyImport(live: Menu, record: MenuImport): Menu {
  const check = canPublish(record);
  if (!check.ok) throw new Error(`Cannot publish import: ${check.reason}`);

  const candidate = record.candidate!;

  return {
    ...live,
    pdf: record.pdf,
    version: live.version + 1,
    updatedAt: new Date().toISOString(),
    sections: candidate.sections,
  };
}
