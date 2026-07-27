import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { WhyCareerLink } from "@/components/landing/why-careerlink";
import { Testimonials } from "@/components/landing/testimonials";
import { Partners } from "@/components/landing/partners";
import { ContactForm } from "@/components/landing/contact-form";
import { FinalCTA } from "@/components/landing/final-cta";
import { MotionSection } from "@/components/ui/motion-section";

export const metadata: Metadata = {
  title: "About Us | CareerLink Somalia",
  description:
    "Learn about CareerLink Somalia — a career platform connecting students, graduates, universities and employers across Somalia.",
};

const CONTACT_DETAILS = [
  {
    icon: Mail,
    title: "Email",
    text: "hello@careerlink.so",
    href: "mailto:hello@careerlink.so",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Mogadishu, Somalia",
  },
  {
    icon: Clock,
    title: "Response time",
    text: "We typically reply within 1–2 business days.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        label="About CareerLink"
        title="Connecting Education, Talent and Opportunity"
        subtitle="CareerLink Somalia is built to help the next generation discover careers, connect with employers and grow with confidence."
      />
      <WhyCareerLink />
      <Testimonials />
      <Partners />
      <section id="contact" className="section-main py-16 sm:py-20">
        <div className="cl-container">
          <MotionSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="cl-section-label justify-center">Contact Us</p>
              <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">Get in Touch</h2>
              <p className="cl-subtext mt-4 text-base sm:text-lg">
                Questions about CareerLink Somalia? Send us a message or reach out using the
                details below.
              </p>
            </div>
          </MotionSection>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
            <MotionSection className="lg:col-span-2">
              <div className="space-y-4">
                {CONTACT_DETAILS.map(({ icon: Icon, title, text, href }) => (
                  <div key={title} className="cl-card flex gap-4 p-5">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cl-text">{title}</p>
                      {href ? (
                        <a href={href} className="mt-1 block text-sm text-cl-muted hover:text-cl-blue">
                          {text}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-cl-muted">{text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cl-border bg-cl-main/50 p-5">
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-cl-blue" />
                  <p className="text-sm leading-relaxed text-cl-muted">
                    Whether you&apos;re a student, employer or university partner, we&apos;re
                    here to help you get the most out of CareerLink Somalia.
                  </p>
                </div>
              </div>
            </MotionSection>

            <MotionSection delay={0.08} className="lg:col-span-3">
              <ContactForm />
            </MotionSection>
          </div>
        </div>
      </section>
      <FinalCTA />
    </SiteShell>
  );
}
