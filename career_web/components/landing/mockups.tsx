import Image from "next/image";
import {
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  GraduationCap,
  Home,
  MapPin,
  MessageSquare,
  Search,
  Share2,
  User,
} from "lucide-react";
import "./mockups.css";

const ICON_SRC = "/brand/icon.png";

const CATEGORIES = [
  { icon: Briefcase, label: "Internships" },
  { icon: Building2, label: "Jobs" },
  { icon: GraduationCap, label: "Graduate Programs" },
  { icon: Calendar, label: "Events" },
] as const;

const JOBS = [
  {
    initials: "BW",
    color: "#2563eb",
    title: "Frontend Developer Intern",
    company: "BlueWave Technologies",
    location: "Mogadishu, Somalia",
    type: "Internship",
  },
  {
    initials: "IB",
    color: "#0f766e",
    title: "Graduate Trainee Program",
    company: "IBS Bank",
    location: "Mogadishu, Somalia",
    type: "Full-time",
  },
] as const;

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: Bookmark, label: "Saved", active: false },
  { icon: Briefcase, label: "Applications", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: User, label: "Profile", active: false },
] as const;

function PhoneChrome({
  children,
  className = "",
  size = "md",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  light?: boolean;
}) {
  return (
    <div
      className={`phone-chrome phone-chrome--${size}${light ? " phone-chrome--light" : ""} ${className}`.trim()}
    >
      <div className="phone-chrome__notch" />
      <div className="phone-chrome__body">{children}</div>
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`mock-status${light ? " mock-status--light" : ""}`}>
      <span>9:41</span>
      <div className="mock-status__icons" aria-hidden>
        <span className="mock-status__signal" />
        <span className="mock-status__wifi" />
        <span className="mock-status__battery" />
      </div>
    </div>
  );
}

/** Real CareerLink mark — white on dark surfaces via lighten blend */
function BrandIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`brand-icon ${className}`} style={{ width: size, height: size }}>
      <Image
        src={ICON_SRC}
        alt=""
        width={size}
        height={size}
        className="brand-icon__img"
        priority
      />
    </span>
  );
}

function SplashBrand() {
  return (
    <div className="splash-brand">
      <BrandIcon size={64} className="splash-brand__icon" />
      <p className="splash-brand__name">CareerLink</p>
      <div className="splash-brand__somalia">
        <span className="splash-brand__rule" />
        <span>SOMALIA</span>
        <span className="splash-brand__rule" />
      </div>
      <p className="splash-brand__tagline">
        Connect. Grow.
        <br />
        Succeed.
      </p>
    </div>
  );
}

