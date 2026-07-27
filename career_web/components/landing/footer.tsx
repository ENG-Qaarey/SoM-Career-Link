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
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-cl-main text-white">
      <div className="cl-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Connecting Somalia&apos;s students, graduates, universities and employers with
            opportunities for career growth.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold tracking-wide text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cl-blue" />
              <a href="mailto:hello@careerlink.so" className="hover:text-white">
                hello@careerlink.so
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cl-blue" />
              <span>Mogadishu, Somalia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="cl-container flex flex-col gap-3 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CareerLink Somalia. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div id="login" className="sr-only" />
      <div id="contact" className="sr-only" />
      <div id="privacy" className="sr-only" />
      <div id="terms" className="sr-only" />
    </footer>
  );
}
