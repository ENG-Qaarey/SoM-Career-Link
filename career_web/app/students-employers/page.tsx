import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { StudentsSection } from "@/components/landing/students-section";
import { EmployersSection } from "@/components/landing/employers-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TopSevenSection } from "@/components/landing/top-seven-section";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "For Students & Employers | CareerLink Somalia",
  description:
    "CareerLink Somalia connects students, graduates and employers — discover opportunities, build profiles and hire the next generation of talent.",
};

export default function StudentsEmployersPage() {
  return (
    <SiteShell>
      <PageHero
        label="For Students & Employers"
        title="One Platform For Your Career Journey"
        subtitle="Discover internships and jobs as a student or graduate, or post opportunities and hire Somalia&apos;s next generation of talent as an employer."
      />
      <div className="cl-container -mt-2 flex flex-wrap gap-2.5 py-6">
        <Link href="#students" className="cl-btn cl-btn-secondary">
          For Students
        </Link>
        <Link href="#employers" className="cl-btn cl-btn-secondary">
          For Employers
        </Link>
      </div>
      <StudentsSection />
      <EmployersSection />
      <TopSevenSection />
      <HowItWorks />
      <FinalCTA />
    </SiteShell>
  );
}