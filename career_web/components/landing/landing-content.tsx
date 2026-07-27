"use client";

import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  Network,
  Sparkles,
  Star,
  Users,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { Footer } from "./footer";
import {
  EmployerDashboardMock,
  HeroPhoneCluster,
  MobileAppPhones,
} from "./mockups";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";
import "./mockups.css";

const STATS = [
  { value: "10,000+", label: "Students & Graduates" },
  { value: "500+", label: "Career Opportunities" },
  { value: "200+", label: "Employers & Companies" },
  { value: "20+", label: "Universities & Institutions" },
];

const CATEGORIES = [
  {
    icon: Briefcase,
    title: "Internships",
    description: "Gain practical experience and build professional skills.",
  },
  {
    icon: Workflow,
    title: "Entry-Level Jobs",
    description: "Find opportunities designed for graduates and young professionals.",
  },
  {
    icon: GraduationCap,
    title: "Graduate Programs",
    description: "Start your professional journey with structured graduate programs.",
  },
  {
    icon: Calendar,
    title: "Career Events",
    description:
      "Attend career fairs, workshops, networking events and training programs.",
  },
];

const JOBS = [
  {
    initials: "HT",
    title: "Frontend Developer Intern",
    company: "Hormuud Telecom",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "2 days ago",
    description:
      "Support digital product teams building customer-facing web experiences.",
  },
  {
    initials: "DG",
    title: "Graduate Trainee Program",
    company: "Dahabshiil Group",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "4 days ago",
    description:
      "A structured pathway into finance, operations, and customer experience roles.",
  },
  {
    initials: "SA",
    title: "Marketing Intern",
    company: "Somali Airlines",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "1 week ago",
    description:
      "Assist with campaigns, content, and brand storytelling across channels.",
  },
  {
    initials: "TC",
    title: "Junior Data Analyst",
    company: "Technology Company",
    location: "Somalia",
    type: "Entry-Level",
    date: "1 week ago",
    description:
      "Turn raw data into insights that support product and business decisions.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Tell employers about your education, skills, experience and career interests.",
  },
  {
    step: "02",
    title: "Discover Opportunities",
    description: "Search internships, jobs, graduate programs and career events.",
  },
  {
    step: "03",
    title: "Apply Easily",
    description: "Submit applications and your CV directly through CareerLink.",
  },
  {
    step: "04",
    title: "Grow Your Career",
    description:
      "Track applications, connect with employers and take the next step in your career.",
  },
];

const STUDENT_FEATURES = [
  "Discover internships and jobs",
  "Upload and manage your CV",
  "Save interesting opportunities",
  "Track your applications",
  "Connect with employers",
  "Discover career events",
  "Build your professional profile",
];

const EMPLOYER_FEATURES = [
  "Post jobs and internships",
  "Promote graduate programs",
  "Review applicants",
  "Access candidate profiles",
  "Manage applications",
  "Build your employer profile",
  "Connect with universities",
];

const UNI_FEATURES = [
  {
    icon: GraduationCap,
    title: "Student Opportunities",
    text: "Help students discover internships and early-career roles.",
  },
  {
    icon: Calendar,
    title: "Career Events",
    text: "Promote career fairs, workshops and campus programs.",
  },
  {
    icon: Handshake,
    title: "Employer Connections",
    text: "Build partnerships with companies hiring across Somalia.",
  },
  {
    icon: Building2,
    title: "Graduate Programs",
    text: "Connect graduating cohorts with structured pathways.",
  },
];

const WHY = [
  {
    icon: Briefcase,
    title: "Real Opportunities",
    text: "Discover internships, jobs and graduate programs from employers.",
  },
  {
    icon: Sparkles,
    title: "Easy to Use",
    text: "A simple platform designed for students, graduates and employers.",
  },
  {
    icon: Lightbulb,
    title: "Career Growth",
    text: "Access opportunities and resources designed to support your professional journey.",
  },
  {
    icon: Network,
    title: "Trusted Network",
    text: "Connect universities, companies, employers and emerging professionals.",
  },
  {
    icon: MessageCircle,
    title: "Stay Updated",
    text: "Receive updates about applications, opportunities and career events.",
  },
  {
    icon: Users,
    title: "Built for Somalia",
    text: "A career platform designed to support Somalia’s next generation.",
  },
];

