import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import {
  DIETARY_FULL,
  DIETARY_LABELS,
  type Menu,
  type MenuItem,
  type MenuSection,
} from "@/lib/menu/types";

/**
 * The menu, rendered from structured data.
 *
 * Nothing here is hard-coded copy: it renders whatever `Menu` it is given, so
 * the same components serve hand-entered content today and PDF-extracted,
 * Sanity-hosted records later. That is the whole point of the pipeline —
 * changing the source must never mean redesigning this page.
 */
export function MenuList({ menu }: { menu: Menu }) {
  const sections = [...menu.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-ink">
      {sections.map((section, i) => (
        <MenuSectionBlock
          key={section._key}
          section={section}
          alternate={i % 2 === 1}
        />
      ))}
    </div>
  );
}

function MenuSectionBlock({
  section,
  alternate,
}: {
  section: MenuSection;
  alternate: boolean;
}) {
  const id = `menu-${section._key}`;
  const items = [...section.items].sort((a, b) => a.order - b.order);

  return (
    <section
      aria-labelledby={id}
      className={`py-16 sm:py-20 lg:py-24 ${alternate ? "bg-navy" : "bg-ink"}`}
    >
      <Container>
        <SectionTitle eyebrow={section.eyebrow} title={section.title} id={id} />

        {section.note ? (
          <p className="mx-auto mt-5 max-w-xl text-center text-sm text-white/65">
            {section.note}
          </p>
        ) : null}

        {/* Two columns from lg. A dish name plus a price needs the full
            measure below that, or the leader line collapses to nothing. */}
        <ul className="mt-12 grid gap-x-16 gap-y-9 lg:grid-cols-2">
          {items.map((item) => (
            <MenuRow key={item._key} item={item} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li>
      <div className="flex items-baseline gap-3">
        <h3 className="u-caps shrink-0 text-sm text-gold sm:text-[0.95rem]">
          {item.name}
        </h3>

        {/* Decorative leader, drawn only when there is a price for it to lead
            to. It shrinks rather than forcing the price onto a new line. */}
        {item.price ? (
          <>
            <span
              aria-hidden="true"
              className="min-w-0 flex-1 translate-y-[-0.2em] border-b border-dotted border-gold/30"
            />
            <p className="shrink-0 text-sm tabular-nums text-gold-soft">
              {item.price}
            </p>
          </>
        ) : null}
      </div>

      {item.description ? (
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/65">
          {item.description}
        </p>
      ) : null}

      {item.dietary?.length ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {item.dietary.map((tag) => (
            <li
              key={tag}
              className="border border-gold/25 px-2 py-0.5 text-[0.65rem] tracking-widest text-gold/80"
            >
              <abbr title={DIETARY_FULL[tag]} className="no-underline">
                {DIETARY_LABELS[tag]}
              </abbr>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
