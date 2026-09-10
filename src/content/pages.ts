import type { Page } from "@/lib/types";
import { site } from "./site";

const hoursRows = site.hours;

/**
 * Page content, shaped exactly as Sanity will return it.
 *
 * Section order on the home page follows the supplied screenshots. Image `src`
 * values are intentionally absent: no Dear Jervois photography was supplied, so
 * `Figure` renders a sized placeholder naming what belongs there rather than
 * standing in unrelated stock. Adding a file to /public and setting `src` is
 * the only step needed.
 */
export const pages: Page[] = [
  {
    slug: "",
    title: "Dear Jervois — Cafe & Venue, Herne Bay",
    description:
      "A little taste of everything. Casual dining on Jervois Road, Herne Bay, catering for all diets with organic New Zealand ingredients.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "A little taste of everything",
        size: "full",
        image: {
          src: "",
          alt: "Barista pouring latte art into a cup — full-bleed hero, originally a looping video",
        },
        ctas: [{ label: "View more", href: "/about" }],
      },
      {
        _type: "testimonials",
        _key: "testimonials",
        cta: { label: "View all", href: "/about#reviews" },
        items: [
          {
            _key: "t1",
            quote:
              "Had a late breaky here today! Absolutely love this café. It's always full, clearly very supported by all the regulars around Herne Bay. When you walk in, you're always greeted by the friendly staff, super attentive, and honestly always lovely to deal with. I sat down today and had the chilli eggs breakfast and you won't be disappointed. Huge portion, absolutely delicious! I'm already a regular, but you know I'll be back. Thank you so much to the staff!",
            name: "Jess Simmiss",
            role: "Hospitality Specialist",
            image: {
              src: "",
              alt: "Guest holding a blue cup of coffee with fern latte art",
            },
          },
        ],
      },
      {
        _type: "menuTeaser",
        _key: "menu-teaser",
        eyebrow: "Dear Jervois Tasty Offer",
        heading: "Our Menu",
        cards: [
          {
            _key: "all-day",
            label: "All day",
            caption: "Dear Jervois Menu",
            href: "/menu",
            image: {
              src: "",
              alt: "Table spread of brunch plates, toasts and coffees from above",
            },
          },
          {
            _key: "dinner",
            label: "Dinner",
            caption: "Dear Jervois Menu",
            href: "/menu",
            image: {
              src: "",
              alt: "Guest lifting noodles from a bowl of ramen with chopsticks",
            },
          },
          {
            _key: "breakfast",
            label: "Breakfast",
            caption: "Dear Jervois Menu",
            href: "/menu",
            image: {
              src: "",
              alt: "Reuben sandwich with waffle fries and dipping sauce on a wooden table",
            },
          },
        ],
      },
      {
        _type: "booking",
        _key: "booking",
        eyebrow: "Reservations",
        heading: "Book a table",
        provider: "opentable",
        providerNote: "*Powered by OpenTable",
        bookingUrl: "https://www.opentable.com/r/dear-jervois-herne-bay",
      },
    ],
  },
  {
    slug: "about",
    title: "About us",
    description:
      "A family-owned casual dining space in Herne Bay, catering for all diets in a way that promotes health and well being.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "About us",
        size: "band",
        image: { src: "", alt: "The Dear Jervois dining room" },
      },
      {
        _type: "split",
        _key: "story",
        eyebrow: "Our story",
        heading: "Dear Jervois",
        ground: "teal",
        imageSide: "right",
        paragraphs: [
          "A casual dining space that caters for all diets and preferences, in a way that promotes health and well being.",
          "We carefully source organic New Zealand ingredients and buy fresh local produce daily to create delicious, well-balanced dishes, smoothies and drinks.",
        ],
        image: { src: "", alt: "The team at Dear Jervois" },
        ctas: [{ label: "View the menu", href: "/menu" }],
      },
      {
        _type: "hours",
        _key: "hours",
        eyebrow: "Come and see us",
        heading: "Opening hours",
        ground: "navy",
        rows: hoursRows,
      },
    ],
  },
  {
    slug: "menu",
    title: "Our Menu",
    description:
      "Brunch, bowls and cabinet favourites at Dear Jervois, Herne Bay.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Our Menu",
        size: "band",
        image: { src: "", alt: "Chef plating a dish in the Dear Jervois kitchen" },
      },
      { _type: "menuBlock", _key: "menu", menuSlug: "menu" },
    ],
  },
  {
    slug: "book",
    title: "Book now",
    description:
      "Reserve a table at Dear Jervois, 234 Jervois Road, Herne Bay, Auckland.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Book a table",
        size: "band",
        image: { src: "", alt: "A set table at Dear Jervois" },
      },
      {
        _type: "booking",
        _key: "booking",
        eyebrow: "Reservations",
        heading: "Book a table",
        provider: "opentable",
        providerNote: "*Powered by OpenTable",
        bookingUrl: "https://www.opentable.com/r/dear-jervois-herne-bay",
      },
      {
        _type: "hours",
        _key: "hours",
        heading: "Opening hours",
        ground: "navy",
        rows: hoursRows,
        note: "For groups larger than twelve, please give us a call.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact us",
    description:
      "Find Dear Jervois at 234 Jervois Road, Herne Bay, Auckland. Call 09 376 7278 or email hi@dearjervois.net.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Contact us",
        size: "band",
        image: { src: "", alt: "The Dear Jervois shopfront on Jervois Road" },
      },
      {
        _type: "prose",
        _key: "details",
        ground: "teal",
        eyebrow: "Say hello",
        heading: "Find us",
        paragraphs: [
          `${site.address.street}, ${site.address.suburb}, ${site.address.city}.`,
          `${site.phone} · ${site.email}`,
        ],
        ctas: [{ label: "Book a table", href: "/book" }],
      },
      {
        _type: "hours",
        _key: "hours",
        heading: "Opening hours",
        ground: "navy",
        rows: hoursRows,
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    description: "How Dear Jervois handles your information.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Privacy policy",
        size: "band",
      },
      {
        _type: "prose",
        _key: "body",
        paragraphs: [
          "This page's text is managed in the CMS and has not been migrated from the existing site.",
        ],
      },
    ],
  },
];