const RESOURCES = [
  { icon: FileText, title: "CV & Resume Tips" },
  { icon: MessageCircle, title: "Interview Preparation" },
  { icon: Lightbulb, title: "Career Guidance" },
  { icon: Workflow, title: "Professional Skills" },
  { icon: Network, title: "Networking Tips" },
  { icon: GraduationCap, title: "Graduate Career Advice" },
];

const TESTIMONIALS = [
  {
    name: "Amina Hassan",
    role: "Computer Science Graduate",
    org: "Mogadishu University",
    quote:
      "CareerLink helped me find an internship that matched my skills. The application process was simple and I finally felt connected to real opportunities.",
  },
  {
    name: "Abdi Rahman",
    role: "Talent Lead",
    org: "Growing Tech Company",
    quote:
      "We reached motivated graduates quickly. Reviewing applicants and managing openings in one place saved our team valuable hiring time.",
  },
  {
    name: "Dr. Sahra Mohamed",
    role: "Career Services",
    org: "University Partner",
    quote:
      "Our students need clearer pathways after graduation. CareerLink gives universities a practical bridge to employers and career events.",
  },
];

const PARTNER_PLACEHOLDERS = [
  "Employer A",
  "University B",
  "Company C",
  "Organization D",
  "Institution E",
  "Employer F",
];

