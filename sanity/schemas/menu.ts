import type { Rule, SchemaTypeDefinition } from "./types";

/**
 * Menu documents and the PDF import records that feed them.
 *
 * The editing model the brief asks for: the client uploads a replacement PDF
 * and reviews a diff. They should almost never type an item by hand — but they
 * can, for the occasional correction, which is why every field stays editable
 * and why `source` marks the ones a human has touched so a later import cannot
 * quietly overwrite them.
 */

export const menuItem: SchemaTypeDefinition = {
  name: "menuItem",
  title: "Menu item",
  type: "object",
  fields: [
    { name: "name", type: "string", validation: (r: Rule) => r.required() },
    { name: "description", type: "text", rows: 2 },
    {
      name: "price",
      type: "string",
      description:
        'Kept as written on the menu — "24", "12 / 18" and "market" are all valid.',
    },
    {
      name: "dietary",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegan", value: "vegan" },
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Gluten free", value: "gluten-free" },
          { title: "Dairy free", value: "dairy-free" },
          { title: "Contains nuts", value: "contains-nuts" },
        ],
      },
    },
    { name: "order", type: "number", hidden: true },
    {
      name: "source",
      type: "string",
      readOnly: true,
      description:
        'Set to "manual" when someone edits this item by hand. Imports flag manual items for review rather than overwriting them.',
      options: { list: ["pdf", "manual"] },
    },
    {
      name: "confidence",
      type: "number",
      readOnly: true,
      description: "How sure the PDF extractor was about this item, 0–1.",
    },
  ],
  preview: { select: { title: "name", subtitle: "price" } },
};

export const menuSection: SchemaTypeDefinition = {
  name: "menuSection",
  title: "Menu section",
  type: "object",
  fields: [
    { name: "title", type: "string", validation: (r: Rule) => r.required() },
    { name: "eyebrow", type: "string", description: "Script line above the title." },
    { name: "note", type: "text", rows: 2 },
    { name: "order", type: "number", hidden: true },
    { name: "items", type: "array", of: [{ type: "menuItem" }] },
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
};

export const menu: SchemaTypeDefinition = {
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r: Rule) => r.required(),
    },
    { name: "intro", type: "text", rows: 3 },
    {
      name: "pdf",
      type: "file",
      title: "Current PDF",
      description:
        "The original upload. Offered as a secondary download; the HTML menu above is what guests see.",
      options: { accept: "application/pdf" },
    },
    {
      name: "version",
      type: "number",
      readOnly: true,
      description: "Incremented on every published import.",
      initialValue: 0,
    },
    { name: "sections", type: "array", of: [{ type: "menuSection" }] },
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
};

export const menuImport: SchemaTypeDefinition = {
  name: "menuImport",
  title: "Menu import",
  type: "document",
  description:
    "One PDF upload and its review. Publishing is only possible from an approved import with no outstanding flags.",
  fields: [
    {
      name: "pdf",
      type: "file",
      title: "Uploaded PDF",
      options: { accept: "application/pdf" },
      validation: (r: Rule) => r.required(),
    },
    {
      name: "targetMenu",
      type: "reference",
      to: [{ type: "menu" }],
      validation: (r: Rule) => r.required(),
    },
    {
      name: "status",
      type: "string",
      readOnly: true,
      initialValue: "uploaded",
      options: {
        list: [
          "uploaded",
          "extracting",
          "extracted",
          "failed",
          "awaiting-review",
          "approved",
          "published",
          "discarded",
        ],
      },
    },
    {
      name: "summary",
      type: "text",
      readOnly: true,
      description:
        'The comparison, e.g. "42 items detected · 34 unchanged · 5 prices changed · 2 new · 1 removed".',
    },
    {
      name: "candidate",
      type: "array",
      readOnly: true,
      title: "Extracted sections",
      description: "What the extractor read. Never shown on the website.",
      of: [{ type: "menuSection" }],
    },
    {
      name: "previousMenu",
      type: "array",
      readOnly: true,
      title: "Menu before this import",
      description: "Snapshot kept so a publish can be rolled back.",
      of: [{ type: "menuSection" }],
    },
    {
      name: "warnings",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "object",
          name: "extractionWarning",
          fields: [
            { name: "code", type: "string" },
            { name: "message", type: "string" },
            { name: "page", type: "number" },
            { name: "itemName", type: "string" },
          ],
          preview: { select: { title: "message", subtitle: "code" } },
        },
      ],
    },
    { name: "error", type: "text", readOnly: true },
    { name: "reviewedBy", type: "string", readOnly: true },
    { name: "reviewedAt", type: "datetime", readOnly: true },
  ],
  preview: { select: { title: "summary", subtitle: "status" } },
};
