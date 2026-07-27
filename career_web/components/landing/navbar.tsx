"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { routes } from "@/lib/routes";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { label: "Home", href: routes.home },
  { label: "Opportunities", href: routes.opportunities },
  { label: "For Students", href: routes.students },
  { label: "For Employers", href: routes.employers },
  { label: "Universities", href: routes.universities },
  { label: "Career Resources", href: routes.resources },
  { label: "About Us", href: routes.about },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-[box-shadow,border-color] ${
        scrolled ? "border-cl-border/40 shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="cl-container flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-[0.82rem] font-medium text-cl-muted transition hover:bg-cl-blue-light hover:text-cl-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={routes.login}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-cl-text transition hover:text-cl-blue"
            >
              Login
            </Link>
            <Link href={routes.register} className="cl-btn cl-btn-primary !min-h-11 !px-4 text-sm">
              Create Account
            </Link>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cl-border text-cl-text xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="site-header__mobile border-t border-cl-border xl:hidden">
          <nav className="cl-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-cl-text hover:bg-cl-blue-light"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-cl-border pt-4">
              <Link href={routes.login} className="cl-btn cl-btn-secondary w-full" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href={routes.register} className="cl-btn cl-btn-primary w-full" onClick={() => setOpen(false)}>
                Create Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
