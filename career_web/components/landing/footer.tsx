import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { routes } from "@/lib/routes";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Opportunities", href: routes.opportunities },
      { label: "Internships", href: routes.opportunities },
      { label: "Jobs", href: routes.featured },
      { label: "Graduate Programs", href: routes.opportunities },
      { label: "Career Events", href: routes.opportunities },
    ],
  },
  {
    title: "CareerLink",
    links: [
      { label: "About Us", href: routes.about },
      { label: "For Students", href: routes.students },
      { label: "For Employers", href: routes.employers },
      { label: "For Universities", href: routes.universities },
      { label: "Career Resources", href: routes.resources },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: routes.contact },
      { label: "Contact Us", href: routes.contact },
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Terms of Service", href: routes.terms },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="cl-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="site-footer__text mt-4 max-w-xs text-sm leading-relaxed">
            Connecting Somalia&apos;s students, graduates, universities and employers with
            opportunities for career growth.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="site-footer__heading">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="site-footer__heading">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cl-blue" />
              <a href="mailto:hello@careerlink.so" className="site-footer__link">
                hello@careerlink.so
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-cl-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cl-blue" />
              <span>Mogadishu, Somalia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__divider">
        <div className="cl-container flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="site-footer__bottom">© 2026 CareerLink Somalia. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={routes.privacy} className="site-footer__link">
              Privacy Policy
            </Link>
            <Link href={routes.terms} className="site-footer__link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div id="login" className="sr-only" />
      <div id="contact" className="sr-only" />
    </footer>
  );
}
