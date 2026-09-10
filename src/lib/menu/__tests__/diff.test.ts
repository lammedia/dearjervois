import assert from "node:assert/strict";
import { test } from "node:test";
import { describeDiff, diffMenus } from "../diff";
import type { Menu, MenuItem } from "../types";

function item(name: string, price: string, extra: Partial<MenuItem> = {}): MenuItem {
  return { _key: `k-${name}`, name, price, order: 0, ...extra };
}

function menu(sections: Menu["sections"]): Menu {
  return {
    _id: "menu",
    title: "Menu",
    slug: "menu",
    version: 1,
    updatedAt: "2026-01-01T00:00:00.000Z",
    sections,
  };
}

/** 40 live items across two sections, numbered so they are easy to perturb. */
function baseSections() {
  const make = (prefix: string, n: number, from: number) =>
    Array.from({ length: n }, (_, i) =>
      item(`${prefix} ${from + i}`, `${10 + from + i}`),
    );

  return [
    { _key: "s1", title: "Brunch", order: 0, items: make("Brunch dish", 20, 1) },
    { _key: "s2", title: "Bowls", order: 1, items: make("Bowl", 20, 1) },
  ];
}

test("reports the brief's scenario: 42 detected, 34 unchanged, 5 prices, 2 new, 1 removed", () => {
  const live = menu(baseSections());

  // Build the incoming menu: change 5 prices, add 2, remove 1.
  const next = baseSections();
  for (let i = 0; i < 5; i++) {
    next[0].items[i] = { ...next[0].items[i], price: "99" };
  }
  next[1].items.push(item("Bowl 21", "26"), item("Bowl 22", "27"));
  next[0].items.splice(19, 1); // drop one Brunch dish

  const diff = diffMenus(live, menu(next));

  assert.equal(diff.summary.detected, 41);
  assert.equal(diff.summary.unchanged, 34);
  assert.equal(diff.summary.priceChanged, 5);
  assert.equal(diff.summary.added, 2);
  assert.equal(diff.summary.removed, 1);
  assert.deepEqual(describeDiff(diff).slice(0, 2), [
    "41 items detected",
    "34 unchanged",
  ]);
});

test("a price change always blocks auto-publish", () => {
  const live = menu([
    { _key: "s", title: "Brunch", order: 0, items: [item("Eggs", "22")] },
  ]);
  const next = menu([
    { _key: "s", title: "Brunch", order: 0, items: [item("Eggs", "26")] },
  ]);

  const diff = diffMenus(live, next);
  assert.equal(diff.summary.priceChanged, 1);
  assert.equal(diff.safeToAutoPublish, false);
});

test("cosmetic price formatting is not a change", () => {
  const live = menu([
    { _key: "s", title: "Brunch", order: 0, items: [item("Eggs", "22")] },
  ]);
  const next = menu([
    { _key: "s", title: "Brunch", order: 0, items: [item("Eggs", "$22.00")] },
  ]);

  assert.equal(diffMenus(live, next).summary.unchanged, 1);
});

test("a near-identical name is reported as a rename, not add+remove", () => {
  const live = menu([
    {
      _key: "s",
      title: "Brunch",
      order: 0,
      items: [item("Kimchi fried rice", "24")],
    },
  ]);
  const next = menu([
    {
      _key: "s",
      title: "Brunch",
      order: 0,
      items: [item("Kimchi Fried Rice bowl", "24")],
    },
  ]);

  const diff = diffMenus(live, next);
  assert.equal(diff.summary.renamed, 1);
  assert.equal(diff.summary.added, 0);
  assert.equal(diff.summary.removed, 0);
  assert.equal(diff.safeToAutoPublish, false);
});

test("a hand-edited item flags for review when the PDF disagrees", () => {
  const live = menu([
    {
      _key: "s",
      title: "Brunch",
      order: 0,
      items: [
        item("Eggs", "22", { source: "manual", description: "House note" }),
      ],
    },
  ]);
  const next = menu([
    {
      _key: "s",
      title: "Brunch",
      order: 0,
      items: [item("Eggs", "22", { description: "From the PDF" })],
    },
  ]);

  const diff = diffMenus(live, next);
  assert.equal(diff.entries[0].kind, "content-changed");
  assert.equal(diff.entries[0].needsReview, true);
});

test("a dropped section reports its items rather than vanishing", () => {
  const live = menu(baseSections());
  const next = menu([baseSections()[0]]);

  const diff = diffMenus(live, next);
  assert.deepEqual(diff.sectionsRemoved, ["Bowls"]);
  assert.equal(diff.summary.removed, 20);
});

test("low extractor confidence blocks auto-publish even when values match", () => {
  const live = menu([
    { _key: "s", title: "Brunch", order: 0, items: [item("Eggs", "22")] },
  ]);
  const next = menu([
    {
      _key: "s",
      title: "Brunch",
      order: 0,
      items: [item("Eggs", "24", { confidence: 0.4 })],
    },
  ]);

  assert.equal(diffMenus(live, next).safeToAutoPublish, false);
});
