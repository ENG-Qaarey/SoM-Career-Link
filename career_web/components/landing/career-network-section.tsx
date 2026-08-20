import { Landmark, MessageCircle, Sparkles, Star } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";

const HIGHLIGHTS = [
  {
    icon: Star,
    title: "Top 7 on every profile",
    text: "Pin seven mentors, peers, recruiters or partners so visitors see your most important network first.",
  },
  {
    icon: MessageCircle,
    title: "Real-time professional chat",
    text: "Applications become conversations. Talk with employers and candidates without leaving CareerLink.",
  },
  {
    icon: Landmark,
    title: "Students, companies, campuses",
    text: "One connected ecosystem across Somalia — talent, hiring teams and universities in the same place.",
  },
];

const TOP_SEVEN = [
  { initials: "AH", name: "Amina", role: "Student" },
  { initials: "YM", name: "Yusuf", role: "Employer" },
  { initials: "FS", name: "Fadumo", role: "Graduate" },
  { initials: "KA", name: "Khalid", role: "Lecturer" },
  { initials: "NH", name: "Nimco", role: "Recruiter" },
  { initials: "OR", name: "Omar", role: "Colleague" },
  { initials: "SH", name: "Sahra", role: "Advisor" },
];

const NODE_COLORS = [
  "#0D6EFD",
  "#2563eb",
  "#1d4ed8",
  "#38bdf8",
  "#3b82f6",
  "#1e40af",
  "#60a5fa",
];

function NetworkConstellation() {
  const radius = 38;
  const nodes = TOP_SEVEN.map((person, i) => {
    const angle = ((i / TOP_SEVEN.length) * 360 - 90) * (Math.PI / 180);
    return {
      ...person,
      color: NODE_COLORS[i],
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });

  return (
    <div className="network-stage" aria-hidden={false} aria-label="Top 7 career network">
      <div className="network-stage__glow" />
      <svg className="network-stage__lines" viewBox="0 0 100 100" aria-hidden>
        {nodes.map((node) => (
          <line
            key={`line-${node.initials}`}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="rgba(96, 165, 250, 0.45)"
            strokeWidth="0.45"
          />
        ))}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`ring-${node.initials}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(13, 110, 253, 0.22)"
              strokeWidth="0.28"
              strokeDasharray="1.2 1.4"
            />
          );
        })}
      </svg>

      <div className="network-stage__hub">
        <Sparkles size={16} />
        <span>You</span>
      </div>

      {nodes.map((node) => (
        <div
          key={node.initials}
          className="network-stage__node"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="network-stage__avatar" style={{ background: node.color }}>
            {node.initials}
          </div>
          <p className="network-stage__name">{node.name}</p>
          <p className="network-stage__role">{node.role}</p>
        </div>
      ))}

      <div className="network-stage__chip network-stage__chip--left">
        <MessageCircle size={14} />
        Live chat
      </div>
      <div className="network-stage__chip network-stage__chip--right">
        <Star size={14} />
        Top 7
      </div>
    </div>
  );
}

export function CareerNetworkSection() {
  return (
    <section id="network" className="network-section py-16 sm:py-20">
      <div className="cl-container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <MotionSection>
            <p className="cl-section-label">Career network</p>
            <h2 className="cl-heading mt-3 text-3xl sm:text-4xl lg:text-[2.6rem]">
              Your professional world,{" "}
              <span className="hero-highlight">connected</span>
            </h2>
            <p className="cl-subtext mt-4 max-w-xl text-base sm:text-lg">
              CareerLink Somalia brings students, graduates, employers and universities into
              one network — with Top 7 profiles and real-time chat to turn connections into
              opportunity.
            </p>
            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3.5">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-cl-text">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-cl-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </MotionSection>

          <MotionSection delay={0.1}>
            <NetworkConstellation />
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
