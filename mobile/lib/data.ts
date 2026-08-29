export type OpportunityType = "Internship" | "Full-time" | "Graduate Program" | "Event";

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: OpportunityType;
  paid: boolean;
  initials: string;
  color: string;
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
};

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Accepted"
  | "Rejected";

export type Application = {
  id: string;
  opportunityId: string;
  status: ApplicationStatus;
  date: string;
};

export type ChatMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  headline: string;
  initials: string;
  color: string;
  online: boolean;
  unread: number;
  messages: ChatMessage[];
};

export type TopSevenMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

export type PostVisibility = "public" | "connections" | "private";

export type PostKind =
  | "text"
  | "image"
  | "video"
  | "opportunity"
  | "achievement";

export type ReactionType = "like" | "celebrate" | "insightful" | "support";

export type PostMediaType = "image" | "video";

export type PostMedia = {
  id: string;
  type: PostMediaType;
  url: string;
  thumbnailUrl?: string;
  accent?: string;
};

export type PostOpportunity = {
  opportunityId: string;
  title: string;
  company: string;
  location: string;
  type: string;
  ctaLabel?: string;
};

export type PostAchievement = {
  kind:
    | "graduation"
    | "new_job"
    | "internship"
    | "certificate"
    | "promotion"
    | "competition"
    | "project";
  title: string;
  subtitle?: string;
  dateLabel?: string;
};

export type PostMention = {
  id: string;
  name: string;
  offset: number;
  length: number;
};

export type PostHashtag = {
  tag: string;
  offset: number;
  length: number;
};

export type Post = {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  authorRole: string;
  authorVerified?: boolean;
  authorIsCompany?: boolean;
  authorIsUniversity?: boolean;
  content: string;
  kind: PostKind;
  visibility: PostVisibility;
  time: string;
  createdAt: number;
  fromTopSeven?: boolean;
  media?: PostMedia[];
  opportunity?: PostOpportunity;
  achievement?: PostAchievement;
  mentions?: PostMention[];
  hashtags?: PostHashtag[];
  shares: number;
  saved: boolean;
  liked: boolean;
  reaction?: ReactionType;
  reactionCounts: Partial<Record<ReactionType, number>>;
  commentCount: number;
  hidden?: boolean;
};

export type PostReaction = {
  id: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: number;
};

export type PostComment = {
  id: string;
  postId: string;
  parentCommentId?: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  authorRole: string;
  content: string;
  createdAt: number;
  timeLabel: string;
  likes: number;
  liked: boolean;
  edited?: boolean;
  replies?: PostComment[];
};

export type PostSave = {
  id: string;
  postId: string;
  createdAt: number;
};

export type PostReportCategory =
  | "spam"
  | "harassment"
  | "fake_opportunity"
  | "scam"
  | "inappropriate"
  | "other";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "job" | "message" | "application" | "interview" | "post_reaction" | "post_comment" | "mention";
  unread: boolean;
};

export const REACTION_META: Record<
  ReactionType,
  { emoji: string; label: string; color: string }
