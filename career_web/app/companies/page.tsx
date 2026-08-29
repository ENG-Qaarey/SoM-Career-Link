import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { UniversitiesSection } from "@/components/landing/universities-section";
import { Partners } from "@/components/landing/partners";
import { Testimonials } from "@/components/landing/testimonials";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "Companies & Universities | CareerLink Somalia",
  description:
    "Help students, graduates, companies and universities discover internships, graduate programs, career events and employer connections through CareerLink Somalia.",
};

export default function UniversitiesPage() {
  return (
    <SiteShell>
      <PageHero
        label="For Companies & Universities"
        title="Connecting Companies & Universities With Career Opportunities"
        subtitle="Build stronger bridges between campus, companies and the opportunities that shape students' and graduates' futures."
      />
      <UniversitiesSection />
      <Partners />
      <Testimonials />
      <FinalCTA />
    </SiteShell>
  );
}
