import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import type { BookingSection } from "@/lib/types";

/**
 * The reservation strip.
 *
 * Built as a plain GET form that hands off to the booking provider, so it
 * works with no JavaScript and needs no third-party widget script on the
 * critical path — the original loads OpenTable's bundle on every page view.
 *
 * Accessibility fixes over the original, whose fields were unlabelled: every
 * control has a real <label>, the fieldset names the group, and controls are
 * 48px tall. No `min` is set on the date input on purpose — a build-time date
 * would go stale on a statically generated page; the provider validates.
 */
const inputCn =
  "h-12 w-full border border-gold/35 bg-transparent px-4 text-sm text-white transition-colors hover:border-gold/60 focus:border-gold focus:outline-none";

export function Booking({
  eyebrow,
  heading,
  provider = "opentable",
  providerNote,
  bookingUrl,
  maxPartySize = 12,
  _key,
}: BookingSection) {
  const id = `${_key}-heading`;

  return (
    <Section ground="teal" size="large" labelledBy={id}>
      <SectionTitle eyebrow={eyebrow} title={heading} id={id} />

      <form
        action={bookingUrl}
        method="get"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-14 max-w-4xl"
      >
        <fieldset>
          <legend className="sr-only">Book a table</legend>

          {/* 2x2 on small screens, then a single row from md. A four-across
              row at phone width would leave each field unusably narrow. */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label
                htmlFor="party"
                className="u-caps mb-2 block text-[0.65rem] text-gold/80"
              >
                Party
              </label>
              <select id="party" name="covers" className={inputCn} defaultValue="2">
                {Array.from({ length: maxPartySize }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n} className="bg-teal">
                    {n} {n === 1 ? "Person" : "People"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="u-caps mb-2 block text-[0.65rem] text-gold/80"
              >
                Date
              </label>
              <input id="date" name="dateTime" type="date" className={inputCn} />
            </div>

            <div>
              <label
                htmlFor="time"
                className="u-caps mb-2 block text-[0.65rem] text-gold/80"
              >
                Time
              </label>
              <input id="time" name="time" type="time" className={inputCn} />
            </div>

            <div className="col-span-2 flex items-end md:col-span-1">
              <button
                type="submit"
                className="u-caps h-12 w-full border border-gold/60 px-6 text-xs text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Book now
              </button>
            </div>
          </div>
        </fieldset>

        {provider === "opentable" ? (
          <p className="mt-5 text-xs text-white/60">
            {providerNote ?? "*Powered by OpenTable"}
            <span className="sr-only"> — opens in a new tab</span>
          </p>
        ) : null}
      </form>
    </Section>
  );
}
