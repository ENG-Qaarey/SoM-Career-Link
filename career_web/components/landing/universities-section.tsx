import { ArrowRight, Building2, Calendar, GraduationCap, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

const FEATURES = [
  { icon: GraduationCap, title: "Student Opportunities", text: "Help students discover internships and early-career roles." },
  { icon: Calendar, title: "Career Events", text: "Promote career fairs, workshops and campus programs." },
  { icon: Handshake, title: "Employer Connections", text: "Build partnerships with companies hiring across Somalia." },
  { icon: Building2, title: "Graduate Programs", text: "Connect graduating cohorts with structured pathways." },
];

export function UniversitiesSection() {
  return (
    <section id="universities" className="section-elevated py-16 sm:py-20">
      <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <MotionSection>
          <h2 className="cl-heading text-3xl sm:text-4xl">
            Connecting Universities With Career Opportunities
          </h2>
          <p className="cl-subtext mt-4 text-base sm:text-lg">
            Universities can help students discover internships, graduate programs, career
            events and employment opportunities through CareerLink Somalia.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-cl-border bg-cl-main/50 p-4">
                <Icon className="h-5 w-5 text-cl-blue" />
                <h3 className="mt-3 text-sm font-semibold text-cl-text">{title}</h3>
                <p className="mt-1 text-sm text-cl-muted">{text}</p>
              </div>
            ))}
          </div>
          <Button href={routes.register} className="mt-8">
            Join as a University
            <ArrowRight size={18} />
          </Button>
        </MotionSection>
        <MotionSection delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-cl-border bg-cl-main p-6 text-cl-text sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,110,253,0.35),transparent_55%)]" />
            <div className="relative">
              <p className="text-sm font-semibold text-cl-accent">University network</p>
              <h3 className="mt-2 text-2xl font-bold">Education meets opportunity</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cl-muted">
                Connect campuses, career offices, and graduating classes with employers hiring
                across Somalia.
              </p>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
