import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

export function FinalCTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-cl-blue py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute right-10 top-8 opacity-20">
        <Sparkles className="h-24 w-24 text-white" />
      </div>
      <MotionSection>
        <div className="cl-container relative max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Your Next Opportunity Starts Here.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-50/90 sm:text-lg">
            Join CareerLink Somalia and become part of a growing network connecting education,
            talent and opportunity.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={routes.register} variant="white">
              Create Free Account
            </Button>
            <Button href={routes.opportunities} variant="outline-white">
              Explore Opportunities
            </Button>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
