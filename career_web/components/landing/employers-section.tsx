import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { EmployerDashboardMock } from "./mockups";
import { routes } from "@/lib/routes";

const FEATURES = [
  "Post jobs and internships",
  "Promote graduate programs",
  "Review applicants",
  "Access candidate profiles",
  "Manage applications",
  "Build your employer profile",
  "Connect with universities",
];

export function EmployersSection() {
  return (
    <section id="employers" className="section-blue py-16 sm:py-20">
      <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <MotionSection>
          <p className="cl-section-label">For Employers</p>
          <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">
            Discover Somalia’s Next Generation of Talent
          </h2>
          <p className="cl-subtext mt-4 text-base sm:text-lg">
            CareerLink Somalia helps companies connect with motivated students, graduates and
            young professionals.
          </p>
          <ul className="mt-6 space-y-3">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-cl-text/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cl-success" />
                {item}
              </li>
            ))}
          </ul>
          <Button href={routes.register} className="mt-8">
            Post an Opportunity
            <ArrowRight size={18} />
          </Button>
        </MotionSection>
        <MotionSection delay={0.1}>
          <EmployerDashboardMock />
        </MotionSection>
      </div>
    </section>
  );
}