function Skyline() {
  return (
    <div className="mock-skyline" aria-hidden>
      <svg viewBox="0 0 320 70" preserveAspectRatio="xMidYMax meet">
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M0 70V42h18V30h10v12h14V24h8v18h12V18h6l4-8 4 8h6v24h16V28h10v14h12V34h8v8h14V22h7l3-6 3 6h7v20h18V36h10v34H0z" />
          <path d="M52 30v-8M96 24v-10M148 28v-8M210 22v-12M268 36v-8" />
          <path d="M98 14c0-4 3-7 6-7s6 3 6 7" />
          <path d="M212 10c0-5 4-9 8-9s8 4 8 9" />
        </g>
      </svg>
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="mock-screen splash-screen">
      <StatusBar light />
      <div className="splash-screen__hero">
        <SplashBrand />
        <Skyline />
      </div>
      <div className="splash-screen__sheet">
        <button type="button" className="splash-screen__btn splash-screen__btn--primary">
          Get Started
        </button>
        <button type="button" className="splash-screen__btn splash-screen__btn--outline">
          Login
        </button>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="mock-screen home-screen">
      <StatusBar />
      <div className="home-screen__scroll">
        <div className="home-screen__header">
          <div>
            <p className="home-screen__hello">
              Hello, Ahmed <span aria-hidden>👋</span>
            </p>
            <p className="home-screen__sub">Ready to take the next step?</p>
          </div>
          <button type="button" className="home-screen__bell" aria-label="Notifications">
            <Bell size={13} strokeWidth={2} />
            <span className="home-screen__bell-dot" />
          </button>
        </div>

        <div className="home-screen__search">
          <Search size={11} strokeWidth={2} />
          <span>Search jobs, internships, programs...</span>
        </div>

        <div className="home-screen__banner">
          <div className="home-screen__banner-copy">
            <p>Find Opportunities That Match Your Skills</p>
            <span className="home-screen__banner-btn">Explore Now</span>
          </div>
          <div className="home-screen__banner-art" aria-hidden>
            <div className="home-screen__briefcase">
              <Briefcase size={20} strokeWidth={2.2} />
            </div>
            <div className="home-screen__mag">
              <Search size={11} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="home-screen__section-head">
          <span>Categories</span>
          <button type="button">See all</button>
        </div>
        <div className="home-screen__categories">
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <div key={label} className="home-screen__category">
              <div className="home-screen__category-icon">
                <Icon size={14} strokeWidth={2} />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="home-screen__section-head">
          <span>Recommended for you</span>
          <button type="button">See all</button>
        </div>
        <div className="home-screen__jobs">
          {JOBS.map((job) => (
            <div key={job.title} className="home-screen__job">
              <div
                className="home-screen__job-logo"
                style={{ background: `${job.color}18`, color: job.color }}
              >
                {job.initials}
              </div>
              <div className="home-screen__job-body">
                <p className="home-screen__job-title">{job.title}</p>
                <p className="home-screen__job-co">{job.company}</p>
                <p className="home-screen__job-meta">
                  <MapPin size={8} strokeWidth={2} />
                  {job.location}
                </p>
                <span className="home-screen__job-type">{job.type}</span>
              </div>
              <Bookmark size={12} strokeWidth={2} className="home-screen__job-save" />
            </div>
          ))}
        </div>
      </div>

      <nav className="home-screen__nav" aria-label="App navigation">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`home-screen__nav-item${active ? " home-screen__nav-item--active" : ""}`}
          >
            <Icon size={13} strokeWidth={active ? 2.4 : 2} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

function JobDetailsScreen() {
  return (
    <div className="mock-screen details-screen">
      <StatusBar />
      <div className="details-screen__top">
        <button type="button" className="details-screen__icon-btn" aria-label="Back">
          <ChevronLeft size={14} />
        </button>
        <button type="button" className="details-screen__icon-btn" aria-label="Share">
          <Share2 size={12} />
        </button>
      </div>
      <div className="details-screen__body">
        <div className="details-screen__logo">BW</div>
        <h3 className="details-screen__title">Frontend Developer Intern</h3>
        <p className="details-screen__co">BlueWave Technologies</p>
        <p className="details-screen__meta">
          <MapPin size={9} />
          Mogadishu, Somalia · Internship
        </p>
        <div className="details-screen__chips">
          <span>On-site</span>
          <span>3 months</span>
          <span>Paid</span>
        </div>
        <div className="details-screen__block">
          <p className="details-screen__label">About the role</p>
          <p className="details-screen__text">
            Join our product team and help build career tools for students and graduates
            across Somalia.
          </p>
        </div>
        <div className="details-screen__block">
          <p className="details-screen__label">Requirements</p>
          <ul className="details-screen__list">
            <li>HTML, CSS & React basics</li>
            <li>Currently enrolled or recent grad</li>
            <li>Strong communication skills</li>
          </ul>
        </div>
      </div>
      <div className="details-screen__footer">
        <button type="button" className="details-screen__save" aria-label="Save">
          <Bookmark size={14} />
        </button>
        <button type="button" className="details-screen__apply">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export function HeroPhoneCluster() {
  return (
    <div className="hero-phone-cluster">
      <div className="hero-phone-cluster__glow hero-phone-cluster__glow--left" />
      <div className="hero-phone-cluster__glow hero-phone-cluster__glow--right" />
      <div className="hero-phone-cluster__side hero-phone-cluster__side--left">
        <PhoneChrome size="sm">
          <SplashScreen />
        </PhoneChrome>
      </div>
      <div className="hero-phone-cluster__main">
        <PhoneChrome size="lg">
          <HomeScreen />
        </PhoneChrome>
      </div>
      <div className="hero-phone-cluster__side hero-phone-cluster__side--right">
        <PhoneChrome size="sm">
          <JobDetailsScreen />
        </PhoneChrome>
      </div>
    </div>
  );
}

export function MobileAppPhones() {
  return (
    <div className="mobile-app-phones">
      <div className="mobile-app-phones__side">
        <PhoneChrome size="md" light>
          <SplashScreen />
        </PhoneChrome>
      </div>
      <div className="mobile-app-phones__main">
        <PhoneChrome size="lg" light>
          <HomeScreen />
        </PhoneChrome>
      </div>
      <div className="mobile-app-phones__side">
        <PhoneChrome size="md" light>
          <JobDetailsScreen />
        </PhoneChrome>
      </div>
    </div>
  );
}

export function EmployerDashboardMock() {
  return (
    <div className="employer-dash">
      <div className="employer-dash__titlebar">
        <div className="employer-dash__dot employer-dash__dot--red" />
        <div className="employer-dash__dot employer-dash__dot--amber" />
        <div className="employer-dash__dot employer-dash__dot--green" />
        <span className="employer-dash__title">Employer Dashboard</span>
      </div>
      <div className="employer-dash__stats">
        {[
          { label: "Active Jobs", value: "12" },
          { label: "Applications", value: "248" },
          { label: "Candidates", value: "86" },
        ].map((stat) => (
          <div key={stat.label} className="employer-dash__stat">
            <p className="employer-dash__stat-label">{stat.label}</p>
            <p className="employer-dash__stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="employer-dash__section">
        <p className="employer-dash__section-title">Recent Applications</p>
        {[
          { name: "Hodan A.", role: "Frontend Intern", time: "2h ago" },
          { name: "Yusuf M.", role: "Graduate Trainee", time: "5h ago" },
          { name: "Fadumo S.", role: "Data Analyst", time: "1d ago" },
        ].map((row) => (
          <div key={row.name} className="employer-dash__row">
            <div className="employer-dash__row-left">
              <div className="employer-dash__avatar">
                {row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="employer-dash__name">{row.name}</p>
                <p className="employer-dash__role">{row.role}</p>
              </div>
            </div>
            <span className="employer-dash__time">{row.time}</span>
          </div>
        ))}
      </div>
      <div className="employer-dash__section employer-dash__section--muted">
        <div className="employer-dash__perf-head">
          <p className="employer-dash__section-title" style={{ marginBottom: 0 }}>
            Job Performance
          </p>
          <span className="employer-dash__perf-meta">Last 30 days</span>
        </div>
        <div className="employer-dash__bars">
          {[40, 55, 35, 70, 50, 85, 60, 75, 90, 68].map((h, i) => (
            <div key={i} className="employer-dash__bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
