import { ArrowRight, Bookmark, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

/** Example listings for UI demonstration — not live postings. */
const JOBS = [
  {
    initials: "EX",
    title: "Frontend Developer Intern",
    company: "Example Tech Company",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "Recently",
    description: "Support product teams building customer-facing web experiences.",
  },
  {
    initials: "EX",
    title: "Graduate Trainee Program",
    company: "Example Enterprise",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "Recently",
    description: "A structured pathway into operations and professional roles.",
  },
  {
    initials: "EX",
    title: "Marketing Intern",
    company: "Example Brand",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "Recently",
    description: "Assist with campaigns, content, and brand storytelling.",
  },
  {
    initials: "EX",
    title: "Junior Data Analyst",
    company: "Example Analytics",
    location: "Somalia",
    type: "Entry-Level",
    date: "Recently",
    description: "Turn data into insights that support product decisions.",
  },
];

export function FeaturedOpportunities() {
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
          {JOBS.map((job, i) => (
            <MotionSection key={job.title} delay={i * 0.06}>
              <article className="cl-card p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-sm font-bold text-cl-blue">
                      {job.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cl-text">{job.title}</h3>
                      <p className="text-sm text-cl-muted">{job.company}</p>
                    </div>
                  </div>
                  <span className="rounded-lg p-2 text-cl-muted">
                    <Bookmark size={18} />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cl-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} />
                    {job.location}
                  </span>
                  <span className="rounded-md bg-cl-blue-light px-2 py-0.5 font-medium text-cl-blue">
                    {job.type}
                  </span>
                  <span>{job.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cl-muted">{job.description}</p>
              </article>
            </MotionSection>
          ))}
        </div>
        <MotionSection>
          <div className="mt-10 text-center">
            <Button href={routes.opportunities}>
              View All Opportunities
              <ArrowRight size={18} />
            </Button>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
