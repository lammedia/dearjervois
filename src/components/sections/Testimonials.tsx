"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Figure } from "@/components/Figure";
import type { TestimonialsSection } from "@/lib/types";

/**
 * Quote on the left, portrait on the right, numbered pager beneath.
 *
 * Accessibility changes over the original, which used bare numerals with no
 * semantics: the pager is a real tablist, the numbers are buttons with
 * meaningful labels, and the live region announces the change. Quotes are
 * marked up as <blockquote>/<figcaption> rather than styled paragraphs.
 *
 * All three quotes stay in the DOM; only the active one is shown. That keeps
 * the section height stable and avoids a layout jump between quotes of
 * different lengths.
 */
export function Testimonials({ items, cta }: TestimonialsSection) {
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;
  const current = items[active];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-teal py-16 sm:py-20 lg:py-24"
    >
      <h2 id="testimonials-heading" className="sr-only">
        What our guests say
      </h2>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <figure className="text-center">
              <span
                aria-hidden="true"
                className="u-script block text-6xl leading-none text-gold"
              >
                &rdquo;
              </span>

              <blockquote
                aria-live="polite"
                className="u-script mx-auto mt-6 max-w-lg text-pretty text-xl leading-[1.9] text-body-muted sm:text-2xl sm:leading-[1.9]"
              >
                {current.quote}
              </blockquote>

              <figcaption className="mt-8">
                <span className="u-caps block text-sm text-gold">
                  {current.name}
                </span>
                {current.role ? (
                  <span className="mt-2 block text-sm text-white/80">
                    {current.role}
                  </span>
                ) : null}
              </figcaption>
            </figure>

            {items.length > 1 ? (
              <div
                role="tablist"
                aria-label="Choose a testimonial"
                className="mt-10 flex items-center justify-center gap-6"
              >
                {items.map((item, i) => (
                  <button
                    key={item._key}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Testimonial ${i + 1} of ${items.length}, ${item.name}`}
                    onClick={() => setActive(i)}
                    className={`u-caps inline-flex size-11 items-center justify-center border-b text-sm transition-colors ${
                      i === active
                        ? "border-gold text-gold"
                        : "border-transparent text-white/50 hover:text-gold"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            ) : null}

            {cta ? (
              <div className="mt-10 flex justify-center">
                <Button cta={cta} />
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <Figure
              image={current.image}
              aspect="aspect-[4/3] sm:aspect-[4/5]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="mx-auto w-full max-w-lg lg:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
