import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { CareerResources } from "@/components/landing/career-resources";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "Career Resources | CareerLink Somalia",
  description:
    "CV tips, interview preparation, career guidance and professional skills resources to support your growth beyond the job search.",
};

export default function ResourcesPage() {
  return (
    <SiteShell>
      <PageHero
        label="Career Resources"
        title="Grow Beyond the Job Search"
        subtitle="Practical guidance to help students and graduates prepare for interviews, build skills and navigate their professional future."
      />
      <CareerResources />
      <HowItWorks />
      <FinalCTA />
    </SiteShell>
  );
}
