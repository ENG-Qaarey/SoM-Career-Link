import type { Metadata } from "next";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { StudentsSection } from "@/components/landing/students-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CareerResources } from "@/components/landing/career-resources";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "For Students | CareerLink Somalia",
  description:
    "Discover internships and jobs, manage your CV, track applications and connect with employers on CareerLink Somalia.",
};

export default function StudentsPage() {
  return (
    <SiteShell>
      <PageHero
        label="For Students & Graduates"
        title="Start Your Career Journey With Confidence"
        subtitle="CareerLink Somalia helps students and graduates discover opportunities, build profiles and take the next step toward meaningful employment."
      />
      <StudentsSection />
      <HowItWorks />
      <CareerResources />
      <FinalCTA />
    </SiteShell>
  );
}
