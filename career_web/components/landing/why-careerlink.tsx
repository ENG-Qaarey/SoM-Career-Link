import {
  Briefcase,
  Lightbulb,
  MessageCircle,
  Network,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionSection } from "@/components/ui/motion-section";

const WHY = [
  { icon: Briefcase, title: "Real Opportunities", text: "Discover internships, jobs and graduate programs from employers." },
  { icon: Sparkles, title: "Easy to Use", text: "A simple platform designed for students, graduates and employers." },
  { icon: Lightbulb, title: "Career Growth", text: "Access opportunities and resources designed to support your journey." },
  { icon: Network, title: "Trusted Network", text: "Connect universities, companies, employers and emerging professionals." },
  { icon: MessageCircle, title: "Stay Updated", text: "Receive updates about applications, opportunities and career events." },
  { icon: Users, title: "Built for Somalia", text: "A career platform designed to support Somalia’s next generation." },
];

export function WhyCareerLink() {
  return (
    <section id="about" className="section-elevated py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading title="Why CareerLink?" />
        </MotionSection>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, text }, i) => (
            <MotionSection key={title} delay={i * 0.05}>
              <div className="cl-card p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cl-blue-light text-cl-blue">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold uppercase tracking-wide text-cl-text">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cl-muted">{text}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}
