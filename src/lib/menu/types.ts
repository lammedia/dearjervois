/**
 * The structured menu model.
 *
 * This is the contract the whole menu pipeline agrees on:
 *
 *   PDF upload → extractor → Menu → diff against live Menu → human approval
 *               → Sanity → getMenu() → <MenuSectionList> components
 *
 * The rendering components consume `Menu` and nothing else, so replacing the
 * data source (local file today, Sanity tomorrow) or the producer (hand-entry
 * today, PDF extraction tomorrow) never touches the frontend.
 */

export type DietaryTag =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "contains-nuts";

export const DIETARY_LABELS: Record<DietaryTag, string> = {
  vegan: "VG",
  vegetarian: "V",
  "gluten-free": "GF",
  "dairy-free": "DF",
  "contains-nuts": "N",
};

export const DIETARY_FULL: Record<DietaryTag, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  "gluten-free": "Gluten free",
  "dairy-free": "Dairy free",
  "contains-nuts": "Contains nuts",
};

export type MenuItem = {
  /**
   * Stable identity, assigned on first import and preserved across re-imports.
   * This is what lets the diff say "price changed" rather than
   * "one item removed, one added" — never derive it from the name.
   */
  _key: string;
  name: string;
  description?: string;
  /**
   * Deliberately a string. Real menus carry "24", "12 / 18", "market price"
   * and "+4", none of which survive being forced into a number.
   */
  price?: string;
  dietary?: DietaryTag[];
  /** Explicit, so section ordering from the PDF is preserved and editable. */
  order: number;
  /**
   * Where the current values came from. A human edit in the CMS sets this to
   * "manual", which the importer treats as protected — see MergePolicy.
   */
  source?: "pdf" | "manual";
  /** Extractor confidence, 0–1. Low values force human review before publish. */
  confidence?: number;
};

export type MenuSection = {
  _key: string;
  title: string;
  /** The script line above the title, e.g. "Starters" above "APPETIZERS". */
  eyebrow?: string;
  note?: string;
  order: number;
  items: MenuItem[];
};

export type MenuPdf = {
  url: string;
  filename: string;
  uploadedAt: string;
  /** Retained so a previous menu can be inspected or restored. */
  version: number;
};

export type Menu = {
  _id: string;
  title: string;
  slug: string;
  intro?: string;
  /** The original upload, offered as a secondary "Download PDF" action only. */
  pdf?: MenuPdf;
  version: number;
  updatedAt: string;
  sections: MenuSection[];
};

/** Flattened item count — the "42 items detected" figure. */
export function countItems(menu: Pick<Menu, "sections">): number {
  return menu.sections.reduce((n, section) => n + section.items.length, 0);
}
