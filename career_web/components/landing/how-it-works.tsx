import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";

const STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Tell employers about your education, skills, experience and career interests.",
  },
  {
    step: "02",
    title: "Discover Opportunities",
    description: "Search internships, jobs, graduate programs and career events.",
  },
  {
    step: "03",
    title: "Apply Easily",
    description: "Submit applications and your CV directly through CareerLink.",
  },
  {
    step: "04",
    title: "Grow Your Career",
    description:
      "Track applications, connect with employers and take the next step in your career.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-secondary py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Your Career Journey Starts Here"
            subtitle="Finding your next opportunity shouldn't be complicated."
          />
        </MotionSection>
        <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cl-blue/40 to-transparent lg:block" />
          {STEPS.map((item, i) => (
            <MotionSection key={item.step} delay={i * 0.08} className="relative text-center lg:text-left">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cl-border bg-cl-elevated text-sm font-bold text-cl-blue shadow-sm lg:mx-0">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-cl-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cl-muted">{item.description}</p>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
