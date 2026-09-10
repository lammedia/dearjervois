import type { SiteSettings } from "@/lib/types";

/**
 * Navigation matches the /2026/ header exactly, in the order shown in the
 * screenshots. Contact details are confirmed by public listings; see
 * CONTENT-STATUS.md for provenance.
 *
 * All of this becomes a single `siteSettings` document in Sanity so the client
 * can edit hours and contact details without a deploy.
 */
export const site: SiteSettings = {
  name: "Dear Jervois",
  tagline: "A little taste of everything",
  nav: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Book now", href: "/book" },
    { label: "Menu", href: "/menu" },
    { label: "Contact us", href: "/contact" },
  ],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Book now", href: "/book" },
    { label: "Contact us", href: "/contact" },
    { label: "Privacy policy", href: "/privacy-policy" },
  ],
  address: {
    street: "234 Jervois Road",
    suburb: "Herne Bay",
    city: "Auckland",
    country: "New Zealand",
  },
  email: "hi@dearjervois.net",
  phone: "09 376 7278",
  hours: [
    { _key: "wk", days: "Monday – Friday", hours: "7am – 4pm" },
    { _key: "we", days: "Saturday – Sunday", hours: "8am – 4pm" },
  ],
  social: [],
};
