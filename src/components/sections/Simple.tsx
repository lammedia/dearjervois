import { Button } from "@/components/Button";
import { Figure } from "@/components/Figure";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import type { GallerySection, HoursSection, ProseSection, SplitSection } from "@/lib/types";

export function Prose({
  eyebrow,
  heading,
  paragraphs,
  ground = "ink",
  ctas,
  _key,
}: ProseSection) {
  const id = `${_key}-heading`;

  return (
    <Section ground={ground} width="narrow" labelledBy={heading ? id : undefined}>
      {heading ? <SectionTitle eyebrow={eyebrow} title={heading} id={id} /> : null}

      <div className="mt-8 space-y-5 text-center">
        {paragraphs.map((text, i) => (
          <p key={i} className="text-pretty leading-[1.9] text-body-muted">
            {text}
          </p>
        ))}
      </div>

      {ctas?.length ? (
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {ctas.map((cta) => (
            <Button key={cta.href} cta={cta} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}

export function Split({
  eyebrow,
  heading,
  paragraphs,
  image,
  imageSide = "right",
  ground = "ink",
  ctas,
  _key,
}: SplitSection) {
  const id = `${_key}-heading`;

  return (
    <Section ground={ground} size="large" labelledBy={id}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image leads in source order so it comes first when stacked; the
            order utility restores the requested side from lg up. */}
        <div className={imageSide === "right" ? "lg:order-2" : ""}>
          <Figure
            image={image}
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mx-auto w-full max-w-lg lg:max-w-none"
          />
        </div>

        <div className={imageSide === "right" ? "lg:order-1" : ""}>
          <SectionTitle
            eyebrow={eyebrow}
            title={heading}
            id={id}
            align="left"
          />
          <div className="mt-7 space-y-5">
            {paragraphs.map((text, i) => (
              <p key={i} className="text-pretty leading-[1.9] text-body-muted">
                {text}
              </p>
            ))}
          </div>
          {ctas?.length ? (
            <div className="mt-9 flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Button key={cta.href} cta={cta} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

export function Gallery({ heading, eyebrow, images, _key }: GallerySection) {
  const id = `${_key}-heading`;

  return (
    <Section ground="ink" width="wide" size="large" labelledBy={heading ? id : undefined}>
      {heading ? <SectionTitle eyebrow={eyebrow} title={heading} id={id} /> : null}

      {images.length === 0 ? (
        <p className="mt-10 text-center text-sm text-white/55">
          Photographs will appear here once the gallery is populated in the CMS.
        </p>
      ) : (
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image) => (
            <li key={image.src}>
              <Figure
                image={image}
                aspect="aspect-square"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

export function Hours({ eyebrow, heading, rows, note, ground = "ink", _key }: HoursSection) {
  const id = `${_key}-heading`;

  return (
    <Section ground={ground} width="narrow" labelledBy={id}>
      <SectionTitle eyebrow={eyebrow} title={heading} id={id} />

      <dl className="mx-auto mt-12 max-w-md">
        {rows.map((row) => (
          <div
            key={row._key}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-gold/15 py-4"
          >
            <dt className="u-caps text-xs text-gold">{row.days}</dt>
            <dd className="text-sm tabular-nums text-white/85">{row.hours}</dd>
          </div>
        ))}
      </dl>

      {note ? (
        <p className="mt-7 text-center text-sm text-white/60">{note}</p>
      ) : null}
    </Section>
  );
}