> = {
  like: { emoji: "❤️", label: "Like", color: "#ef4444" },
  celebrate: { emoji: "🎉", label: "Celebrate", color: "#f59e0b" },
  insightful: { emoji: "💡", label: "Insightful", color: "#facc15" },
  support: { emoji: "👏", label: "Support", color: "#10b981" },
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Frontend Developer Intern",
    company: "BlueWave Technologies",
    location: "Mogadishu, Somalia",
    type: "Internship",
    paid: true,
    initials: "BW",
    color: "#2563eb",
    posted: "2 days ago",
    deadline: "15 Sep 2026",
    description:
      "Support the product team building customer-facing web apps with React. You will work with designers and engineers in Mogadishu.",
    requirements: ["HTML, CSS, JavaScript", "Interest in React", "Student or recent graduate"],
  },
  {
    id: "opp-2",
    title: "Graduate Trainee Program",
    company: "IBS Bank",
    location: "Mogadishu, Somalia",
    type: "Graduate Program",
    paid: true,
    initials: "IB",
    color: "#0f766e",
    posted: "5 days ago",
    deadline: "30 Sep 2026",
    description:
      "A 12-month rotation through operations, finance and customer experience for recent graduates.",
    requirements: ["Bachelor's degree", "Strong communication", "Interest in banking"],
  },
  {
    id: "opp-3",
    title: "Mobile Developer Intern",
    company: "CareerLink Lab",
    location: "Hargeisa, Somalia",
    type: "Internship",
    paid: true,
    initials: "CL",
    color: "#7c3aed",
    posted: "1 week ago",
    deadline: "20 Sep 2026",
    description: "Help build the CareerLink Somalia mobile app with React Native.",
    requirements: ["JavaScript or TypeScript", "Mobile interest", "Teamwork"],
  },
  {
    id: "opp-4",
    title: "Junior Data Analyst",
    company: "Hormuud Telecom",
    location: "Mogadishu, Somalia",
    type: "Full-time",
    paid: true,
    initials: "HT",
    color: "#ea580c",
    posted: "3 days ago",
    deadline: "10 Oct 2026",
    description: "Turn customer and network data into insights that support product decisions.",
    requirements: ["Excel or SQL", "Curious about data", "Entry-level welcome"],
  },
  {
    id: "opp-5",
    title: "UI/UX Design Intern",
    company: "BlueWave Technologies",
    location: "Mogadishu, Somalia",
    type: "Internship",
    paid: true,
    initials: "BW",
    color: "#2563eb",
    posted: "1 day ago",
    deadline: "25 Sep 2026",
    description: "Collaborate with product & engineering to design clean, inclusive mobile experiences.",
    requirements: ["Figma basics", "Portfolio welcome", "Empathy-driven mindset"],
  },
  {
    id: "opp-6",
    title: "Marketing Intern",
    company: "Somali Fintech Hub",
    location: "Mogadishu, Somalia",
    type: "Internship",
    paid: true,
    initials: "SF",
    color: "#db2777",
    posted: "4 days ago",
    deadline: "01 Oct 2026",
    description: "Run social campaigns and community events for Somalia's fintech ecosystem.",
    requirements: ["Social media experience", "Writing skills", "Event interest"],
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  { id: "app-1", opportunityId: "opp-1", status: "Interview", date: "Applied Aug 1" },
  { id: "app-2", opportunityId: "opp-2", status: "Under Review", date: "Applied Jul 28" },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "chat-1",
    name: "BlueWave Technologies",
    headline: "Hiring team",
    initials: "BW",
    color: "#2563eb",
    online: true,
    unread: 2,
    messages: [
      {
        id: "m1",
        fromMe: false,
        text: "Hello Ahmed, we reviewed your internship application.",
        time: "10:32",
      },
      {
        id: "m2",
        fromMe: false,
        text: "Are you available for a short interview this week?",
        time: "10:33",
      },
      {
        id: "m3",
        fromMe: true,
        text: "Yes, thank you. I can chat tomorrow afternoon.",
        time: "10:41",
      },
    ],
  },
  {
    id: "chat-2",
    name: "IBS Bank HR",
    headline: "Graduate programmes",
    initials: "IB",
    color: "#0f766e",
    online: false,
    unread: 0,
    messages: [
      {
        id: "m4",
        fromMe: false,
        text: "Your application is currently under review. We will update you soon.",
        time: "Yesterday",
      },
    ],
  },
];

export const TOP_SEVEN: TopSevenMember[] = [
  { id: "t1", name: "Mohamed Ali", role: "Software Engineer", initials: "MA", color: "#2563eb" },
  { id: "t2", name: "Ayaan Yusuf", role: "UI/UX Designer", initials: "AY", color: "#7c3aed" },
  { id: "t3", name: "Hassan Omar", role: "Product Manager", initials: "HO", color: "#0f766e" },
  { id: "t4", name: "Fatima Noor", role: "HR Manager", initials: "FN", color: "#ea580c" },
  { id: "t5", name: "Abdi Warsame", role: "Cybersecurity", initials: "AW", color: "#1d4ed8" },
  { id: "t6", name: "Maryan Said", role: "Marketing", initials: "MS", color: "#db2777" },
  { id: "t7", name: "Yusuf Ahmed", role: "Entrepreneur", initials: "YA", color: "#0891b2" },
];

export const TOP_SEVEN_IDS = new Set(TOP_SEVEN.map((m) => m.id));

export const CURRENT_USER = {
  id: "current-user",
  name: "Ahmed Hassan",
  initials: "AH",
  color: "#2563eb",
  role: "Computer Science Graduate",
  isStudent: true,
};

