import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { routes } from "@/lib/routes";

const FEATURES = [
  "Discover internships and jobs",
  "Upload and manage your CV",
  "Save interesting opportunities",
  "Track your applications",
  "Connect with employers",
  "Discover career events",
  "Build your professional profile",
];

export function StudentsSection() {
  return (
    <section id="students" className="section-main py-16 sm:py-20">
      <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <MotionSection>
          <div className="rounded-2xl border border-cl-border bg-cl-elevated p-6 sm:p-8">
            <div className="flex -space-x-3">
              {["AH", "YM", "FS", "KA"].map((id, i) => (
                <div
                  key={id}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cl-elevated text-sm font-bold text-white"
                  style={{ background: ["#0D6EFD", "#1e3a8a", "#2563eb", "#1d4ed8"][i] }}
                >
                  {id}
                </div>
              ))}
            </div>
            <p className="mt-5 text-lg font-bold text-cl-text">Campus to career</p>
            <p className="mt-2 text-sm text-cl-muted">
              Students and graduates preparing profiles, CVs, and applications together.
            </p>
          </div>
        </MotionSection>
        <MotionSection delay={0.1}>
          <p className="cl-section-label">For Students & Graduates</p>
          <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">
            Turn Your Education Into Opportunity
          </h2>
          <p className="cl-subtext mt-4 text-base sm:text-lg">
            Build your professional profile, discover opportunities that match your interests
            and connect with organizations looking for emerging talent.
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
            Start Your Career Journey
            <ArrowRight size={18} />
          </Button>
        </MotionSection>
      </div>
    </section>
  );
}
