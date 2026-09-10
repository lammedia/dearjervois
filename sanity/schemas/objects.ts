import type { Rule, SchemaTypeDefinition } from "./types";

/**
 * Section schemas, one per `_type` in `src/lib/types.ts`. Field names match the
 * TypeScript types exactly, so a GROQ projection can be a straight passthrough.
 */

export const cta: SchemaTypeDefinition = {
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    { name: "label", type: "string", validation: (r: Rule) => r.required() },
    { name: "href", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "external",
      type: "boolean",
      description: "Open in a new tab.",
      initialValue: false,
    },
  ],
};

export const hero: SchemaTypeDefinition = {
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    { name: "body", type: "text", rows: 3 },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "ctas", type: "array", of: [{ type: "cta" }] },
  ],
};

export const prose: SchemaTypeDefinition = {
  name: "prose",
  title: "Text",
  type: "object",
  fields: [
    { name: "heading", type: "string" },
    {
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (r: Rule) => r.required().min(1),
    },
  ],
};

export const split: SchemaTypeDefinition = {
  name: "split",
  title: "Image + text",
  type: "object",
  fields: [
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    { name: "paragraphs", type: "array", of: [{ type: "text" }] },
    {
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r: Rule) => r.required(),
    },
    {
      name: "imageSide",
      type: "string",
      options: { list: ["left", "right"], layout: "radio" },
      initialValue: "right",
    },
    { name: "ctas", type: "array", of: [{ type: "cta" }] },
  ],
};

export const menuItem: SchemaTypeDefinition = {
  name: "menuItem",
  title: "Menu item",
  type: "object",
  fields: [
    { name: "name", type: "string", validation: (r: Rule) => r.required() },
    { name: "description", type: "text", rows: 2 },
    { name: "price", type: "string" },
    {
      name: "dietary",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["Vegan", "Vegetarian", "Gluten free", "Dairy free"] },
    },
  ],
};

export const menuSection: SchemaTypeDefinition = {
  name: "menu",
  title: "Menu",
  type: "object",
  fields: [
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    { name: "note", type: "text", rows: 2 },
    {
      name: "groups",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuGroup",
          fields: [
            { name: "title", type: "string" },
            { name: "items", type: "array", of: [{ type: "menuItem" }] },
          ],
        },
      ],
    },
  ],
};

export const gallery: SchemaTypeDefinition = {
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    { name: "heading", type: "string" },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description:
                "Describe the photograph for screen readers. Required.",
              validation: (r: Rule) => r.required(),
            },
          ],
        },
      ],
    },
  ],
};

export const hours: SchemaTypeDefinition = {
  name: "hours",
  title: "Opening hours",
  type: "object",
  fields: [
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "hoursRow",
          fields: [
            { name: "days", type: "string" },
            { name: "hours", type: "string" },
          ],
        },
      ],
    },
    { name: "note", type: "text", rows: 2 },
  ],
};
