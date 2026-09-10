/**
 * The content contract.
 *
 * These types are what the rendering layer consumes, and `sanity/schemas`
 * mirrors them field for field, so a document fetched from Sanity drops
 * straight into these components with no mapping layer.
 *
 * The menu has its own richer model in `src/lib/menu/types.ts`, because it is
 * produced by the PDF import pipeline rather than typed by hand.
 */

export type ImageRef = {
  /** Path under /public, or a Sanity CDN URL once content moves. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Focal point for cropping, 0–1. Maps to Sanity's image hotspot. */
  focal?: { x: number; y: number };
};

export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

/** Full-bleed opening section: image/video ground, script line, outlined CTA. */
export type HeroSection = {
  _type: "hero";
  _key: string;
  /** Set in the script face, as in "A little taste of everything". */
  heading: string;
  eyebrow?: string;
  image?: ImageRef;
  ctas?: Cta[];
  /** Full viewport on the home page; a shorter band on interior pages. */
  size?: "full" | "band";
};

export type ProseSection = {
  _type: "prose";
  _key: string;
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  ground?: Ground;
  ctas?: Cta[];
};

export type SplitSection = {
  _type: "split";
  _key: string;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image: ImageRef;
  imageSide?: "left" | "right";
  ground?: Ground;
  ctas?: Cta[];
};

export type Testimonial = {
  _key: string;
  quote: string;
  name: string;
  role?: string;
  image?: ImageRef;
};

export type TestimonialsSection = {
  _type: "testimonials",
  _key: string;
  items: Testimonial[];
  cta?: Cta;
};

/** The three-card teaser linking through to the full menu. */
export type MenuTeaserSection = {
  _type: "menuTeaser";
  _key: string;
  eyebrow?: string;
  heading: string;
  cards: {
    _key: string;
    label: string;
    caption?: string;
    href: string;
    image?: ImageRef;
  }[];
};

export type BookingSection = {
  _type: "booking";
  _key: string;
  eyebrow?: string;
  heading: string;
  /** Where the booking form submits. OpenTable in the current design. */
  provider?: "opentable" | "none";
  providerNote?: string;
  bookingUrl?: string;
  maxPartySize?: number;
};

export type GallerySection = {
  _type: "gallery";
  _key: string;
  heading?: string;
  eyebrow?: string;
  images: ImageRef[];
};

export type HoursSection = {
  _type: "hours";
  _key: string;
  eyebrow?: string;
  heading: string;
  rows: { _key: string; days: string; hours: string }[];
  note?: string;
  ground?: Ground;
};

/** Renders the structured menu from the PDF pipeline. */
export type MenuSectionBlock = {
  _type: "menuBlock";
  _key: string;
  /** Which menu document to render; resolved via getMenu(). */
  menuSlug: string;
};

export type Ground = "navy" | "teal" | "ink";

export type Section =
  | HeroSection
  | ProseSection
  | SplitSection
  | TestimonialsSection
  | MenuTeaserSection
  | BookingSection
  | GallerySection
  | HoursSection
  | MenuSectionBlock;

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
  hours: { _key: string; days: string; hours: string }[];
  social: NavLink[];
};
