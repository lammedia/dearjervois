import { Ornament } from "@/components/Ornament";

/**
 * Script eyebrow above an ornamented, letterspaced caps title — the recurring
 * section header throughout /2026/ ("Dear Jervois Tasty Offer / OUR MENU",
 * "Reservations / BOOK A TABLE").
 *
 * The ornaments sit outside the heading text so they never end up in the
 * accessible name, and they wrap out of the way rather than squashing the
 * title on narrow screens.
 */
export function SectionTitle({
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="u-script text-2xl text-gold-soft sm:text-[1.75rem]">
          {eyebrow}
        </p>
      ) : null}

      <div
        className={`mt-2 flex items-center gap-4 sm:gap-6 ${
          centered ? "justify-center" : "justify-start"
        }`}
      >
        <Ornament className="hidden text-gold-dim sm:block" />
        <Tag
          id={id}
          className="u-caps text-balance text-3xl font-normal text-gold sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </Tag>
        <Ornament flip className="hidden text-gold-dim sm:block" />
      </div>
    </div>
  );
}
