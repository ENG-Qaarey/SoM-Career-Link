import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";
import { CareerNetworkSceneDynamic } from "@/components/three/scene-loaders";

export function CareerNetworkSection() {
  return (
    <section id="network" className="section-secondary py-16 sm:py-20">
      <div className="cl-container grid items-center gap-10 lg:grid-cols-2">
        <MotionSection>
          <SectionHeading
            align="left"
            title="An Interactive Career Network"
            subtitle="Students, graduates, employers, universities and opportunities connected in one professional platform."
          />
        </MotionSection>
        <MotionSection delay={0.1}>
          <CareerNetworkSceneDynamic />
        </MotionSection>
      </div>
    </section>
  );
}