function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {label && <p className="cl-section-label justify-center">{label}</p>}
      <h2
        className={`mt-3 text-3xl sm:text-4xl ${light ? "text-white" : "cl-heading"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`cl-subtext mt-4 text-base sm:text-lg ${light ? "!text-blue-100/80" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-cl-navy/90">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cl-success" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StudentsVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cl-border bg-gradient-to-br from-cl-blue-light via-white to-[#dbeafe] p-6 shadow-lg shadow-cl-navy/5 sm:p-8">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cl-blue/10 blur-2xl" />
      <div className="relative space-y-4">
        <div className="flex -space-x-3">
          {["AH", "YM", "FS", "KA"].map((initials, i) => (
            <div
              key={initials}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow"
              style={{ background: ["#0D6EFD", "#0B1F4B", "#2563eb", "#1d4ed8"][i] }}
            >
              {initials}
            </div>
          ))}
        </div>
        <div>
          <p className="text-lg font-bold text-cl-navy">Campus to career</p>
          <p className="mt-1 text-sm text-cl-muted">
            Students and graduates preparing profiles, CVs, and applications together.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Profiles completed", value: "8,400+" },
            { label: "Applications sent", value: "21k+" },
            { label: "Events attended", value: "120+" },
            { label: "Skills added", value: "35k+" },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-cl-border bg-cl-card/90 p-3">
              <p className="text-xl font-bold text-cl-blue">{card.value}</p>
              <p className="text-xs text-cl-muted">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UniversityVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cl-border bg-cl-navy p-6 text-white shadow-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,110,253,0.45),transparent_55%)]" />
      <div className="relative">
        <p className="text-sm font-semibold text-blue-200">University network</p>
        <h3 className="mt-2 text-2xl font-bold">Education meets opportunity</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/75">
          Connect campuses, career offices, and graduating classes with employers hiring
          across Somalia.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {["Career fairs", "Employer days", "Mentorship", "Graduate pipelines"].map(
            (item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function LandingContent() {
  return (
    <>
      <Navbar />

      <section id="home" className="landing-section landing-section--hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,246,255,0.75),transparent_55%)]" />
        <div className="cl-container relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-8 lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cl-border bg-cl-blue-light/90 px-3.5 py-1.5 text-xs font-semibold text-cl-blue backdrop-blur-sm">
              <Sparkles size={14} />
              Somalia’s Career Opportunity Platform
            </span>
            <h1 className="cl-heading mt-5 text-4xl sm:text-5xl lg:text-[3.35rem]">
              Build Your Career.
              <br />
              Discover Your{" "}
              <span className="text-cl-blue">Next Opportunity</span>.
            </h1>
            <p className="cl-subtext mt-5 max-w-xl text-base sm:text-lg">
              CareerLink Somalia connects students and graduates with internships, graduate
              programs, entry-level jobs, employers, universities, and career opportunities
              across Somalia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#opportunities" className="cl-btn cl-btn-primary">
                Explore Opportunities
                <ArrowRight size={18} />
              </a>
              <a href="#join" className="cl-btn cl-btn-secondary">
                Join CareerLink
              </a>
            </div>
            <p className="mt-5 text-sm text-cl-muted">
              Connecting students, graduates, universities and employers across Somalia.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-cl-border bg-cl-card/90 px-3.5 py-2.5 shadow-sm backdrop-blur-sm">
              <span className="brand-icon brand-icon--on-light h-9 w-9 shrink-0">
                <Image
                  src="/brand/icon.png"
                  alt=""
                  width={36}
                  height={36}
                  className="brand-icon__img"
                />
              </span>
              <div>
                <p className="text-sm font-bold tracking-tight text-cl-navy">
                  Connect. Grow. Succeed.
                </p>
                <p className="text-xs font-medium tracking-[0.12em] text-cl-blue">
                  CAREERLINK SOMALIA
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <HeroPhoneCluster />
          </Reveal>
        </div>
      </section>

      <section className="landing-section landing-section--muted border-y border-cl-border/70">
        <Reveal>
          <div className="cl-container py-14">
            <SectionHeading title="Building Somalia’s Career Network" />
            <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 70} className="text-center">
                  <p className="text-3xl font-bold tracking-tight text-cl-blue sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-cl-muted sm:text-base">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="opportunities" className="landing-section py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading
              title="Explore Opportunities"
              subtitle="Discover opportunities designed to help you start and grow your career."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 80}>
                <a href="#featured" className="cl-card block bg-cl-card/90 p-6 backdrop-blur-sm">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-cl-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cl-muted">{description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="landing-section landing-section--muted py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading
              title="Featured Opportunities"
              subtitle="Explore some of the latest opportunities available through CareerLink Somalia."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {JOBS.map((job, i) => (
              <Reveal key={job.title} delay={i * 70}>
                <article className="cl-card bg-cl-card/90 p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cl-navy text-sm font-bold text-white">
                        {job.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-cl-navy">{job.title}</h3>
                        <p className="text-sm text-cl-muted">{job.company}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Save opportunity"
                      className="rounded-lg p-2 text-cl-muted transition hover:bg-cl-blue-light hover:text-cl-blue"
                    >
                      <Bookmark size={18} />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cl-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                    <span className="rounded-md bg-cl-blue-light px-2 py-0.5 font-medium text-cl-blue">
                      {job.type}
                    </span>
                    <span>Posted {job.date}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cl-muted">{job.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <a href="#opportunities" className="cl-btn cl-btn-primary">
                View All Opportunities
                <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="landing-section landing-section--muted py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading
              title="Your Career Journey Starts Here"
              subtitle="Finding your next opportunity shouldn't be complicated."
            />
          </Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cl-blue/30 to-transparent lg:block" />
            {STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 90} className="relative text-center lg:text-left">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cl-border bg-cl-card/95 text-sm font-bold text-cl-blue shadow-sm lg:mx-0">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-cl-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cl-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="students" className="landing-section py-16 sm:py-20">
        <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <StudentsVisual />
          </Reveal>
          <Reveal delay={100}>
            <p className="cl-section-label">For Students & Graduates</p>
            <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">
              Turn Your Education Into Opportunity
            </h2>
            <p className="cl-subtext mt-4 text-base sm:text-lg">
              Build your professional profile, discover opportunities that match your
              interests and connect with organizations looking for emerging talent.
            </p>
            <CheckList items={STUDENT_FEATURES} />
            <a href="#join" className="cl-btn cl-btn-primary mt-8">
              Start Your Career Journey
              <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="employers" className="landing-section landing-section--blue py-16 sm:py-20">
        <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="cl-section-label">For Employers</p>
            <h2 className="cl-heading mt-3 text-3xl sm:text-4xl">
              Discover Somalia’s Next Generation of Talent
            </h2>
            <p className="cl-subtext mt-4 text-base sm:text-lg">
              CareerLink Somalia helps companies connect with motivated students, graduates
              and young professionals.
            </p>
            <CheckList items={EMPLOYER_FEATURES} />
            <a href="#join" className="cl-btn cl-btn-primary mt-8">
              Post an Opportunity
              <ArrowRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={100}>
            <EmployerDashboardMock />
          </Reveal>
        </div>
      </section>

      <section id="universities" className="landing-section py-16 sm:py-20">
        <div className="cl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="cl-heading text-3xl sm:text-4xl">
              Connecting Universities With Career Opportunities
            </h2>
            <p className="cl-subtext mt-4 text-base sm:text-lg">
              Universities can help students discover internships, graduate programs, career
              events and employment opportunities through CareerLink Somalia.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {UNI_FEATURES.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl border border-cl-border bg-cl-card/80 p-4 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-cl-blue" />
                  <h3 className="mt-3 text-sm font-semibold text-cl-navy">{title}</h3>
                  <p className="mt-1 text-sm text-cl-muted">{text}</p>
                </div>
              ))}
            </div>
            <a href="#join" className="cl-btn cl-btn-primary mt-8">
              Join as a University
              <ArrowRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={100}>
            <UniversityVisual />
          </Reveal>
        </div>
      </section>

      <section id="about" className="landing-section landing-section--muted py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading title="Why CareerLink?" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="rounded-xl border border-cl-border bg-cl-card/90 p-6 backdrop-blur-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cl-blue-light text-cl-blue">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold uppercase tracking-wide text-cl-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cl-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--navy relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(13,110,253,0.35),transparent_50%)]" />
        <div className="cl-container relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-200">
              Available on Mobile
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Your Career. Your Opportunities.
              <br />
              Anywhere.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-blue-100/80">
              Discover opportunities, apply, track applications and connect with employers
              directly from your phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                App Store
              </span>
              <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                Google Play
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <MobileAppPhones />
          </Reveal>
        </div>
      </section>

      <section id="resources" className="landing-section py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading
              title="Grow Beyond the Job Search"
              subtitle="Resources designed to help you prepare for your professional future."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map(({ icon: Icon, title }, i) => (
              <Reveal key={title} delay={i * 50}>
                <a
                  href="#resources"
                  className="cl-card flex items-center gap-4 bg-cl-card/90 p-5 backdrop-blur-sm"
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-cl-blue">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cl-navy">{title}</h3>
                    <p className="text-sm text-cl-muted">Practical guidance for your next step</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <a href="#resources" className="cl-btn cl-btn-primary">
                Explore Career Resources
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="landing-section landing-section--muted py-16 sm:py-20">
        <div className="cl-container">
          <Reveal>
            <SectionHeading title="Growing Careers Across Somalia" />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <article className="cl-card flex flex-col bg-cl-card/90 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-cl-navy/85">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-cl-border pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cl-blue text-sm font-bold text-white">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-cl-navy">{item.name}</p>
                      <p className="text-xs text-cl-muted">
                        {item.role} · {item.org}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section border-y border-cl-border/70 py-14">
        <div className="cl-container">
          <Reveal>
            <SectionHeading
              title="Connect With Leading Organizations"
              subtitle="A growing network of employers, universities and organizations. Logos below are placeholders until partnerships are confirmed."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNER_PLACEHOLDERS.map((name, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-cl-border bg-cl-card/70 px-3 text-center text-xs font-semibold tracking-wide text-cl-muted backdrop-blur-sm">
                  {name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="landing-section landing-section--cta relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cl-navy/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-8 opacity-20">
          <Sparkles className="h-24 w-24 text-white" />
        </div>
        <Reveal>
          <div className="cl-container relative max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your Next Opportunity Starts Here.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-blue-50/90 sm:text-lg">
              Join CareerLink Somalia and become part of a growing network connecting
              education, talent and opportunity.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#join" className="cl-btn cl-btn-white">
                Create Free Account
              </a>
              <a href="#opportunities" className="cl-btn cl-btn-outline-white">
                Explore Opportunities
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <div id="login" className="sr-only" />
      <div id="contact" className="sr-only" />
      <div id="privacy" className="sr-only" />
      <div id="terms" className="sr-only" />

      <Footer />
    </>
  );
}
