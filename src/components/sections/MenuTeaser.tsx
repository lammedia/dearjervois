import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import type { MenuTeaserSection } from "@/lib/types";

/**
 * The navy band with three linked menu cards.
 *
 * Responsive composition, rather than a 3-up that simply stacks: three across
 * on desktop, two across on tablet with the third centred, and a single column
 * on mobile. The whole card is one link — the original made only the small
 * caption clickable, which is a poor touch target.
 */
export function MenuTeaser({ eyebrow, heading, cards, _key }: MenuTeaserSection) {
  const id = `${_key}-heading`;

  return (
    <Section ground="navy" size="large" labelledBy={id}>
      <SectionTitle eyebrow={eyebrow} title={heading} id={id} />

      <ul className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-3">
        {cards.map((card, i) => (
          <li
            key={card._key}
            className={
              // With two columns and an odd card out, centre the last one
              // instead of leaving it hanging in the left column.
              cards.length % 2 === 1 && i === cards.length - 1
                ? "sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto"
                : ""
            }
          >
            <Link
              href={card.href}
              className="group block text-center focus-visible:outline-offset-8"
            >
              <Figure
                image={card.image}
                aspect="aspect-[3/2] sm:aspect-[4/5]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 100vw"
                className="transition-opacity duration-500 group-hover:opacity-85"
              />
              <span className="u-caps mt-6 block text-sm text-gold">
                {card.label}
              </span>
              {card.caption ? (
                <span className="mt-2 block text-sm text-white/85">
                  {card.caption}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
