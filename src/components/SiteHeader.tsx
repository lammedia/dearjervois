"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import type { NavLink } from "@/lib/types";

export function SiteHeader({ name, nav }: { name: string; nav: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Any navigation closes the menu, including back/forward. Adjusting state
  // during render rather than in an effect avoids a second paint with the
  // menu still open.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes it, and focus returns to a sensible place via the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <Container width="wide">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-lg tracking-wide"
            aria-label={`${name} — home`}
          >
            {name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {nav.map((link) => (
                <li key={link.href}>
                  <NavItem link={link} pathname={pathname} />
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line md:hidden"
      >
        <Container width="wide">
          <nav aria-label="Primary (mobile)">
            <ul className="flex flex-col py-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <NavItem link={link} pathname={pathname} block />
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
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
        "text-sm tracking-wide transition-colors",
        block ? "flex min-h-12 items-center" : "",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
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
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
