import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { OpportunityCategories } from "@/components/landing/opportunity-categories";
import { FeaturedOpportunities } from "@/components/landing/featured-opportunities";
import { HowItWorks } from "@/components/landing/how-it-works";
import { StudentsSection } from "@/components/landing/students-section";
import { EmployersSection } from "@/components/landing/employers-section";
import { UniversitiesSection } from "@/components/landing/universities-section";
import { CareerNetworkSection } from "@/components/landing/career-network-section";
import { WhyCareerLink } from "@/components/landing/why-careerlink";
import { MobileShowcase } from "@/components/landing/mobile-showcase";
import { CareerResources } from "@/components/landing/career-resources";
import { Testimonials } from "@/components/landing/testimonials";
import { Partners } from "@/components/landing/partners";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cl-main text-cl-text">
      <Navbar />
      <Hero />
      <Stats />
      <OpportunityCategories />
      <FeaturedOpportunities />
      <HowItWorks />
      <StudentsSection />
      <EmployersSection />
      <UniversitiesSection />
      <CareerNetworkSection />
      <WhyCareerLink />
      <MobileShowcase />
      <CareerResources />
      <Testimonials />
      <Partners />
      <FinalCTA />
      <Footer />
    </main>
  );
}
