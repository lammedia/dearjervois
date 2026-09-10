# Content & visual status

## The blocker

The brief was to use `https://www.dearjervois.net/2026/` as the visual
specification. **That site is unreachable from this build environment** — the
network egress proxy denies `dearjervois.net` and `www.dearjervois.net`
outright (`403` on CONNECT), as it does `web.archive.org`. No HTML, CSS,
fonts, images, colour values, spacing or interaction behaviour could be
sampled, and no responsive widths could be inspected.

Nothing in this repository was copied from, or verified against, the live
design.

## What that means for this codebase

Split into two layers on purpose:

**Structure — done and believed correct.** Routing, the section/block content
model, the CMS seam, the Sanity schemas, accessibility scaffolding, static
generation, metadata. None of it depends on knowing what the site looks like.

**Visuals — placeholder, awaiting the spec.** Every value that encodes brand
identity is confined to two files and marked as such:

- `src/app/globals.css` — the `@theme` block (all colours, the two font
  variables). No component hard-codes a colour or typeface.
- `src/app/layout.tsx` — the `next/font` imports (Playfair Display + Inter,
  chosen as neutral stand-ins, not because the site uses them).

Applying the real brand is a change to those two files plus per-component
proportion tweaks — not a rewrite.

## Content provenance

Copy in `src/content` comes from public listings and search snippets
(Yelp, OpenTable, Tripadvisor, Neat Places, Urban List) and from search-result
excerpts of the site's own pages. Facts confirmed by more than one source:

- 234 Jervois Road, Herne Bay, Auckland
- hi@dearjervois.net · 09 376 7278
- Mon–Fri 7am–4pm, Sat–Sun 8am–4pm
- Page set: home, menu, dinners (DJ by Night), photo gallery,
  news and updates, reservation note, privacy policy
- Menu items named in listings (matcha waffles, kimchi fried rice, eggs
  benedict, breakfast tacos, smashed avocado, vegan/acai/poke bowls)

Anything not confirmed twice was left out rather than invented. Prices, full
menu text, the About/story copy, and all photography are absent — they need to
come from the site or the owners.

## To finish the rebuild

Either allow `dearjervois.net` through the egress policy and re-run this work,
or supply: full-page screenshots at ~375 / 768 / 1440px for each page, the
image assets, and the brand's typefaces and colour values.
