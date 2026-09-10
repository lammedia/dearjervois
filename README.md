# Dear Jervois

> Nestled in the heart of Herne Bay Auckland, Dear Jervois is a casual dining
> space that caters for all diets and preferences in a way that promotes health
> and well being.

A clean rebuild of the Dear Jervois `/2026/` site in Next.js, structured so all
content can move to Sanity CMS without touching the rendering layer.

Nothing from the WordPress installation is used at runtime: no PHP, Elementor,
Vamtam or WooCommerce. The existing live site is untouched.

> **`CONTENT-STATUS.md`** records where each design decision came from, which
> typefaces are close matches rather than confirmed, and what assets are still
> outstanding. Read it before assuming anything here is final.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prerenders every page
npm run lint
npm run typecheck
npm test           # menu diff engine
```

## Layout

```
src/
  app/
    globals.css        design tokens — the only place colours and fonts live
    layout.tsx         typefaces, header/footer shell
    [slug]/            one dynamic route drives every page
  components/
    Container.tsx      the single source of horizontal gutters (1260px)
    Section.tsx        the single source of vertical rhythm + section grounds
    SectionTitle.tsx   script eyebrow + ornamented caps title
    Figure.tsx         image, or a sized placeholder naming what is missing
    sections/          one component per page-section type
    menu/              the structured menu renderer
  content/             local content, shaped exactly as Sanity will return it
  lib/
    types.ts           the page content contract
    content.ts         THE SEAM — swap this file for Sanity, nothing else
    menu/              menu model, diff engine, import state machine
sanity/schemas/        schemas mirroring lib/types.ts and lib/menu/types.ts
```

**Content flows one way.** `lib/content.ts` → a `Page` of typed `Section` blocks
→ `SectionRenderer` picks a component per `_type`. No component reaches into
`src/content` directly, which is what makes the CMS swap a one-file change.

**Adding a section type** means: a type in `lib/types.ts`, a case in
`components/sections/index.tsx`, a schema in `sanity/schemas/objects.ts`.

## The menu

The menu is deliberately not page copy. It is a structured document produced by
a PDF import pipeline, so the client keeps their existing habit of publishing a
finished PDF and never retypes items into a CMS:

```
upload PDF → extract → diff against live → preview → approve → publish
```

The model, diff engine, publish gate and frontend components all exist and are
tested; the PDF parser itself is phase 2 and slots in behind the `MenuExtractor`
interface. A parse can never reach the live menu without a human approving the
diff — see `sanity/README.md` for the rules and where each is enforced.

## Design notes

Recreated from the supplied `/2026/` screenshots. Type, colour and proportion
follow the original; the changes below are deliberate improvements, not a change
of direction.

- **Responsive composition, not desktop-stacked.** Menu cards go 3-up → 2-up with
  the odd card centred → 1-up, and their crop shortens on phones so three cards
  don't become a marathon scroll. The testimonial portrait crops to 4:3 on
  phones and 4:5 on desktop. The booking form is 2×2 before it is a 4-across row.
  Verified at 1440 / 1024 / 768 / 390 with zero horizontal overflow.
- **Mobile nav is a full-screen overlay**, not a squashed desktop bar. It
  collapses at 900px — the WordPress theme's own breakpoint. It is a sibling of
  `<header>` rather than a child, because the header's `backdrop-filter` would
  otherwise become the containing block for a fixed descendant and collapse it.
- **Hero uses `svh`, not `vh`**, so the CTA is not pushed under a mobile
  browser's retracting toolbar on first paint.
- **Accessibility is structural:** skip link, one `h1` per page, sections
  labelled by their own headings, `aria-current` on the active nav item, a real
  tablist for the testimonial pager with a live region, labelled booking fields
  (the original's were unlabelled), 44px+ touch targets throughout, focus rings
  never removed, alt text required at the schema level, and a
  `prefers-reduced-motion` block.
- **Performance:** every page prerenders to static HTML, fonts self-host via
  `next/font` (no render-blocking third-party request), the ornament is inline
  SVG rather than an icon font, and the booking form is a plain GET hand-off
  instead of a third-party widget bundle on the critical path.
- **The script face is reserved** for the home page's one statement line and for
  eyebrows. Interior page titles use the ornamented caps treatment.
