"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import type { NavLink, SiteSettings } from "@/lib/types";

/**
 * Sticky header, transparent over the hero and filling with the ink ground
 * once scrolled — the behaviour the theme enables via @sticky-header with
 * @main-menu-text-sticky-color white.
 *
 * Below 900px (the WordPress theme's own .responsive-layout breakpoint) the
 * nav becomes a full-screen overlay rather than a stacked list, so it stays a
 * deliberate composition instead of a squashed desktop bar.
 */
export function SiteHeader({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close on navigation. Adjusting during render rather than in an effect
  // avoids a frame where the overlay is still up on the new page.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the overlay is up: lock the page behind it and let Escape dismiss.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "bg-ink/95 backdrop-blur-sm"
            : "bg-linear-to-b from-black/45 to-transparent"
        }`}
      >
      <Container width="wide">
          <div className="flex min-h-20 items-center justify-between gap-6 py-4 lg:min-h-28">
            <Wordmark name={site.name} />

            <nav aria-label="Primary" className="hidden nav:block">
              <ul className="flex items-center gap-8 lg:gap-11">
                {site.nav.map((link) => (
                  <li key={link.href}>
                    <NavItem link={link} pathname={pathname} />
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="-mr-2 inline-flex size-12 items-center justify-center text-white nav:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </header>

      {/*
        Full-screen overlay nav, deliberately a sibling of <header> rather than
        a child: the header sets backdrop-filter, which makes it the containing
        block for fixed-position descendants and would collapse this to the
        height of the bar. It sits below the header's z-index so the close
        button stays on top. `hidden` keeps it out of the tab order and the
        accessibility tree entirely while closed.
      */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink pt-24 nav:hidden"
      >
        <nav aria-label="Primary (mobile)" className="h-full overflow-y-auto">
          <Container>
            <ul className="flex flex-col items-center gap-2 py-12">
              {site.nav.map((link) => (
                <li key={link.href} className="w-full">
                  <NavItem link={link} pathname={pathname} block />
                </li>
              ))}
            </ul>
            <p className="pb-12 text-center text-sm text-body-muted">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </p>
          </Container>
        </nav>
      </div>
    </>
  );
}

function NavItem({
  link,
  pathname,
  block = false,
}: {
  link: NavLink;
  pathname: string;
  block?: boolean;
}) {
  const active = pathname === link.href;

  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={[
        "u-caps relative transition-colors duration-200",
        block
          ? "flex min-h-14 items-center justify-center text-base"
          : "text-[0.7rem]",
        active ? "text-gold" : "text-white hover:text-gold",
      ].join(" ")}
    >
      {link.label}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M3 7h18" />
          <path d="M3 12h18" />
          <path d="M3 17h18" />
        </>
      )}
    </svg>
  );
}
