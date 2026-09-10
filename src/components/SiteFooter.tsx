import Link from "next/link";
import { Container } from "@/components/Container";
import { Ornament } from "@/components/Ornament";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ site }: { site: SiteSettings }) {
  const { address } = site;

  return (
    <footer className="mt-auto border-t border-gold/15 bg-ink py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="u-caps text-lg text-white">{site.name}</p>
          <span className="mt-4 flex items-center gap-3 text-gold-dim">
            <Ornament />
            <Ornament flip />
          </span>
          <p className="u-script mt-4 text-xl text-gold-soft">{site.tagline}</p>
        </div>

        <div className="mt-14 grid gap-12 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h2 className="u-caps text-[0.7rem] text-gold">Visit</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-white/70">
              <p>{address.street}</p>
              <p>
                {address.suburb}, {address.city}
              </p>
              <p>{address.country}</p>
            </address>
          </div>

          <div>
            <h2 className="u-caps text-[0.7rem] text-gold">Hours</h2>
            <dl className="mt-4 space-y-1 text-sm text-white/70">
              {site.hours.map((row) => (
                <div key={row._key}>
                  <dt className="inline">{row.days}: </dt>
                  <dd className="inline tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="u-caps text-[0.7rem] text-gold">Get in touch</h2>
            <ul className="mt-4 space-y-1 text-sm text-white/70">
              <li>
                <a
                  className="transition-colors hover:text-gold"
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-gold"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-14">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {site.footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="u-caps text-[0.65rem] text-white/60 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-center text-xs text-white/35">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
