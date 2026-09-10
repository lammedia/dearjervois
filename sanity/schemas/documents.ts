import type { Rule, SchemaTypeDefinition } from "./types";

export const page: SchemaTypeDefinition = {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
      description: 'Leave as "home" for the front page.',
      validation: (r: Rule) => r.required(),
    },
    {
      name: "description",
      type: "text",
      rows: 2,
      description: "Used for the meta description and social previews.",
      validation: (r: Rule) => r.required().max(160),
    },
    {
      name: "sections",
      type: "array",
      of: [
        { type: "hero" },
        { type: "prose" },
        { type: "split" },
        { type: "menu" },
        { type: "gallery" },
        { type: "hours" },
      ],
    },
  ],
};

export const siteSettings: SchemaTypeDefinition = {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "tagline", type: "string" },
    { name: "nav", type: "array", of: [{ type: "navLink" }] },
    { name: "footerNav", type: "array", of: [{ type: "navLink" }] },
    {
      name: "address",
      type: "object",
      fields: [
        { name: "street", type: "string" },
        { name: "suburb", type: "string" },
        { name: "city", type: "string" },
        { name: "country", type: "string" },
      ],
    },
    { name: "email", type: "string" },
    { name: "phone", type: "string" },
    { name: "social", type: "array", of: [{ type: "navLink" }] },
  ],
};

export const navLink: SchemaTypeDefinition = {
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    { name: "label", type: "string" },
    { name: "href", type: "string" },
    { name: "external", type: "boolean", initialValue: false },
  ],
};
