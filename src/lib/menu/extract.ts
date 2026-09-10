import type { Menu } from "./types";

/**
 * The PDF extraction seam.
 *
 * Phase 2 implements a real extractor behind this interface; nothing else in
 * the system needs to know how extraction works, only that it returns a `Menu`
 * plus warnings. Keeping it an interface now means the diff, the review UI and
 * the frontend can all be built and tested against a fake.
 */

export type ExtractionWarning = {
  /** e.g. "price-ambiguous", "section-heading-uncertain", "ocr-fallback". */
  code: string;
  message: string;
  /** Where in the PDF, when the extractor can say. */
  page?: number;
  itemName?: string;
};

export type ExtractionResult = {
  menu: Menu;
  warnings: ExtractionWarning[];
  /** Overall 0–1. The review UI leads with this. */
  confidence: number;
  extractor: string;
  extractedAt: string;
};

export interface MenuExtractor {
  readonly name: string;
  /**
   * Parse a menu PDF into the structured model. Implementations must:
   *  - preserve section and item ordering as printed;
   *  - leave `price` as written ("24", "12 / 18", "market") — never coerce;
   *  - set a per-item `confidence` so the diff can gate publishing;
   *  - emit a warning rather than guessing when a line is ambiguous;
   *  - never invent an item that is not in the source.
   */
  extract(pdf: ArrayBuffer, options?: { filename?: string }): Promise<ExtractionResult>;
}

/**
 * Placeholder so the pipeline type-checks and the review flow can be exercised
 * end to end before the real parser exists. It refuses rather than returning an
 * empty menu, because an empty extraction that reached the diff would read as
 * "every item removed".
 */
export const notImplementedExtractor: MenuExtractor = {
  name: "not-implemented",
  async extract() {
    throw new Error(
      "No PDF extractor is configured yet. Wire one up in src/lib/menu/extract.ts (phase 2).",
    );
  },
};
