/**
 * A minimal stand-in for Sanity's own `SchemaTypeDefinition`, so these schema
 * files type-check before the `sanity` package is installed and the app carries
 * no Studio dependency it isn't using yet.
 *
 * When wiring up the Studio, delete this file and change the imports below to
 * `import type { SchemaTypeDefinition } from "sanity"`.
 */
export type SchemaTypeDefinition = {
  name: string;
  type: string;
  title?: string;
  fields?: unknown[];
  of?: unknown[];
  options?: Record<string, unknown>;
  [key: string]: unknown;
};

/** Sanity's validation rule builder, loosely typed for the same reason. */
export type Rule = {
  required: () => Rule;
  min: (n: number) => Rule;
  max: (n: number) => Rule;
};
