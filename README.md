# Dear Jervois

A clean rebuild of the Dear Jervois site in Next.js, structured so page content
can move to Sanity CMS without touching the rendering layer.

> **Read `CONTENT-STATUS.md` first.** The reference site was unreachable from
> the build environment, so the visual layer is placeholder pending the real
> design spec. The structure is complete.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of every page
npm run lint
npm run typecheck
```

## How it is put together

```
src/
  app/                 routes; one dynamic [slug] route drives every page
    globals.css        design tokens — the only place colours/fonts live
  components/
    Container.tsx      the single source of horizontal gutters
    Section.tsx        the single source of vertical rhythm
    sections/          one component per content block type
  content/             local content, shaped exactly like the CMS will be
  lib/
    types.ts           the content contract
    content.ts         THE SEAM — swap this file for Sanity, nothing else
sanity/schemas/        schemas mirroring lib/types.ts one-to-one
```

**Content flows one way:** `lib/content.ts` → a `Page` of typed `Section`
blocks → `SectionRenderer` picks a component per `_type`. No component reaches
into `src/content` directly, which is what makes the CMS swap a one-file
change. See `sanity/README.md`.

**Adding a block type** means: a type in `lib/types.ts`, a case in
`components/sections/index.tsx`, a schema in `sanity/schemas/objects.ts`.

## Choices worth knowing

- **Every page is statically generated** (`generateStaticParams`), so the site
  ships as HTML with no runtime data fetching.
- **Fonts are self-hosted** via `next/font`, so there is no render-blocking
  request to a third-party font host.
- **Spacing is centralised.** Sections never set their own padding; they
  compose `Section` + `Container`. This is what keeps gutters identical across
  pages at every width, which per-page padding tends not to.
- **Accessibility is structural, not retrofitted:** a skip link, one `h1` per
  page from the hero block, sections labelled by their own headings, visible
  focus rings that are never removed, `aria-current` on the active nav item,
  44px minimum touch targets, alt text required at the schema level so an
  editor cannot publish an image without it, and a `prefers-reduced-motion`
  block that disables transitions.
- **Mobile nav** is a disclosure, not a modal: `aria-expanded`/`aria-controls`,
  closes on Escape and on navigation.
- **Image-and-text sections** put the image first in source order so it leads
  when stacked, then restore the requested side with `order` from `md` up.