const now = Date.now();

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    authorId: "t1",
    authorName: "Mohamed Ali",
    authorInitials: "MA",
    authorColor: "#2563eb",
    authorRole: "Software Engineer · BlueWave Technologies",
    authorVerified: true,
    content:
      "Just shipped my first production React Native feature! 🚀\n\nThree things I learned during this internship:\n1. Performance budgets matter on low-end devices\n2. TypeScript catches bugs before users do\n3. The best code review is the one you give yourself\n\nGrateful to the whole BlueWave team — especially my Top 7 mentor @Ayaan Yusuf for the weekly design walkthroughs. 💙 #SoftwareEngineering #Internship #SomaliaTech",
    kind: "achievement",
    visibility: "public",
    time: "2h",
    createdAt: now - 2 * 60 * 60 * 1000,
    fromTopSeven: true,
    achievement: {
      kind: "project",
      title: "First production feature shipped",
      subtitle: "React Native · BlueWave Technologies",
      dateLabel: "Aug 2026",
    },
    media: [
      { id: "m1-1", type: "image", url: "", accent: "#dbeafe" },
      { id: "m1-2", type: "image", url: "", accent: "#e0e7ff" },
    ],
    hashtags: [
      { tag: "#SoftwareEngineering", offset: 356, length: 20 },
      { tag: "#Internship", offset: 377, length: 11 },
      { tag: "#SomaliaTech", offset: 389, length: 13 },
    ],
    mentions: [{ id: "t2", name: "Ayaan Yusuf", offset: 300, length: 12 }],
    shares: 4,
    saved: false,
    liked: false,
    reactionCounts: { like: 18, celebrate: 4, insightful: 2 },
    commentCount: 8,
  },
  {
    id: "post-2",
    authorId: "company-ibs",
    authorName: "IBS Bank",
    authorInitials: "IB",
    authorColor: "#0f766e",
    authorRole: "Company · Banking & Finance",
    authorVerified: true,
    authorIsCompany: true,
    content:
      "🏢 We are excited to announce our 2026 Graduate Trainee Program is now open.\n\nThis 12-month rotational program gives you hands-on experience across operations, finance and customer experience — with mentorship from senior leaders at IBS.\n\nRecent graduates across Somalia are strongly encouraged to apply. Deadline: 30 September 2026.",
    kind: "opportunity",
    visibility: "public",
    time: "4h",
    createdAt: now - 4 * 60 * 60 * 1000,
    opportunity: {
      opportunityId: "opp-2",
      title: "2026 Graduate Trainee Program",
      company: "IBS Bank",
      location: "Mogadishu, Somalia",
      type: "Graduate Program",
      ctaLabel: "View Opportunity",
    },
    shares: 18,
    saved: true,
    liked: false,
    reactionCounts: { like: 88, celebrate: 16, support: 16 },
    commentCount: 24,
  },
  {
    id: "post-3",
    authorId: "t2",
    authorName: "Ayaan Yusuf",
    authorInitials: "AY",
    authorColor: "#7c3aed",
    authorRole: "UI/UX Designer · CareerLink Somalia",
    authorVerified: true,
    content:
      "Design tip for the week: always design for the user's context, not just the happy path.\n\nWhen building mobile products for Somalia, I constantly ask myself:\n- Will this load on a slow network?\n- Is the touch target big enough for one-handed use?\n- Can I understand it without reading English?\n\nEmpathy-driven design = better products for everyone. 🎨 #UXDesign #CareerLinkSomalia #MobileFirst",
    kind: "text",
    visibility: "public",
    time: "1d",
    createdAt: now - 26 * 60 * 60 * 1000,
    fromTopSeven: true,
    hashtags: [
      { tag: "#UXDesign", offset: 271, length: 9 },
      { tag: "#CareerLinkSomalia", offset: 281, length: 19 },
      { tag: "#MobileFirst", offset: 301, length: 12 },
    ],
    shares: 6,
    saved: false,
    liked: true,
    reaction: "insightful",
    reactionCounts: { like: 22, insightful: 12, support: 4 },
    commentCount: 12,
  },
  {
    id: "post-4",
    authorId: "uni-jazeera",
    authorName: "Jazeera University",
    authorInitials: "JU",
    authorColor: "#1d4ed8",
    authorRole: "University · Mogadishu",
    authorVerified: true,
    authorIsUniversity: true,
    content:
      "🎓 Somalia Career Fair 2026 is coming to Jazeera University!\n\n📅 15 September 2026\n📍 Jazeera University, Mogadishu\n⏰ 9:00 AM – 5:00 PM\n\nMeet 50+ leading employers, attend free CV & interview workshops, and connect directly with hiring managers.\n\nFree entry for all students and graduates. Bring multiple copies of your CV! 📋",
    kind: "opportunity",
    visibility: "public",
    time: "2d",
    createdAt: now - 52 * 60 * 60 * 1000,
    opportunity: {
      opportunityId: "opp-event-1",
      title: "Somalia Career Fair 2026",
      company: "Jazeera University",
      location: "Mogadishu, Somalia",
      type: "Event",
      ctaLabel: "View Event",
    },
    media: [{ id: "m4-1", type: "image", url: "", accent: "#dbeafe" }],
    shares: 34,
    saved: false,
    liked: false,
    reactionCounts: { like: 124, celebrate: 28, support: 14 },
    commentCount: 32,
  },
  {
    id: "post-5",
    authorId: "t3",
    authorName: "Hassan Omar",
    authorInitials: "HO",
    authorColor: "#0f766e",
    authorRole: "Product Manager · IBS Bank",
    authorVerified: true,
    content:
      "Happy to share I've been promoted to Senior Product Manager at IBS Bank! 🎉\n\nLooking back, the turning point for me wasn't a promotion or a certification — it was the day I started saying 'I don't know, but I'll find out' instead of pretending I had every answer.\n\nTo the students following me: curiosity beats perfection every single time.",
    kind: "achievement",
    visibility: "public",
    time: "2d",
    createdAt: now - 58 * 60 * 60 * 1000,
    fromTopSeven: true,
    achievement: {
      kind: "promotion",
      title: "Promoted to Senior Product Manager",
      subtitle: "IBS Bank",
      dateLabel: "Aug 2026",
    },
    shares: 9,
    saved: false,
    liked: false,
    reactionCounts: { like: 94, celebrate: 52, support: 22, insightful: 8 },
    commentCount: 36,
  },
  {
    id: "post-6",
    authorId: "t5",
    authorName: "Abdi Warsame",
    authorInitials: "AW",
    authorColor: "#1d4ed8",
    authorRole: "Cybersecurity Specialist",
    content:
      "🔒 Quick cybersecurity reminder for every professional in Somalia:\n\n1. Use a password manager — no more 'Somalia123' on every account\n2. Turn on 2FA for email, WhatsApp and banking\n3. Never share OTP codes — no real company will ask for them\n\nA little prevention saves a lot of headache.\n\nTag a friend who needs to see this. #CyberSecurity #SomaliTech",
    kind: "text",
    visibility: "public",
    time: "3d",
    createdAt: now - 80 * 60 * 60 * 1000,
    fromTopSeven: true,
    hashtags: [
      { tag: "#CyberSecurity", offset: 264, length: 14 },
      { tag: "#SomaliTech", offset: 279, length: 12 },
    ],
    shares: 11,
    saved: true,
    liked: false,
    reactionCounts: { like: 22, insightful: 9 },
    commentCount: 7,
  },
  {
    id: "post-7",
    authorId: "company-hormuud",
    authorName: "Hormuud Telecom",
    authorInitials: "HT",
    authorColor: "#ea580c",
    authorRole: "Company · Technology & Telecommunications",
    authorVerified: true,
    authorIsCompany: true,
    content:
      "🏢 We're hiring! Hormuud Telecom is looking for a motivated Junior Data Analyst to join our network analytics team in Mogadishu.\n\nFresh graduates with SQL/Excel skills are strongly encouraged to apply. Paid role with health benefits and training included.",
    kind: "opportunity",
    visibility: "public",
    time: "3d",
    createdAt: now - 76 * 60 * 60 * 1000,
    opportunity: {
      opportunityId: "opp-4",
      title: "Junior Data Analyst",
      company: "Hormuud Telecom",
      location: "Mogadishu, Somalia",
      type: "Full-time",
      ctaLabel: "Apply Now",
    },
    shares: 28,
    saved: false,
    liked: false,
    reactionCounts: { like: 60, celebrate: 8, support: 12 },
    commentCount: 18,
  },
  {
    id: "post-8",
    authorId: "t4",
    authorName: "Fatima Noor",
    authorInitials: "FN",
    authorColor: "#ea580c",
    authorRole: "HR Manager · Hormuud Telecom",
    authorVerified: true,
    content:
      "As an HR manager, here's the #1 thing I look for in a graduate candidate.\n\nIt's not your GPA.\nIt's not your internship title.\nIt's a 'bias towards action' — the willingness to ship something, anything, before you feel 100% ready.\n\nThe candidates who show me real projects (even imperfect ones) always stand out.",
    kind: "text",
    visibility: "public",
    time: "4d",
    createdAt: now - 100 * 60 * 60 * 1000,
    fromTopSeven: true,
    shares: 21,
    saved: false,
    liked: false,
    reactionCounts: { like: 132, insightful: 48, celebrate: 6, support: 14 },
    commentCount: 46,
  },
  {
    id: "post-9",
    authorId: "t6",
    authorName: "Maryan Said",
    authorInitials: "MS",
    authorColor: "#db2777",
    authorRole: "Marketing · Somali Fintech Hub",
    content:
      "Just completed my Google Digital Marketing certificate! 🎓 Thank you to CareerLink Somalia for the scholarship opportunity and to @Yusuf Ahmed for recommending the course.\n\nOpen to marketing internship opportunities in Mogadishu — DM me. Let's connect! ✨",
    kind: "achievement",
    visibility: "public",
    time: "5d",
    createdAt: now - 124 * 60 * 60 * 1000,
    fromTopSeven: true,
    achievement: {
      kind: "certificate",
      title: "Google Digital Marketing Certificate",
      subtitle: "Completed via CareerLink Scholarship",
      dateLabel: "Aug 2026",
    },
    media: [{ id: "m9-1", type: "image", url: "", accent: "#fce7f3" }],
    mentions: [{ id: "t7", name: "Yusuf Ahmed", offset: 124, length: 12 }],
    shares: 2,
    saved: false,
    liked: false,
    reactionCounts: { like: 44, celebrate: 18, support: 8 },
    commentCount: 14,
  },
  {
    id: "post-10",
    authorId: "student-sahar",
    authorName: "Sahar Mohamed",
    authorInitials: "SM",
    authorColor: "#0891b2",
    authorRole: "CS Student · SIMAD University",
    content:
      "Question for the community: I'm a third-year CS student and I want to build a portfolio before I graduate.\n\nWhat's the single best project I can build in ~3 weeks that will impress Somali employers? React, mobile, data — any tech stack welcome.\n\nThank you in advance! 🙏 #Students #SomaliaJobs #Portfolio",
    kind: "text",
    visibility: "public",
    time: "6d",
    createdAt: now - 148 * 60 * 60 * 1000,
    hashtags: [
      { tag: "#Students", offset: 255, length: 9 },
      { tag: "#SomaliaJobs", offset: 265, length: 12 },
      { tag: "#Portfolio", offset: 278, length: 10 },
    ],
    shares: 1,
    saved: false,
    liked: false,
    reactionCounts: { like: 16, support: 6 },
    commentCount: 22,
  },
];

