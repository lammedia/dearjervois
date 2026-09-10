import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Figure } from "@/components/Figure";
import { Ornament } from "@/components/Ornament";
import type { HeroSection } from "@/lib/types";

/**
 * The opening statement: a full-bleed photograph, the script line centred over
 * it, and one outlined action.
 *
 * Two deliberate changes from the original:
 *  - Height is `100svh`, not `100vh`. On mobile browsers `vh` includes the
 *    retracting toolbar, which pushed the button below the fold on first paint.
 *  - The scrim is a gradient rather than a flat overlay, so the script stays
 *    legible over a bright image without dulling the photography.
 *
 * The script face is reserved for the home page's single statement line. Every
 * interior page title uses the ornamented caps treatment instead, matching how
 * the design sets page titles rather than taglines.
 */
export function Hero({ heading, eyebrow, image, ctas, size = "full" }: HeroSection) {
  const full = size === "full";

  return (
    <section
      aria-labelledby="page-title"
      className={`relative isolate flex items-center justify-center overflow-hidden ${
        full ? "min-h-svh" : "min-h-[60svh] pt-28"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        <Figure image={image} fill quiet priority sizes="100vw" />
      </div>

      {/* Scrim: strongest at the top where the nav sits, and behind the text. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/25 to-black/45"
      />

      <Container className="py-28 text-center">
        {eyebrow ? (
          <p className="u-caps text-xs text-gold-soft">{eyebrow}</p>
        ) : null}

        {full ? (
          <h1
            id="page-title"
            className="u-script mx-auto max-w-4xl text-balance text-5xl leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl"
          >
            {heading}
          </h1>
        ) : (
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <Ornament className="hidden text-gold/70 sm:block" />
            <h1
              id="page-title"
              className="u-caps text-balance text-3xl font-normal text-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl"
            >
              {heading}
            </h1>
            <Ornament flip className="hidden text-gold/70 sm:block" />
          </div>
        )}

        {ctas?.length ? (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {ctas.map((cta, i) => (
              <Button
                key={cta.href}
                cta={cta}
                variant={i === 0 ? "light" : "gold"}
              />
            ))}
          </div>
        ) : null}
      </Container>

      {full ? (
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
          <span className="block h-10 w-px animate-pulse bg-linear-to-b from-transparent to-white/70" />
        </div>
      ) : null}
    </section>
  );
}
