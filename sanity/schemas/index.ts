import { navLink, page, siteSettings } from "./documents";
import { menu, menuImport, menuItem, menuSection } from "./menu";
import {
  booking,
  cta,
  gallery,
  hero,
  hours,
  menuBlock,
  menuTeaser,
  prose,
  split,
  testimonials,
} from "./objects";
import type { SchemaTypeDefinition } from "./types";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  page,
  siteSettings,
  menu,
  menuImport,
  // Page sections
  hero,
  prose,
  split,
  testimonials,
  menuTeaser,
  booking,
  gallery,
  hours,
  menuBlock,
  // Shared objects
  navLink,
  cta,
  menuSection,
  menuItem,
];
