import {
  FileText,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Network,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

const RESOURCES = [
  { icon: FileText, title: "CV & Resume Tips" },
  { icon: MessageCircle, title: "Interview Preparation" },
  { icon: Lightbulb, title: "Career Guidance" },
  { icon: Workflow, title: "Professional Skills" },
  { icon: Network, title: "Networking Tips" },
  { icon: GraduationCap, title: "Graduate Career Advice" },
];

export function CareerResources() {
  return (
    <section id="resources" className="section-main py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            title="Grow Beyond the Job Search"
            subtitle="Resources designed to help you prepare for your professional future."
          />
        </MotionSection>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map(({ icon: Icon, title }, i) => (
            <MotionSection key={title} delay={i * 0.05}>
              <Link href={routes.resources} className="cl-card flex items-center gap-4 p-5">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-cl-text">{title}</h3>
                  <p className="text-sm text-cl-muted">Practical guidance for your next step</p>
                </div>
              </Link>
            </MotionSection>
          ))}
        </div>
        <MotionSection>
          <div className="mt-10 text-center">
            <Button href={routes.resources}>Explore Career Resources</Button>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
