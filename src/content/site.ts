import type { SiteSettings } from "@/lib/types";

/**
 * Verified against public listings (Yelp, OpenTable, Tripadvisor, search
 * snippets of dearjervois.net). The live site itself is unreachable from this
 * environment, so anything not confirmed by two sources is left out rather
 * than guessed. See CONTENT-STATUS.md.
 */
export const site: SiteSettings = {
  name: "Dear Jervois",
  tagline: "Cafe & Venue — Herne Bay, Auckland",
  nav: [
    { label: "Menu", href: "/menu" },
    { label: "DJ by Night", href: "/dinners" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Reservations", href: "/reservations" },
  ],
  footerNav: [
    { label: "Menu", href: "/menu" },
    { label: "DJ by Night", href: "/dinners" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Reservations", href: "/reservations" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  address: {
    street: "234 Jervois Road",
    suburb: "Herne Bay",
    city: "Auckland",
    country: "New Zealand",
  },
  email: "hi@dearjervois.net",
  phone: "09 376 7278",
  social: [],
};
