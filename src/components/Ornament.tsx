/**
 * The chevron flourish that flanks every section title in the /2026/ design.
 *
 * Drawn as inline SVG rather than an icon font: it scales with the heading,
 * inherits currentColor, costs no extra request, and avoids shipping the
 * WordPress theme's icon font for a single glyph.
 *
 * Decorative only — hidden from assistive technology, since the heading beside
 * it already carries the meaning.
 */
export function Ornament({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 26 12"
      className={`h-3 w-6 shrink-0 ${flip ? "-scale-x-100" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 1.5 8 6l-6 4.5" />
      <path d="M12 1.5 18 6l-6 4.5" />
    </svg>
  );
}
