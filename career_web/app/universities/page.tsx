import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { UniversitiesSection } from "@/components/landing/universities-section";
import { Partners } from "@/components/landing/partners";
import { Testimonials } from "@/components/landing/testimonials";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "Universities | CareerLink Somalia",
  description:
    "Help students discover internships, graduate programs, career events and employer connections through CareerLink Somalia.",
};

export default function UniversitiesPage() {
  return (
    <SiteShell>
      <PageHero
        label="For Universities"
        title="Connecting Universities With Career Opportunities"
        subtitle="Support your students with stronger bridges between campus, employers and the opportunities that shape their futures."
      />
      <UniversitiesSection />
      <Partners />
      <Testimonials />
      <FinalCTA />
    </SiteShell>
  );
}
