import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";

const STATS = [
  { value: "Growing", label: "Student & graduate community" },
  { value: "Expanding", label: "Career opportunities listed" },
  { value: "Partnering", label: "Employers & companies" },
  { value: "Connecting", label: "Universities & institutions" },
];

export function Stats() {
  return (
    <section className="section-secondary py-14">
      <div className="cl-container py-14">
        <MotionSection>
          <SectionHeading title="Building Somalia’s Career Network" />
        </MotionSection>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <MotionSection key={stat.label} delay={i * 0.06} className="text-center">
              <p className="text-2xl font-bold tracking-tight text-cl-blue sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-cl-muted sm:text-base">{stat.label}</p>
            </MotionSection>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-xs text-cl-muted">
          Figures will be published as the platform grows — placeholders are qualitative, not
          production claims.
        </p>
      </div>
    </section>
  );
}
