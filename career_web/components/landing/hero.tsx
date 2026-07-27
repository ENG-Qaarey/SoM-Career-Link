import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";
import { HeroPhoneCluster } from "./mockups";

export function Hero() {
  return (
    <section id="home" className="hero-section relative min-h-[min(100vh,920px)] overflow-hidden">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg__gradient" />
        <div className="hero-bg__shine" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-cl-main to-transparent" />

      <div className="cl-container relative z-[2] grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <MotionSection>
          <h1 className="cl-heading text-4xl sm:text-5xl lg:text-[3.4rem]">
            Build Your Career.
            <br />
            Discover Your <span className="hero-highlight">Next Opportunity</span>.
          </h1>
          <p className="cl-subtext mt-5 max-w-xl text-base sm:text-lg">
            CareerLink Somalia connects students and graduates with internships, graduate
            programs, entry-level jobs, employers, universities, and career opportunities
            across Somalia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={routes.opportunities}>
              Explore Opportunities
              <ArrowRight size={18} />
            </Button>
            <Button href={routes.register} variant="secondary">
              Join CareerLink
            </Button>
          </div>
          <p className="mt-5 text-sm text-cl-muted">
            Connecting students, graduates, universities and employers across Somalia.
          </p>
          <p className="mt-2 text-sm font-semibold tracking-wide text-cl-accent">
            Connect. Grow. Succeed.
          </p>
        </MotionSection>

        <MotionSection delay={0.12}>
          <div className="hero-phones-stage">
            <HeroPhoneCluster />
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
