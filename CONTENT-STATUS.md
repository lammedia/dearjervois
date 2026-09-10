# Design provenance & outstanding assets

## Where the design came from

| Source | Used for | Weight |
| --- | --- | --- |
| Screenshots of `/2026/` (home, and the menu-page reference) | Colour, type, layout, section order, nav, buttons, ornaments | **Primary** |
| `viprestaurant2024.zip` (Vamtam "VIP Restaurant" v19.1) | Container width, mobile-nav breakpoint, sticky-header behaviour | Structural only |
| Public listings (Yelp, OpenTable, Tripadvisor, Neat Places, Urban List) | Address, phone, email, hours, dish names | Facts only |

The live site remains unreachable from this build environment (the egress proxy
denies `dearjervois.net`), so the screenshots were the only view of the design.

## What the theme ZIP actually contained

It is a stock ThemeForest theme, and its compiled site options in
`cache/variables.less` describe the **previous** Dear Jervois design, not the
2026 one:

- `@h1..h6-font-family: 'Roboto Slab'` throughout
- `@accent-color-1: #cb7152` (terracotta), `@body-background: #ffffff`
- Logo URLs pointing at `wp-content/uploads/2020/01/...`
- File dated June 2024, before the redesign

None of that matches the screenshots — navy and gold on dark grounds, a script
face, letterspaced Trajan-style caps. Per the brief, the screenshots took
precedence and the ZIP's colour and type values were discarded.

Three things from the ZIP were genuinely useful, because they are structural
rather than stylistic, and all three are carried through:

- `@site-max-width: 1260px` → `--container-site`
- `.responsive-layout` at `max-width: 900px` → the `nav:` breakpoint
- `@sticky-header: 1` with white sticky menu text → the header behaviour

The ZIP contains **no Dear Jervois photography** — only theme chrome (icon
fonts, sprites, a 404 background). Nothing WordPress, PHP, Elementor, Vamtam or
WooCommerce was carried into this project.

## Typefaces — close matches, not confirmed

The `/2026/` families could not be read from source. These were chosen against
the screenshots and are the **top item needing confirmation**:

| Role | Using | Confidence |
| --- | --- | --- |
| Letterspaced caps — logo, nav, titles, buttons, menu items | **Cinzel** | High. Letterforms match closely. |
| Script — hero line, eyebrows, testimonial body | **Parisienne** | **Medium.** The look is right; the exact face is a guess. |
| Body — paragraphs, form fields, captions | **Jost** | Medium. A light geometric sans consistent with the screenshots. |

All three are swapped in `src/app/layout.tsx` alone — every component reads
`--font-display` / `--font-script` / `--font-body`.

## Colours

Read from the screenshots, defined once in `src/app/globals.css`:

| Token | Value | Where |
| --- | --- | --- |
| `--color-navy` | `#12306b` | Menu band, alternating menu sections |
| `--color-teal` | `#15262e` | Testimonials, booking |
| `--color-ink` | `#0d1418` | Page ground, footer |
| `--color-gold` | `#c6a15b` | Titles, labels, borders, rules |
| `--color-gold-soft` | `#d9b87c` | Eyebrows, prices |
| `--color-cream` | `#f5f1e8` | Reserved for light-ground use |

These are eyedropped from compressed screenshots, so treat them as very close
rather than exact. If the client can supply brand hex values, replacing this
block restyles the whole site.

## Still missing

1. **All photography.** Every image renders as a sized placeholder naming what
   belongs there (`src/components/Figure.tsx`). Layout and crops are correct;
   only the files are absent. Needed: hero (originally a looping video of latte
   art), one testimonial portrait, three menu cards (all-day / dinner /
   breakfast), about-page team shot, and the interior page hero bands.
2. **The logo artwork.** Referenced by the theme as
   `DearJervois_HerneBay_Square_Logo_240px.png` but not in the ZIP. The wordmark
   is currently set as live text in Cinzel, which matches the screenshots.
3. **The real menu.** `DearJervois_2026.pdf` is on the blocked domain. The
   provisional items in `src/content/menu.ts` come from public listings and
   carry **no prices**, because none could be verified. The first PDF import
   replaces the lot.
4. **Sections not in the screenshots.** The supplied captures jump from the hero
   to the testimonials, so any intervening home-page section is unknown. Nothing
   was invented to fill the gap.
5. **The actual `/2026/` menu page.** The menu screenshot supplied is the Qode
   "Laurent" demo, which the `/2026/` design clearly follows. The menu page was
   built to that pattern — gold caps name, leader rule, price — but no Laurent
   assets were copied, and it has not been checked against Dear Jervois's own
   menu page.
6. **Copy** for About, Contact and Privacy beyond what listings confirm.

## Content facts confirmed by two or more sources

234 Jervois Road, Herne Bay, Auckland · hi@dearjervois.net · 09 376 7278 ·
Mon–Fri 7am–4pm, Sat–Sun 8am–4pm · nav order Home, About us, Book now, Menu,
Contact us · bookings via OpenTable.
