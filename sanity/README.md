# Sanity

Schemas only — the Studio and client are not installed yet, deliberately: the
site runs entirely on `src/content` until a dataset exists, so there is no
half-wired integration to maintain in the meantime. The schemas here define the
shape that integration will take.

## Wiring it up

1. `npm install sanity next-sanity @sanity/image-url`
2. Copy `.env.example` to `.env.local` and fill in the project ID and dataset.
3. Delete `sanity/schemas/types.ts` and point the `SchemaTypeDefinition` / `Rule`
   imports at the `sanity` package. Create `sanity.config.ts` at the repo root
   importing `schemaTypes` from `sanity/schemas`.
4. Replace the four function bodies in `src/lib/content.ts` with GROQ fetches.
   Field names match `src/lib/types.ts` and `src/lib/menu/types.ts` exactly, so
   the projections are close to passthrough:

   ```groq
   *[_type == "page" && slug.current == $slug][0]{
     "slug": slug.current, title, description, sections
   }
   ```

   Images need one mapping step — `urlFor(image).url()` into `ImageRef.src`,
   `asset->altText` or the sibling `alt` field into `ImageRef.alt`, and the
   hotspot into `ImageRef.focal`. That is the only place the two shapes diverge.

Nothing in `src/app` or `src/components` changes. That is the point of the
`src/lib/content.ts` seam.

## What the client edits

`siteSettings` holds opening hours, address, phone, email and both navigations,
so none of it is hard-coded. `page` documents hold the home page and the
interior pages as ordered lists of section blocks. Menus are separate — see
below.

## The menu workflow

The client's existing habit is to produce a finished PDF. They should not be
retyping it into a CMS, so the PDF is the input and the structured menu is
derived from it:

```
upload PDF → extract → diff against live → preview → approve → publish
```

Modelled by two documents:

- **`menu`** — the live, structured, customer-facing menu. This is what the
  website renders. The uploaded PDF hangs off it as a secondary download.
- **`menuImport`** — one upload and its review. Holds the extracted candidate,
  the diff summary, any extractor warnings, and a snapshot of the menu as it was
  before, so a publish can be rolled back.

### What is already built

| Piece | Location | State |
| --- | --- | --- |
| Data model | `src/lib/menu/types.ts` | Done |
| Diff engine | `src/lib/menu/diff.ts` | Done, unit tested |
| Publish gate / state machine | `src/lib/menu/import.ts` | Done |
| Extractor interface | `src/lib/menu/extract.ts` | Interface done, parser is phase 2 |
| Frontend components | `src/components/menu/` | Done, data-driven |
| Sanity schemas | `sanity/schemas/menu.ts` | Done |

Phase 2 is the parser itself: implement `MenuExtractor` and hand its result to
`diffMenus`. Everything downstream of that already exists.

### The safety rules, and where they live

The brief's hard requirement is that a parsing error must never silently change
a live price. That is enforced in code, not by convention:

- `diffMenus` flags **every** price change for review — a correct price change
  still needs a human to say yes.
- New items, removed items and fuzzy name matches ("renamed") are always
  flagged. A near-match is reported as a rename for confirmation, never merged.
- An item whose live `source` is `"manual"` is flagged whenever the PDF
  disagrees with it, so a hand-made correction survives a re-import.
- Any item the extractor was less than 90% sure about is flagged.
- A section missing from the new PDF reports all of its items as removals rather
  than dropping the category silently.
- `canPublish()` refuses unless the import is `approved` **and** has zero
  outstanding flags. There is no path from extraction to the live menu that
  skips a human.
- Cosmetic price differences (`$24.00` vs `24`) are normalised, so the review
  queue only contains real changes.

`describeDiff()` produces the client-facing summary, e.g.
`42 items detected · 34 unchanged · 5 prices changed · 2 new items · 1 removed`.

### Rollback

Each published import keeps `previousMenu`, and `menu.version` increments on
publish, so the prior menu can be inspected or restored, and the original PDF of
every upload is retained.