export const INITIAL_COMMENTS: Record<string, PostComment[]> = {
  "post-1": [
    {
      id: "c1-1",
      postId: "post-1",
      authorId: "t3",
      authorName: "Hassan Omar",
      authorInitials: "HO",
      authorColor: "#0f766e",
      authorRole: "Product Manager · IBS Bank",
      content: "MashAllah bro, massive milestone. Keep shipping — the community is rooting for you! 🚀",
      createdAt: now - 90 * 60 * 1000,
      timeLabel: "1h",
      likes: 4,
      liked: false,
      replies: [
        {
          id: "c1-1-r1",
          postId: "post-1",
          parentCommentId: "c1-1",
          authorId: "t1",
          authorName: "Mohamed Ali",
          authorInitials: "MA",
          authorColor: "#2563eb",
          authorRole: "Software Engineer · BlueWave",
          content: "Thanks Hassan! Your product feedback was crucial on this one. 🙏",
          createdAt: now - 80 * 60 * 1000,
          timeLabel: "1h",
          likes: 2,
          liked: false,
        },
      ],
    },
    {
      id: "c1-2",
      postId: "post-1",
      authorId: "t2",
      authorName: "Ayaan Yusuf",
      authorInitials: "AY",
      authorColor: "#7c3aed",
      authorRole: "UI/UX Designer · CareerLink",
      content: "Proud of you @Mohamed Ali! The before/after screenshots show how much thought you put into micro-interactions. The mentor sessions paid off. 💙",
      createdAt: now - 60 * 60 * 1000,
      timeLabel: "1h",
      likes: 6,
      liked: true,
      replies: [],
    },
  ],
  "post-5": [
    {
      id: "c5-1",
      postId: "post-5",
      authorId: "t4",
      authorName: "Fatima Noor",
      authorInitials: "FN",
      authorColor: "#ea580c",
      authorRole: "HR Manager · Hormuud",
      content: "Fully deserved Hassan! You bring so much rigor and empathy to every project. 🎉",
      createdAt: now - 56 * 60 * 60 * 1000,
      timeLabel: "2d",
      likes: 3,
      liked: false,
      replies: [],
    },
    {
      id: "c5-2",
      postId: "post-5",
      authorId: "student-sahar",
      authorName: "Sahar Mohamed",
      authorInitials: "SM",
      authorColor: "#0891b2",
      authorRole: "CS Student · SIMAD",
      content: "\"Curiosity beats perfection\" — quoting this in my notebook. Thank you for sharing!",
      createdAt: now - 48 * 60 * 60 * 1000,
      timeLabel: "2d",
      likes: 8,
      liked: false,
      replies: [],
    },
  ],
};

