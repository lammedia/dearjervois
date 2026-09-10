import Link from "next/link";

/**
 * The logo is set as live text rather than an image.
 *
 * The brand logo files referenced by the theme options live on the WordPress
 * install (wp-content/uploads/.../DearJervois_HerneBay_Square_Logo_240px.png)
 * and were not in the supplied ZIP, so no artwork was available. Setting the
 * wordmark in the display face reproduces what the screenshots show, and has
 * the side benefits of staying crisp at any density, scaling with the layout,
 * and being readable as text. Swap in the real SVG/PNG when it is supplied.
 */
export function Wordmark({ name }: { name: string }) {
  return (
    <Link
      href="/"
      className="group block shrink-0 leading-none"
      aria-label={`${name} — home`}
    >
      <span
        aria-hidden="true"
        className="u-caps block text-lg font-semibold leading-tight text-white sm:text-xl"
      >
        Dear
      </span>
      <span
        aria-hidden="true"
        className="u-caps block text-lg font-semibold leading-tight text-white sm:text-xl"
      >
        Jervois,
      </span>
      <span
        aria-hidden="true"
        className="mt-1 block text-[0.5rem] tracking-[0.42em] text-white/70"
      >
        HERNE BAY
      </span>
    </Link>
  );
}
