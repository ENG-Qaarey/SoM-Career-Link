import { Briefcase, Calendar, GraduationCap, Workflow } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

const CATEGORIES = [
  {
    icon: Briefcase,
    title: "Internships",
    description: "Gain practical experience and build professional skills.",
    filter: "Internship" as const,
  },
  {
    icon: Workflow,
    title: "Entry-Level Jobs",
    description: "Find opportunities designed for graduates and young professionals.",
    filter: "Entry-Level" as const,
  },
  {
    icon: GraduationCap,
    title: "Graduate Programs",
    description: "Start your professional journey with structured graduate programs.",
    filter: "Graduate Program" as const,
  },
  {
    icon: Calendar,
    title: "Career Events",
    description: "Attend career fairs, workshops, networking events and training programs.",
    filter: "Career Event" as const,
  },
];

export function OpportunityCategories() {
  return (
    <section id="opportunities" className="section-main py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Explore Opportunities"
            subtitle="Discover opportunities designed to help you start and grow your career."
          />
        </MotionSection>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ icon: Icon, title, description, filter }, i) => (
            <MotionSection key={title} delay={i * 0.07}>
              <Link
                href={`${routes.opportunities}?type=${encodeURIComponent(filter)}`}
                className="cl-card block p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-cl-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cl-muted">{description}</p>
              </Link>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