export const INITIAL_REACTIONS: PostReaction[] = [];

export const INITIAL_SAVES: PostSave[] = [
  { id: "s1", postId: "post-2", createdAt: now - 3 * 60 * 60 * 1000 },
  { id: "s2", postId: "post-6", createdAt: now - 70 * 60 * 60 * 1000 },
];

export const SAVED_POST_IDS = new Set(INITIAL_SAVES.map((s) => s.postId));

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "app-n1",
    type: "application",
    title: "Application submitted",
    body: "Your application for Frontend Developer Intern at BlueWave Technologies has been received.",
    time: "5m",
    unread: true,
  },
  {
    id: "app-n2",
    type: "application",
    title: "Application under review",
    body: "IBS Bank is reviewing your Graduate Trainee Program application.",
    time: "2h",
    unread: true,
  },
  {
    id: "app-n3",
    type: "application",
    title: "Application shortlisted",
    body: "Congratulations! You've been shortlisted for the Mobile Developer Intern role at CareerLink Lab.",
    time: "1d",
    unread: false,
  },
  {
    id: "app-n4",
    type: "application",
    title: "Interview invitation",
    body: "Hormuud Telecom invited you to interview for Junior Data Analyst position.",
    time: "3d",
    unread: false,
  },
  {
    id: "n1",
    type: "interview",
    title: "Interview scheduled",
    body: "BlueWave invited you to interview tomorrow afternoon.",
    time: "2h",
    unread: true,
  },
  {
    id: "n2",
    type: "message",
    title: "New message",
    body: "BlueWave Technologies sent you a message.",
    time: "3h",
    unread: true,
  },
  {
    id: "n3",
    type: "post_reaction",
    title: "Ayaan Yusuf reacted to your post",
    body: "Ayaan celebrated your achievement post.",
    time: "4h",
    unread: true,
  },
  {
    id: "n4",
    type: "mention",
    title: "You were mentioned",
    body: "Mohamed Ali mentioned you in: \"First production feature shipped\".",
    time: "5h",
    unread: false,
  },
];

export const TRENDING_HASHTAGS: { tag: string; posts: number }[] = [
  { tag: "#Internship", posts: 284 },
  { tag: "#Technology", posts: 221 },
  { tag: "#SomaliaJobs", posts: 198 },
  { tag: "#CareerDevelopment", posts: 174 },
  { tag: "#SoftwareEngineering", posts: 142 },
  { tag: "#Students", posts: 118 },
  { tag: "#Entrepreneurship", posts: 96 },
  { tag: "#CareerLinkSomalia", posts: 82 },
];

export const SUGGESTED_CONNECTIONS: TopSevenMember[] = [
  { id: "sug-1", name: "Yusuf Mohamed", role: "Recruiter · IBS Bank", initials: "YM", color: "#0f766e" },
  { id: "sug-2", name: "Fadumo Said", role: "UX Design Graduate", initials: "FS", color: "#7c3aed" },
  { id: "sug-3", name: "Khalid Ali", role: "Lecturer · SIMAD", initials: "KA", color: "#1d4ed8" },
  { id: "sug-4", name: "Nadira Abdi", role: "Product Designer", initials: "NA", color: "#db2777" },
];

export const STATUS_STEPS: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Accepted",
];
