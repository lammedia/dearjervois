import type { SchemaTypeDefinition } from "./types";
import { navLink, page, siteSettings } from "./documents";
import {
  cta,
  gallery,
  hero,
  hours,
  menuItem,
  menuSection,
  prose,
  split,
} from "./objects";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  page,
  siteSettings,
  // Objects
  navLink,
  cta,
  hero,
  prose,
  split,
  menuSection,
  menuItem,
  gallery,
  hours,
];
