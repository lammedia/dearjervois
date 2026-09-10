/**
 * The shape every page is built from.
 *
 * These types are the contract between the rendering layer and whatever is
 * feeding it. Today that is `src/content` (typed TS objects); tomorrow it is
 * Sanity. `sanity/schemas` mirrors this file one-to-one, so a document fetched
 * from Sanity drops straight into these components with no mapping layer.
 */

export type ImageRef = {
  /** Local path under /public, or a Sanity CDN URL once content moves. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Cta = {
  label: string;
  href: string;
  /** Opens in a new tab and gets rel="noreferrer" — for booking widgets etc. */
  external?: boolean;
};

export type HeroSection = {
  _type: "hero";
  _key: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  image?: ImageRef;
  ctas?: Cta[];
};

export type ProseSection = {
  _type: "prose";
  _key: string;
  heading?: string;
  /** Paragraphs. Becomes Portable Text blocks when Sanity lands. */
  paragraphs: string[];
};

export type SplitSection = {
  _type: "split";
  _key: string;
  heading: string;
  paragraphs: string[];
  image: ImageRef;
  /** Which side the image sits on at >=md. Stacks image-first when narrow. */
  imageSide?: "left" | "right";
  ctas?: Cta[];
};

export type MenuItem = {
  _key: string;
  name: string;
  description?: string;
  price?: string;
  dietary?: string[];
};

export type MenuSection = {
  _type: "menu";
  _key: string;
  heading: string;
  note?: string;
  groups: { _key: string; title: string; items: MenuItem[] }[];
};

export type GallerySection = {
  _type: "gallery";
  _key: string;
  heading?: string;
  images: ImageRef[];
};

export type HoursSection = {
  _type: "hours";
  _key: string;
  heading: string;
  rows: { _key: string; days: string; hours: string }[];
  note?: string;
};

export type Section =
  | HeroSection
  | ProseSection
  | SplitSection
  | MenuSection
  | GallerySection
  | HoursSection;

export type Page = {
  /** Route segment. "" is the home page. */
  slug: string;
  title: string;
  description: string;
  sections: Section[];
};

export type NavLink = { label: string; href: string; external?: boolean };

export type SiteSettings = {
  name: string;
  tagline: string;
  nav: NavLink[];
  footerNav: NavLink[];
  address: { street: string; suburb: string; city: string; country: string };
  email: string;
  phone: string;
  social: NavLink[];
};
