import Image from "next/image";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import type { Section as SectionData } from "@/lib/types";

/**
 * One switch, keyed on `_type`, from a content block to a rendered section.
 * Adding a block type to the CMS means adding a case here and a schema in
 * `sanity/schemas` — nothing else in the app changes.
 */
export function SectionRenderer({ sections }: { sections: SectionData[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} {...section} />;
          case "prose":
            return <Prose key={section._key} {...section} />;
          case "split":
            return <Split key={section._key} {...section} />;
          case "menu":
            return <Menu key={section._key} {...section} />;
          case "gallery":
            return <Gallery key={section._key} {...section} />;
          case "hours":
            return <Hours key={section._key} {...section} />;
        }
      })}
    </>
  );
}

function Hero({
  eyebrow,
  heading,
  body,
  image,
  ctas,
}: Extract<SectionData, { _type: "hero" }>) {
  return (
    <Section size="large" labelledBy="page-title">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
            {eyebrow}
          </p>
        ) : null}
        <h1
          id="page-title"
          className="mt-4 font-display text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {heading}
        </h1>
        {body ? (
          <p className="mt-6 text-lg leading-relaxed text-ink-muted text-pretty">
            {body}
          </p>
        ) : null}
        {ctas?.length ? (
          <div className="mt-9 flex flex-wrap gap-3">
            {ctas.map((cta, i) => (
              <Button
                key={cta.href}
                cta={cta}
                variant={i === 0 ? "primary" : "secondary"}
              />
            ))}
          </div>
        ) : null}
      </div>

      {image ? (
        <div className="mt-14 overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1600}
            height={image.height ?? 900}
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}
    </Section>
  );
}

function Prose({
  heading,
  paragraphs,
  _key,
}: Extract<SectionData, { _type: "prose" }>) {
  const id = `${_key}-heading`;

  return (
    <Section width="narrow" labelledBy={heading ? id : undefined}>
      {heading ? (
        <h2 id={id} className="font-display text-2xl sm:text-3xl">
          {heading}
        </h2>
      ) : null}
      <div className="mt-6 space-y-5">
        {paragraphs.map((text, i) => (
          <p key={i} className="leading-relaxed text-ink-muted text-pretty">
            {text}
          </p>
        ))}
      </div>
    </Section>
  );
}

function Split({
  heading,
  paragraphs,
  image,
  imageSide = "right",
  ctas,
  _key,
}: Extract<SectionData, { _type: "split" }>) {
  const id = `${_key}-heading`;

  return (
    <Section width="wide" labelledBy={id}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Source order puts the image first so it leads when stacked; the
            order utility restores the requested side from md up. */}
        <div
          className={`overflow-hidden rounded-lg ${
            imageSide === "right" ? "md:order-2" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 900}
            height={image.height ?? 1050}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
        <div>
          <h2 id={id} className="font-display text-2xl sm:text-3xl">
            {heading}
          </h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((text, i) => (
              <p key={i} className="leading-relaxed text-ink-muted text-pretty">
                {text}
              </p>
            ))}
          </div>
          {ctas?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href}
                  cta={cta}
                  variant={i === 0 ? "primary" : "secondary"}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function Menu({
  heading,
  note,
  groups,
  _key,
}: Extract<SectionData, { _type: "menu" }>) {
  const id = `${_key}-heading`;

  return (
    <Section labelledBy={id}>
      <h2 id={id} className="font-display text-2xl sm:text-3xl">
        {heading}
      </h2>
      {note ? <p className="mt-3 text-sm text-ink-muted">{note}</p> : null}

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <div key={group._key}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              {group.title}
            </h3>
            <ul className="mt-5 divide-y divide-line border-t border-line">
              {group.items.map((item) => (
                <li key={item._key} className="py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-medium">{item.name}</p>
                    {item.price ? (
                      <p className="text-sm tabular-nums text-ink-muted">
                        {item.price}
                      </p>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  ) : null}
                  {item.dietary?.length ? (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {item.dietary.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-2 py-0.5 text-xs text-ink-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery({
  heading,
  images,
  _key,
}: Extract<SectionData, { _type: "gallery" }>) {
  const id = `${_key}-heading`;

  return (
    <Section width="wide" labelledBy={heading ? id : undefined}>
      {heading ? (
        <h2 id={id} className="font-display text-2xl sm:text-3xl">
          {heading}
        </h2>
      ) : null}

      {images.length === 0 ? (
        <p className="text-sm text-ink-muted">
          Photographs will appear here once the gallery is populated in the CMS.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image) => (
            <li key={image.src} className="overflow-hidden rounded-md">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 800}
                height={image.height ?? 800}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="aspect-square h-auto w-full object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Hours({
  heading,
  rows,
  note,
  _key,
}: Extract<SectionData, { _type: "hours" }>) {
  const id = `${_key}-heading`;

  return (
    <Section width="narrow" labelledBy={id}>
      <h2 id={id} className="font-display text-2xl sm:text-3xl">
        {heading}
      </h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div
            key={row._key}
            className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-4"
          >
            <dt className="text-ink-muted">{row.days}</dt>
            <dd className="tabular-nums">{row.hours}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-5 text-sm text-ink-muted">{note}</p> : null}
    </Section>
  );
}
