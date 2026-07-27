export type OpportunityType =
  | "Internship"
  | "Entry-Level"
  | "Graduate Program"
  | "Career Event";

export type Opportunity = {
  id: string;
  initials: string;
  title: string;
  company: string;
  location: string;
  type: OpportunityType;
  date: string;
  description: string;
  /** Cover image URL (e.g. Unsplash) or path under /public */
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

/** Unsplash photo URL — demo covers until listings come from the API */
export function unsplashPhoto(photoId: string, width = 800): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export const OPPORTUNITY_COVER_BY_TYPE: Record<OpportunityType, string> = {
  Internship: unsplashPhoto("1498050108023-c5249f4df085"),
  "Entry-Level": unsplashPhoto("1521737711868-e3b97375f902"),
  "Graduate Program": unsplashPhoto("1523240795612-9a054b0db644"),
  "Career Event": unsplashPhoto("1540575467063-178a50c2df87"),
};

export function getOpportunityImage(job: Opportunity): string {
  return job.image ?? OPPORTUNITY_COVER_BY_TYPE[job.type];
}

/** Example listings for UI demonstration — replace with API data when available. */
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "frontend-intern",
    initials: "ET",
    title: "Frontend Developer Intern",
    company: "Example Tech Company",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "2 days ago",
    description: "Support product teams building customer-facing web experiences with React and modern tooling.",
    featured: true,
    image: unsplashPhoto("1498050108023-c5249f4df085"),
    imageAlt: "Developer working on a laptop",
  },
  {
    id: "graduate-trainee",
    initials: "EE",
    title: "Graduate Trainee Program",
    company: "Example Enterprise",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "3 days ago",
    description: "A structured pathway into operations, finance and professional roles for recent graduates.",
    featured: true,
    image: unsplashPhoto("1521737711868-e3b97375f902"),
    imageAlt: "Team collaborating in an office",
  },
  {
    id: "marketing-intern",
    initials: "EB",
    title: "Marketing Intern",
    company: "Example Brand",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "4 days ago",
    description: "Assist with campaigns, social content and brand storytelling across digital channels.",
    featured: true,
    image: unsplashPhoto("1552664730-d307ca884978"),
    imageAlt: "Marketing team meeting",
  },
  {
    id: "junior-analyst",
    initials: "EA",
    title: "Junior Data Analyst",
    company: "Example Analytics",
    location: "Mogadishu, Somalia",
    type: "Entry-Level",
    date: "5 days ago",
    description: "Turn data into insights that support product and business decisions.",
    featured: true,
    image: unsplashPhoto("1551288049-bebda4e38f71"),
    imageAlt: "Analytics dashboard on a screen",
  },
  {
    id: "software-intern",
    initials: "HS",
    title: "Software Engineering Intern",
    company: "Example Software",
    location: "Hargeisa, Somalia",
    type: "Internship",
    date: "1 week ago",
    description: "Work alongside engineers on backend services, APIs and internal tools.",
    image: unsplashPhoto("1517694712202-14dd9538aa97"),
    imageAlt: "Software engineering workspace",
  },
  {
    id: "hr-graduate",
    initials: "HC",
    title: "HR Graduate Program",
    company: "Example Corp",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "1 week ago",
    description: "Rotate through recruitment, employee relations and people operations teams.",
    image: unsplashPhoto("1573496359142-b8d87734a5a2"),
    imageAlt: "HR professional in a meeting",
  },
  {
    id: "customer-support",
    initials: "FS",
    title: "Customer Support Associate",
    company: "Example Services",
    location: "Mogadishu, Somalia",
    type: "Entry-Level",
    date: "1 week ago",
    description: "Help customers resolve issues and deliver a positive service experience.",
    image: unsplashPhoto("1423666639041-f5600c27a7c3"),
    imageAlt: "Customer support professional with headset",
  },
  {
    id: "finance-intern",
    initials: "FB",
    title: "Finance Intern",
    company: "Example Bank",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "2 weeks ago",
    description: "Support reporting, reconciliation and financial analysis for growing teams.",
    image: unsplashPhoto("1554224155-6726b3ff858f"),
    imageAlt: "Finance and accounting workspace",
  },
  {
    id: "sales-graduate",
    initials: "RT",
    title: "Sales Graduate Program",
    company: "Example Telecom",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "2 weeks ago",
    description: "Build skills in business development, client relationships and market growth.",
    image: unsplashPhoto("1560472354-b33ff0c44a43"),
    imageAlt: "Business development meeting",
  },
  {
    id: "content-writer",
    initials: "MD",
    title: "Junior Content Writer",
    company: "Example Media",
    location: "Mogadishu, Somalia",
    type: "Entry-Level",
    date: "2 weeks ago",
    description: "Create articles, guides and social copy for audiences across Somalia.",
    image: unsplashPhoto("1455390562591-1b9baea74355"),
    imageAlt: "Person writing content on a laptop",
  },
  {
    id: "career-fair",
    initials: "CL",
    title: "Somalia Career Fair 2026",
    company: "CareerLink Events",
    location: "Mogadishu, Somalia",
    type: "Career Event",
    date: "Mar 15, 2026",
    description: "Meet employers, attend workshops and explore internships and graduate programs.",
    image: unsplashPhoto("1540575467063-178a50c2df87"),
    imageAlt: "Career fair and conference hall",
  },
  {
    id: "networking-workshop",
    initials: "CL",
    title: "Professional Networking Workshop",
    company: "CareerLink Events",
    location: "Hargeisa, Somalia",
    type: "Career Event",
    date: "Apr 2, 2026",
    description: "Learn how to build connections, pitch yourself and grow your professional network.",
    image: unsplashPhoto("1511578314321-379f9e73659b"),
    imageAlt: "Professional networking event",
  },
  {
    id: "ux-intern",
    initials: "DS",
    title: "UX Design Intern",
    company: "Example Digital",
    location: "Mogadishu, Somalia",
    type: "Internship",
    date: "3 weeks ago",
    description: "Support user research, wireframes and design systems for mobile products.",
    image: unsplashPhoto("1561070791-2526d30994b5"),
    imageAlt: "UX designer at work",
  },
  {
    id: "ops-associate",
    initials: "LG",
    title: "Operations Associate",
    company: "Example Logistics",
    location: "Kismayo, Somalia",
    type: "Entry-Level",
    date: "3 weeks ago",
    description: "Coordinate daily operations, vendor communication and process improvements.",
    image: unsplashPhoto("1586528116311-ad8dd743c249"),
    imageAlt: "Logistics and operations workspace",
  },
  {
    id: "tech-graduate",
    initials: "IN",
    title: "Technology Graduate Program",
    company: "Example Innovations",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    date: "3 weeks ago",
    description: "Launch your tech career through rotations in engineering, product and IT support.",
    image: unsplashPhoto("1531482615717-611afd06369e"),
    imageAlt: "Technology team collaboration",
  },
  {
    id: "cv-workshop",
    initials: "CL",
    title: "CV & Interview Skills Workshop",
    company: "CareerLink Events",
    location: "Online",
    type: "Career Event",
    date: "Apr 18, 2026",
    description: "Practical session on CV writing, interview preparation and employer expectations.",
    image: unsplashPhoto("1434030216411-6b793f1094ee"),
    imageAlt: "Career workshop and learning session",
  },
];

export const OPPORTUNITY_TYPES: OpportunityType[] = [
  "Internship",
  "Entry-Level",
  "Graduate Program",
  "Career Event",
];

export function getFeaturedOpportunities(limit = 4) {
  return OPPORTUNITIES.filter((job) => job.featured).slice(0, limit);
}

export function getAllOpportunities() {
  return OPPORTUNITIES;
}
