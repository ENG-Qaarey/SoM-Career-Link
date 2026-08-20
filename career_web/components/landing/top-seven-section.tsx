import { MessageCircle, Star, Users } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import { SectionHeading } from "@/components/ui/section-heading";

const TOP_SEVEN = [
  { initials: "AH", name: "Amina H.", role: "Mentor" },
  { initials: "YM", name: "Yusuf M.", role: "Employer" },
  { initials: "FS", name: "Fadumo S.", role: "Peer" },
  { initials: "KA", name: "Khalid A.", role: "Lecturer" },
  { initials: "NH", name: "Nimco H.", role: "Recruiter" },
  { initials: "OR", name: "Omar R.", role: "Colleague" },
  { initials: "SH", name: "Sahra H.", role: "Advisor" },
];

const AVATAR_COLORS = [
  "#0D6EFD",
  "#1e3a8a",
  "#2563eb",
  "#1d4ed8",
  "#3b82f6",
  "#0ea5e9",
  "#1e40af",
];

export function TopSevenSection() {
  return (
    <section id="top7" className="section-elevated py-16 sm:py-20">
      <div className="cl-container">
        <MotionSection>
          <SectionHeading
            label="Unique to CareerLink"
            title="Top 7 and Real-Time Chat"
            subtitle="Showcase seven important professional connections on your profile, then talk with employers and peers in one place."
          />
        </MotionSection>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <MotionSection>
            <article className="cl-card h-full p-6 sm:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                <Star size={20} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-cl-text">Top 7</h3>
              <p className="mt-2 text-sm leading-relaxed text-cl-muted">
                Students, graduates, and companies can pin seven people who matter most — mentors,
                colleagues, recruiters, and partners — so visitors immediately see a trusted
                professional network.
              </p>
              <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
                {TOP_SEVEN.map((person, i) => (
                  <div key={person.initials} className="flex flex-col items-center gap-1.5">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[0.65rem] font-bold text-white ring-2 ring-cl-elevated sm:h-12 sm:w-12 sm:text-xs"
                      style={{ background: AVATAR_COLORS[i] }}
                      title={`${person.name} · ${person.role}`}
                    >
                      {person.initials}
                    </div>
                    <span className="hidden text-[10px] font-medium text-cl-muted sm:block">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-cl-accent">
                <Users size={14} />
                Seven connections. One profile.
              </p>
            </article>
          </MotionSection>

          <MotionSection delay={0.08}>
            <article className="cl-card h-full p-6 sm:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                <MessageCircle size={20} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-cl-text">Real-time chat</h3>
              <p className="mt-2 text-sm leading-relaxed text-cl-muted">
                Talk with employers, applicants, and university partners without leaving the
                platform — so applications turn into conversations and conversations into
                professional relationships.
              </p>
              <div className="mt-6 space-y-3 rounded-xl border border-cl-border bg-cl-main/50 p-4">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-cl-blue-light px-3.5 py-2.5 text-sm text-cl-text">
                  Hi Amina — we reviewed your internship application. Are you available this week?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-cl-blue px-3.5 py-2.5 text-sm text-white">
                  Yes, thank you. I can chat tomorrow afternoon.
                </div>
                <p className="text-xs text-cl-muted">Secure professional messaging on CareerLink</p>
              </div>
            </article>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
