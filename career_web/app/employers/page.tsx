import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { EmployersSection } from "@/components/landing/employers-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Partners } from "@/components/landing/partners";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "For Employers | CareerLink Somalia",
  description:
    "Post jobs and internships, review applicants and connect with Somalia’s next generation of talent on CareerLink.",
};

export default function EmployersPage() {
  return (
    <SiteShell>
      <PageHero
        label="For Employers"
        title="Discover Somalia’s Next Generation of Talent"
        subtitle="Reach motivated students, graduates and young professionals through a platform built for early-career hiring across Somalia."
      />
      <EmployersSection />
      <HowItWorks />
      <Partners />
      <FinalCTA />
    </SiteShell>
  );
}
