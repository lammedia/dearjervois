import Link from "next/link";
import { Container } from "@/components/Container";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ site }: { site: SiteSettings }) {
  const { address } = site;

  return (
    <footer className="mt-auto border-t border-line py-14">
      <Container width="wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg">{site.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{site.tagline}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium">Visit</h2>
            <address className="mt-3 space-y-1 text-sm text-ink-muted not-italic">
              <p>
                {address.street}, {address.suburb}
              </p>
              <p>
                {address.city}, {address.country}
              </p>
              <p>
                <a className="hover:text-ink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  className="hover:text-ink"
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                >
                  {site.phone}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium">Explore</h2>
            <ul className="mt-3 space-y-2">
              {site.footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-xs text-ink-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
