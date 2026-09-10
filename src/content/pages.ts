import type { Page } from "@/lib/types";

const hours = {
  _type: "hours" as const,
  _key: "hours",
  heading: "Opening hours",
  rows: [
    { _key: "wk", days: "Monday – Friday", hours: "7am – 4pm" },
    { _key: "we", days: "Saturday – Sunday", hours: "8am – 4pm" },
  ],
  note: "DJ by Night pop-up dinners run Friday & Saturday evenings.",
};

export const pages: Page[] = [
  {
    slug: "",
    title: "Dear Jervois Cafe — Herne Bay, Auckland",
    description:
      "A casual dining space on Jervois Road catering for all diets, with organic NZ ingredients and fresh local produce daily.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        eyebrow: "Herne Bay, Auckland",
        heading: "Dear Jervois",
        body: "A casual dining space that caters for all diets and preferences, in a way that promotes health and well being.",
        ctas: [
          { label: "View the menu", href: "/menu" },
          { label: "Book a table", href: "/reservations" },
        ],
      },
      {
        _type: "prose",
        _key: "intro",
        heading: "Our kitchen",
        paragraphs: [
          "We carefully source organic New Zealand ingredients and buy fresh local produce daily to create delicious, well-balanced dishes, smoothies and drinks.",
          "The menu runs from creative brunch plates through to local cafe favourites in the cabinet, with plenty for every diet.",
        ],
      },
      hours,
    ],
  },
  {
    slug: "menu",
    title: "Menu",
    description:
      "Brunch, bowls and cabinet favourites at Dear Jervois, Herne Bay.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Menu",
        body: "Served all day, from open until 4pm.",
      },
      {
        _type: "menu",
        _key: "menu",
        heading: "All day",
        note: "Menu items change with the season — the printed menu in-store is the final word.",
        groups: [
          {
            _key: "brunch",
            title: "Brunch",
            items: [
              {
                _key: "waffles",
                name: "Matcha waffles",
                description:
                  "Housemade cruesli, raspberry mascarpone, maple syrup, coconut nice cream.",
              },
              { _key: "tacos", name: "Breakfast tacos" },
              { _key: "benedict", name: "Eggs benedict" },
              { _key: "avo", name: "Smashed avocado" },
              {
                _key: "kimchi",
                name: "Kimchi fried rice",
                description: "Korean-style, with shiitake mushrooms.",
              },
              { _key: "porkbelly", name: "Crispy pork belly" },
            ],
          },
          {
            _key: "bowls",
            title: "Bowls",
            items: [
              { _key: "vegan", name: "Vegan bowl", dietary: ["Vegan"] },
              { _key: "acai", name: "Acai bowl" },
              { _key: "poke", name: "Poke bowl" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "dinners",
    title: "DJ by Night",
    description:
      "Mediterranean pop-up dinners at Dear Jervois, every Friday and Saturday.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        eyebrow: "Friday & Saturday evenings",
        heading: "DJ by Night",
        body: "Our Mediterranean pop-up dinners, in the same room you know by day.",
        ctas: [{ label: "Reserve a table", href: "/reservations" }],
      },
    ],
  },
  {
    slug: "gallery",
    title: "Gallery",
    description: "Photographs of Dear Jervois, Herne Bay.",
    sections: [
      { _type: "hero", _key: "hero", heading: "Gallery" },
      { _type: "gallery", _key: "grid", images: [] },
    ],
  },
  {
    slug: "news",
    title: "News & Updates",
    description: "What's on at Dear Jervois.",
    sections: [
      { _type: "hero", _key: "hero", heading: "News & Updates" },
      {
        _type: "prose",
        _key: "body",
        paragraphs: [
          "Posts will be managed in Sanity — this page renders whatever the dataset returns.",
        ],
      },
    ],
  },
  {
    slug: "reservations",
    title: "Reservations",
    description: "Book a table at Dear Jervois, 234 Jervois Road, Herne Bay.",
    sections: [
      {
        _type: "hero",
        _key: "hero",
        heading: "Reservations",
        body: "Give us a call, or drop us a line and we'll get back to you.",
        ctas: [
          { label: "Call 09 376 7278", href: "tel:+6493767278" },
          { label: "Email us", href: "mailto:hi@dearjervois.net" },
        ],
      },
      hours,
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Dear Jervois handles your information.",
    sections: [
      { _type: "hero", _key: "hero", heading: "Privacy Policy" },
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
