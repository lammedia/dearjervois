import type { Menu } from "@/lib/menu/types";

/**
 * PROVISIONAL menu content.
 *
 * This exists so the menu components can be built and reviewed against real
 * structure. It is NOT the client's menu: prices are absent because none could
 * be verified, and the item list comes from public listings rather than from
 * DearJervois_2026.pdf, which is on the blocked domain.
 *
 * The whole object is replaced wholesale by the first successful PDF import —
 * that is the normal workflow, and nobody should be typing items in here.
 */
export const menus: Menu[] = [
  {
    _id: "menu-all-day",
    title: "Our Menu",
    slug: "menu",
    intro:
      "We carefully source organic New Zealand ingredients and buy fresh local produce daily to create delicious, well-balanced dishes, smoothies and drinks.",
    version: 0,
    updatedAt: "2026-09-10T00:00:00.000Z",
    sections: [
      {
        _key: "brunch",
        title: "Brunch",
        eyebrow: "All day",
        order: 0,
        note: "Awaiting import from the current PDF menu — prices not yet confirmed.",
        items: [
          {
            _key: "waffles",
            name: "Matcha waffles",
            description:
              "Housemade cruesli, raspberry mascarpone, maple syrup, coconut nice cream.",
            order: 0,
            source: "manual",
          },
          {
            _key: "kimchi-rice",
            name: "Kimchi fried rice",
            description: "Korean style, with shiitake mushrooms.",
            order: 1,
            source: "manual",
          },
          {
            _key: "pork-belly",
            name: "Crispy pork belly",
            order: 2,
            source: "manual",
          },
          {
            _key: "benedict",
            name: "Eggs benedict",
            order: 3,
            source: "manual",
          },
          {
            _key: "tacos",
            name: "Breakfast tacos",
            order: 4,
            source: "manual",
          },
          {
            _key: "avo",
            name: "Smashed avocado",
            order: 5,
            source: "manual",
            dietary: ["vegetarian"],
          },
        ],
      },
      {
        _key: "bowls",
        title: "Bowls",
        eyebrow: "Fresh & light",
        order: 1,
        items: [
          {
            _key: "vegan-bowl",
            name: "Vegan bowl",
            order: 0,
            source: "manual",
            dietary: ["vegan"],
          },
          {
            _key: "acai-bowl",
            name: "Acai bowl",
            order: 1,
            source: "manual",
            dietary: ["vegetarian"],
          },
          { _key: "poke-bowl", name: "Poke bowl", order: 2, source: "manual" },
        ],
      },
    ],
  },
];
