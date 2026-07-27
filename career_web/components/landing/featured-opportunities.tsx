import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";
import { getFeaturedOpportunities } from "@/lib/opportunities";
import { routes } from "@/lib/routes";
import { OpportunityCard } from "./opportunity-card";

export function FeaturedOpportunities({ showViewAll = true }: { showViewAll?: boolean }) {
  const jobs = getFeaturedOpportunities();

  return (
    <section id="featured" className="section-elevated py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Featured Opportunities"
            subtitle="Explore example opportunity cards that represent the CareerLink experience."
          />
        </MotionSection>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {jobs.map((job, i) => (
            <MotionSection key={job.id} delay={i * 0.06}>
              <OpportunityCard job={job} />
            </MotionSection>
          ))}
        </div>
        {showViewAll && (
          <MotionSection>
            <div className="mt-10 text-center">
              <Button href={routes.opportunities}>
                View All Opportunities
                <ArrowRight size={18} />
              </Button>
            </div>
          </MotionSection>
        )}
      </div>
    </section>
  );
}
