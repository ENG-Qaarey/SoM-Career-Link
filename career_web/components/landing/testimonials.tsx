import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";

/** Illustrative quotes for layout only — not attributed production testimonials. */
const ITEMS = [
  {
    role: "Student / Graduate",
    quote:
      "A clear place to discover internships and track applications helps emerging professionals stay organized.",
  },
  {
    role: "Employer",
    quote:
      "Hiring teams need a simple way to reach motivated graduates and manage early-career openings.",
  },
  {
    role: "University",
    quote:
      "Career offices benefit from stronger bridges between campuses, employers, and opportunity discovery.",
  },
];

export function Testimonials() {
  return (
    <section className="section-secondary py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Growing Careers Across Somalia"
            subtitle="Sample perspectives that reflect CareerLink’s audience — replace with verified testimonials when available."
          />
        </MotionSection>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <MotionSection key={item.role} delay={i * 0.07}>
              <article className="cl-card flex flex-col p-6">
                <div className="mb-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-cl-text/85">“{item.quote}”</p>
                <p className="mt-6 border-t border-cl-border pt-5 text-sm font-semibold text-cl-accent">
                  {item.role}
                </p>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
