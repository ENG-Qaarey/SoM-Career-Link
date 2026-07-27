import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";

const PLACEHOLDERS = [
  "Employer placeholder",
  "University placeholder",
  "Company placeholder",
  "Organization placeholder",
  "Institution placeholder",
  "Partner placeholder",
];

export function Partners() {
  return (
    <section className="section-elevated py-14">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Connect With Leading Organizations"
            subtitle="Placeholder marks only — official partners will appear here once confirmed."
          />
        </MotionSection>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PLACEHOLDERS.map((name, i) => (
            <MotionSection key={name} delay={i * 0.04}>
              <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-cl-border bg-cl-main/40 px-3 text-center text-xs font-semibold tracking-wide text-cl-muted">
                {name}
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
