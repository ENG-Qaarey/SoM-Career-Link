"use client";

import { FeedUser } from "@/lib/feed-types";
import { formatNumber } from "@/lib/feed-utils";

type FeedSidebarProps = {
  currentUser: FeedUser;
  isMobile?: boolean;
};

const TRENDING_TOPICS = [
  { hashtag: "#SomaliaTech", count: 12400, category: "Technology" },
  { hashtag: "#Internship", count: 8900, category: "Career" },
  { hashtag: "#SoftwareEngineering", count: 7600, category: "Technology" },
  { hashtag: "#CareerGrowth", count: 6200, category: "Career" },
  { hashtag: "#ProductManagement", count: 4800, category: "Business" },
  { hashtag: "#UXDesign", count: 4100, category: "Design" },
  { hashtag: "#CyberSecurity", count: 3900, category: "Technology" },
  { hashtag: "#GraduatePrograms", count: 3400, category: "Education" },
  { hashtag: "#SomaliaJobs", count: 9200, category: "Career" },
  { hashtag: "#RemoteWork", count: 5600, category: "Trends" },
];

const RECOMMENDED_OPPORTUNITIES = [
  { title: "Frontend Developer Intern", company: "BlueWave Technologies", location: "Mogadishu", type: "Internship", logoColor: "#2563eb", logoInitials: "BW" },
  { title: "UX Design Intern", company: "CareerLink Lab", location: "Remote", type: "Internship", logoColor: "#7c3aed", logoInitials: "CL" },
  { title: "Junior Data Analyst", company: "Hormuud Telecom", location: "Mogadishu", type: "Full-time", logoColor: "#ea580c", logoInitials: "HT" },
  { title: "Graduate Trainee Program", company: "IBS Bank", location: "Mogadishu", type: "Graduate Program", logoColor: "#0f766e", logoInitials: "IB" },
];

const SUGGESTED_CONNECTIONS = [
  { name: "Mohamed Ali", headline: "Software Engineer at BlueWave", initials: "MA", avatarColor: "#2563eb", mutual: 3, reason: "Works at BlueWave Technologies" },
  { name: "Ayaan Yusuf", headline: "UI/UX Designer at CareerLink", initials: "AY", avatarColor: "#7c3aed", mutual: 5, reason: "Top 7 connection" },
  { name: "Fatima Noor", headline: "HR Manager at Hormuud Telecom", initials: "FN", avatarColor: "#ea580c", mutual: 2, reason: "Hiring for your skills" },
  { name: "Hassan Omar", headline: "Product Manager at IBS Bank", initials: "HO", avatarColor: "#0f766e", mutual: 4, reason: "Top 7 connection" },
  { name: "Abdi Warsame", headline: "Cybersecurity Specialist", initials: "AW", avatarColor: "#1d4ed8", mutual: 1, reason: "Same university" },
];

const UPCOMING_EVENTS = [
  { title: "Somalia Career Fair 2026", date: "Sep 15", location: "Mogadishu", organizer: "Jazeera University", color: "#0891b2" },
  { title: "Tech Meetup Mogadishu", date: "Sep 22", location: "iRise Hub", organizer: "Somalia Tech Community", color: "#2563eb" },
  { title: "Women in Tech Summit", date: "Oct 5", location: "Virtual", organizer: "CareerLink", color: "#db2777" },
  { title: "Graduate Programs Info Session", date: "Oct 12", location: "IBS Bank HQ", organizer: "IBS Bank", color: "#0f766e" },
];

export function FeedSidebar({ currentUser, isMobile }: FeedSidebarProps) {
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-cl-main border-t border-cl-border p-4 pb-safe z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2">
            <span className="font-semibold text-cl-text">Trending</span>
          </div>
          <div className="flex items-center gap-4">
            {TRENDING_TOPICS.slice(0, 3).map((topic) => (
              <span key={topic.hashtag} className="px-3 py-1 text-xs font-medium text-cl-blue bg-cl-blue-light rounded-full">
                {topic.hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="cl-card p-4 sticky top-24">
        <h3 className="font-semibold text-cl-text mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-cl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic.hashtag}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-cl-blue bg-cl-blue-light hover:bg-cl-blue/20 transition-colors"
            >
              <span className="font-semibold">{topic.hashtag}</span>
              <span className="text-xs text-cl-muted">{formatNumber(topic.count)} posts</span>
            </button>
          ))}
        </div>
      </section>

      <section className="cl-card p-4 sticky top-24">
        <h3 className="font-semibold text-cl-text mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-cl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Recommended Opportunities
        </h3>
        <div className="space-y-3">
          {RECOMMENDED_OPPORTUNITIES.map((opp) => (
            <button
              key={opp.title}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-cl-border hover:border-cl-blue/40 hover:bg-cl-secondary/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--cl-blue)] to-[var(--cl-blue-bright)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {opp.logoInitials}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-cl-text truncate">{opp.title}</h4>
                <p className="text-sm text-cl-muted truncate">{opp.company}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 text-xs font-medium text-cl-blue bg-cl-blue-light rounded-full">{opp.type}</span>
                  <span className="text-xs text-cl-muted">{opp.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="cl-card p-4 sticky top-24">
        <h3 className="font-semibold text-cl-text mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-cl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1zm18 0a6 6 0 01-12 0v1h12v-1z" />
          </svg>
          Suggested Connections
        </h3>
        <div className="space-y-3">
          {SUGGESTED_CONNECTIONS.map((person) => (
            <button
              key={person.name}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-cl-secondary/50 transition-colors text-left"
            >
              <div className="relative w-10 h-10 rounded-full flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-[var(--cl-blue)] to-[var(--cl-blue-bright)] flex items-center justify-center text-white font-bold text-sm rounded-full">
                  {person.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-cl-success rounded-full border-2 border-cl-main flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-cl-text truncate">{person.name}</h4>
                <p className="text-sm text-cl-muted truncate">{person.headline}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-cl-muted">{person.mutual} mutual connections</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="cl-card p-4 sticky top-24">
        <h3 className="font-semibold text-cl-text mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-cl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {UPCOMING_EVENTS.map((event) => (
            <button
              key={event.title}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-cl-border hover:border-cl-blue/40 hover:bg-cl-secondary/50 transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-center flex-shrink-0" style={{ backgroundColor: event.color }}>
                <span className="text-xs">{event.date}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-cl-text truncate">{event.title}</h4>
                <p className="text-sm text-cl-muted truncate">{event.organizer}</p>
                <div className="flex items-center gap-2 mt-1">
                  <svg className="w-3.5 h-3.5 text-cl-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-cl-muted">{event.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="cl-card p-4 sticky top-24">
        <h3 className="font-semibold text-cl-text mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-cl-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Your Top 7
        </h3>
        <p className="text-sm text-cl-muted mb-4">Your Top 7 connections get priority in your feed. Manage them from your profile.</p>
        <div className="flex flex-wrap gap-2">
          {["MA", "AY", "HO", "FN", "AW", "MS", "YA"].map((initials, i) => (
            <div
              key={initials}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cl-blue-light text-cl-blue text-sm font-medium"
              style={{ backgroundColor: ["#2563eb", "#7c3aed", "#0f766e", "#ea580c", "#1d4ed8", "#db2777", "#0891b2"][i] + "15" }}
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: ["#2563eb", "#7c3aed", "#0f766e", "#ea580c", "#1d4ed8", "#db2777", "#0891b2"][i] }}>
                {initials}
              </span>
              <span>{initials}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}