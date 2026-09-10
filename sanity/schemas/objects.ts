import type { Rule, SchemaTypeDefinition } from "./types";

/**
 * Section schemas, one per `_type` in `src/lib/types.ts`. Field names match the
 * TypeScript types exactly, so a GROQ projection is close to a passthrough.
 */

export const cta: SchemaTypeDefinition = {
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    { name: "label", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "href",
      type: "string",
      description: "A path like /menu, or a full https:// URL.",
      validation: (r: Rule) => r.required(),
    },
    { name: "external", type: "boolean", title: "Open in a new tab", initialValue: false },
  ],
};

/** Every image field carries required alt text — see gallery/hero below. */
const imageField = (name = "image", required = false) => ({
  name,
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Describe the photograph for screen readers.",
      validation: (r: Rule) => r.required(),
    },
  ],
  ...(required ? { validation: (r: Rule) => r.required() } : {}),
});

export const hero: SchemaTypeDefinition = {
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: "heading",
      type: "string",
      description:
        "On the home page this is set in the script face. On interior pages it becomes the ornamented gold title.",
      validation: (r: Rule) => r.required(),
    },
    { name: "eyebrow", type: "string" },
    imageField("image"),
    {
      name: "size",
      type: "string",
      title: "Height",
      options: {
        list: [
          { title: "Full screen (home page)", value: "full" },
          { title: "Band (interior pages)", value: "band" },
        ],
        layout: "radio",
      },
      initialValue: "band",
    },
    { name: "ctas", type: "array", title: "Buttons", of: [{ type: "cta" }] },
  ],
};

const groundField = {
  name: "ground",
  type: "string",
  title: "Background",
  options: {
    list: [
      { title: "Near black", value: "ink" },
      { title: "Navy", value: "navy" },
      { title: "Dark teal", value: "teal" },
    ],
    layout: "radio",
  },
  initialValue: "ink",
};

export const prose: SchemaTypeDefinition = {
  name: "prose",
  title: "Text",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string", description: "Script line above the title." },
    { name: "heading", type: "string" },
    {
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (r: Rule) => r.required().min(1),
    },
    groundField,
    { name: "ctas", type: "array", title: "Buttons", of: [{ type: "cta" }] },
  ],
};

export const split: SchemaTypeDefinition = {
  name: "split",
  title: "Image + text",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    { name: "paragraphs", type: "array", of: [{ type: "text" }] },
    imageField("image", true),
    {
      name: "imageSide",
      type: "string",
      description: "Which side the image takes on desktop. It always leads when stacked.",
      options: { list: ["left", "right"], layout: "radio" },
      initialValue: "right",
    },
    groundField,
    { name: "ctas", type: "array", title: "Buttons", of: [{ type: "cta" }] },
  ],
};

export const testimonials: SchemaTypeDefinition = {
  name: "testimonials",
  title: "Testimonials",
  type: "object",
  fields: [
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial",
          fields: [
            { name: "quote", type: "text", rows: 6, validation: (r: Rule) => r.required() },
            { name: "name", type: "string", validation: (r: Rule) => r.required() },
            { name: "role", type: "string" },
            imageField("image"),
          ],
          preview: { select: { title: "name", subtitle: "quote" } },
        },
      ],
      validation: (r: Rule) => r.required().min(1),
    },
    { name: "cta", type: "cta", title: "Button" },
  ],
};

export const menuTeaser: SchemaTypeDefinition = {
  name: "menuTeaser",
  title: "Menu teaser (three cards)",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuCard",
          fields: [
            { name: "label", type: "string", validation: (r: Rule) => r.required() },
            { name: "caption", type: "string" },
            { name: "href", type: "string", validation: (r: Rule) => r.required() },
            imageField("image"),
          ],
          preview: { select: { title: "label", subtitle: "caption" } },
        },
      ],
      validation: (r: Rule) => r.required().max(3),
    },
  ],
};

export const booking: SchemaTypeDefinition = {
  name: "booking",
  title: "Booking form",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "heading", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "provider",
      type: "string",
      options: { list: ["opentable", "none"], layout: "radio" },
      initialValue: "opentable",
    },
    { name: "providerNote", type: "string", initialValue: "*Powered by OpenTable" },
    { name: "bookingUrl", type: "url", title: "Booking URL" },
    { name: "maxPartySize", type: "number", initialValue: 12 },
  ],
};

export const gallery: SchemaTypeDefinition = {
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "heading", type: "string" },
    { name: "images", type: "array", of: [imageField("image")] },
  ],
};

export const hours: SchemaTypeDefinition = {
  name: "hours",
  title: "Opening hours",
  type: "object",
  fields: [
    { name: "eyebrow", type: "string" },
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
          preview: { select: { title: "days", subtitle: "hours" } },
        },
      ],
    },
    { name: "note", type: "text", rows: 2 },
    groundField,
  ],
};

export const menuBlock: SchemaTypeDefinition = {
  name: "menuBlock",
  title: "Menu (structured)",
  type: "object",
  description: "Renders a menu document. Menus are managed from the Menu section, not here.",
  fields: [
    {
      name: "menuSlug",
      type: "string",
      title: "Menu",
      description: 'Slug of the menu to render, e.g. "menu".',
      validation: (r: Rule) => r.required(),
    },
  ],
};
