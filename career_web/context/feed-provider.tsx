"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Post,
  Comment,
  ReactionType,
  FeedUser,
  PostType,
  PostVisibility,
  PostMedia,
  PostOpportunity,
  PostAchievement,
} from "@/lib/feed-types";

const CURRENT_USER: FeedUser = {
  id: "current-user",
  name: "Ahmed Hassan",
  headline: "Computer Science Graduate · Software Engineer",
  initials: "AH",
  avatarColor: "#2563eb",
  role: "graduate",
  verified: false,
};

const MOCK_USERS: FeedUser[] = [
  {
    id: "u1",
    name: "Mohamed Ali",
    headline: "Software Engineer at BlueWave Technologies",
    initials: "MA",
    avatarColor: "#2563eb",
    role: "graduate",
    verified: true,
    isTop7: true,
  },
  {
    id: "u2",
    name: "Ayaan Yusuf",
    headline: "UI/UX Designer at CareerLink",
    initials: "AY",
    avatarColor: "#7c3aed",
    role: "graduate",
    verified: true,
    isTop7: true,
  },
  {
    id: "u3",
    name: "Hassan Omar",
    headline: "Product Manager at IBS Bank",
    initials: "HO",
    avatarColor: "#0f766e",
    role: "graduate",
    verified: true,
    isTop7: true,
  },
  {
    id: "u4",
    name: "Fatima Noor",
    headline: "HR Manager at Hormuud Telecom",
    initials: "FN",
    avatarColor: "#ea580c",
    role: "company",
    verified: true,
  },
  {
    id: "u5",
    name: "Jazeera University",
    headline: "Leading University in Somalia",
    initials: "JU",
    avatarColor: "#0891b2",
    role: "university",
    verified: true,
  },
  {
    id: "u6",
    name: "Abdi Warsame",
    headline: "Cybersecurity Specialist",
    initials: "AW",
    avatarColor: "#1d4ed8",
    role: "graduate",
    verified: false,
  },
  {
    id: "u7",
    name: "Maryan Said",
    headline: "Marketing Professional",
    initials: "MS",
    avatarColor: "#db2777",
    role: "graduate",
    verified: false,
  },
];

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: MOCK_USERS[0],
    content: `Just completed my first software engineering internship! 🚀 Here are three things I learned that no classroom taught me:

1. Communication is just as important as code. Explaining technical concepts to non-technical stakeholders is a daily skill.

2. Code reviews are learning opportunities, not criticism. Every comment makes you a better engineer.

3. Asking "why" before "how" saves weeks of work. Understanding the problem deeply leads to better solutions.

Grateful for the mentorship at BlueWave Technologies. To all students: apply early, ask questions, and build things that matter.

#SoftwareEngineering #Internship #CareerGrowth #SomaliaTech`,
    type: "text",
    visibility: "public",
    media: [],
    hashtags: ["SoftwareEngineering", "Internship", "CareerGrowth", "SomaliaTech"],
    mentions: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 42, comments: 12, shares: 8, views: 1240 },
    userReaction: undefined,
    userHasLiked: false,
    userHasSaved: false,
    isRepost: false,
  },
  {
    id: "post-2",
    author: MOCK_USERS[3],
    content: `We're excited to announce our Graduate Trainee Program 2026! 🎯

IBS Bank is looking for motivated graduates for a 12-month rotation through:
• Operations & Customer Experience
• Finance & Risk Management
• Digital Banking & Innovation
• Corporate Banking

This is a unique opportunity to launch your banking career with structured mentorship and real responsibility from day one.

Requirements:
✓ Bachelor's degree (2024/2025 graduates)
✓ Strong analytical & communication skills
✓ Passion for financial inclusion in Somalia

Apply by September 30th. Link in comments! 👇

#GraduateProgram #BankingCareers #IBSbank #SomaliaJobs #Hiring`,
    type: "opportunity",
    visibility: "public",
    media: [],
    opportunity: {
      id: "opp-1",
      title: "Graduate Trainee Program 2026",
      company: "IBS Bank",
      location: "Mogadishu, Somalia",
      type: "Graduate Program",
      posted: "2 days ago",
      logoColor: "#0f766e",
      logoInitials: "IB",
    },
    hashtags: ["GraduateProgram", "BankingCareers", "IBSbank", "SomaliaJobs", "Hiring"],
    mentions: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 89, comments: 24, shares: 15, views: 3420 },
    userReaction: undefined,
    userHasLiked: false,
    userHasSaved: false,
    isRepost: false,
  },
  {
    id: "post-3",
    author: MOCK_USERS[1],
    content: `Design tip of the day: Always design for the user's context, not just the happy path. 🎨

When designing for mobile in Somalia, consider:
• Intermittent connectivity (offline-first patterns)
• Smaller screens with varying densities
• Data costs (optimize images, lazy load)
• Varying digital literacy levels
• Right-to-left language support

Empathy-driven design creates better products for everyone. The best designs are invisible—they just work.

What's a constraint that made your design better? 👇

#UXDesign #ProductDesign #SomaliaTech #DesignThinking #MobileFirst`,
    type: "text",
    visibility: "public",
    media: [],
    hashtags: ["UXDesign", "ProductDesign", "SomaliaTech", "DesignThinking", "MobileFirst"],
    mentions: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 67, comments: 18, shares: 22, views: 2100 },
    userReaction: "insightful",
    userHasLiked: false,
    userHasSaved: true,
    isRepost: false,
  },
  {
    id: "post-4",
    author: MOCK_USERS[4],
    content: `📅 Save the date! Jazeera University Career Fair 2026 is happening on September 15th!

Meet 50+ leading employers from technology, banking, telecommunications, and more. 

🎯 What's happening:
• Internship & job opportunities on-site
• CV review workshops
• Interview preparation sessions
• Industry panel discussions
• Networking with alumni

📍 Mogadishu Campus, Main Hall
⏰ 9:00 AM - 4:00 PM
🎫 Free entry for all students & graduates

Register at career.jazeera.edu.so

#CareerFair #JazeeraUniversity #SomaliaJobs #Internships #StudentSuccess`,
    type: "event",
    visibility: "public",
    media: [
      {
        id: "media-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
        width: 1200,
        height: 800,
        alt: "Career fair event",
        displayOrder: 0,
      },
    ],
    achievement: undefined,
    opportunity: undefined,
    hashtags: ["CareerFair", "JazeeraUniversity", "SomaliaJobs", "Internships", "StudentSuccess"],
    mentions: [],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 156, comments: 43, shares: 67, views: 5200 },
    userReaction: undefined,
    userHasLiked: false,
    userHasSaved: false,
    isRepost: false,
  },
  {
    id: "post-5",
    author: MOCK_USERS[2],
    content: `I'm thrilled to share that I've accepted a Product Manager role at IBS Bank! 🎉

After 3 years as a Software Engineer, I'm making the transition to product. It's been an incredible journey building products at BlueWave, and I'm excited for this new chapter.

A few reflections:
• Your technical background is a superpower in product
• User empathy > feature velocity
• Saying "no" is as important as saying "yes"
• Build relationships, not just features

Thank you to my mentors, teammates, and the Somali tech community for the support. Onward! 🚀

#CareerGrowth #ProductManagement #SomaliaTech #NewChapter #Grateful`,
    type: "achievement",
    visibility: "public",
    media: [],
    achievement: {
      id: "ach-1",
      title: "New Role: Product Manager",
      subtitle: "IBS Bank · Mogadishu, Somalia",
      icon: "briefcase",
      iconColor: "#0f766e",
    },
    hashtags: ["CareerGrowth", "ProductManagement", "SomaliaTech", "NewChapter", "Grateful"],
    mentions: [],
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 234, comments: 67, shares: 34, views: 8900 },
    userReaction: "celebrate",
    userHasLiked: false,
    userHasSaved: false,
    isRepost: false,
  },
  {
    id: "post-6",
    author: MOCK_USERS[5],
    content: `Cybersecurity awareness is crucial for everyone, not just IT professionals. 🔒

3 quick tips to stay safe online:
1. Use unique passwords with a password manager (Bitwarden, 1Password)
2. Enable 2FA on ALL accounts — especially email and banking
3. Be suspicious of urgent requests for credentials or money

Phishing is the #1 attack vector in Somalia. Always verify before you click.

Stay safe! 🛡️

#CyberSecurity #DigitalSafety #SomaliaTech #Awareness #TechTips`,
    type: "text",
    visibility: "public",
    media: [],
    hashtags: ["CyberSecurity", "DigitalSafety", "SomaliaTech", "Awareness", "TechTips"],
    mentions: [],
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    stats: { likes: 78, comments: 15, shares: 42, views: 2800 },
    userReaction: undefined,
    userHasLiked: false,
    userHasSaved: false,
    isRepost: false,
  },
];

type FeedContextValue = {
  posts: Post[];
  currentUser: FeedUser;
  createPost: (data: {
    content: string;
    type: PostType;
    visibility: PostVisibility;
    media?: PostMedia[];
    opportunity?: PostOpportunity;
    achievement?: PostAchievement;
  }) => void;
  updatePost: (postId: string, data: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  toggleLike: (postId: string) => void;
  setReaction: (postId: string, reaction: ReactionType | null) => void;
  toggleSave: (postId: string) => void;
  addComment: (postId: string, content: string, parentCommentId?: string) => void;
  updateComment: (commentId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string) => void;
  sharePost: (postId: string) => void;
  getPost: (postId: string) => Post | undefined;
};

const FeedContext = createContext<FeedContextValue | null>(null);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const createPost = useCallback((data: {
    content: string;
    type: PostType;
    visibility: PostVisibility;
    media?: PostMedia[];
    opportunity?: PostOpportunity;
    achievement?: PostAchievement;
  }) => {
    const hashtags = data.content.match(/#(\w+)/g)?.map((h) => h.slice(1)) || [];
    const mentions = data.content.match(/@(\w+)/g)?.map((m) => m.slice(1)) || [];

    const newPost: Post = {
      id: generateId(),
      author: CURRENT_USER,
      content: data.content,
      type: data.type,
      visibility: data.visibility,
      media: data.media || [],
      opportunity: data.opportunity,
      achievement: data.achievement,
      hashtags,
      mentions,
      createdAt: new Date().toISOString(),
      stats: { likes: 0, comments: 0, shares: 0, views: 0 },
      userReaction: undefined,
      userHasLiked: false,
      userHasSaved: false,
      isRepost: false,
    };

    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((postId: string, data: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId && post.author.id === CURRENT_USER.id
          ? { ...post, ...data, updatedAt: new Date().toISOString() }
          : post
      )
    );
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((post) => !(post.id === postId && post.author.id === CURRENT_USER.id)));
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              userHasLiked: !post.userHasLiked,
              stats: {
                ...post.stats,
                likes: post.userHasLiked ? post.stats.likes - 1 : post.stats.likes + 1,
              },
            }
          : post
      )
    );
  }, []);

  const setReaction = useCallback((postId: string, reaction: ReactionType | null) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              userReaction: reaction,
              userHasLiked: reaction !== null,
              stats: {
                ...post.stats,
                likes: reaction && !post.userHasLiked
                  ? post.stats.likes + 1
                  : !reaction && post.userHasLiked
                  ? post.stats.likes - 1
                  : post.stats.likes,
              },
            }
          : post
      )
    );
  }, []);

  const toggleSave = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, userHasSaved: !post.userHasSaved }
          : post
      )
    );
  }, []);

  const addComment = useCallback((postId: string, content: string, parentCommentId?: string) => {
    const newComment: Comment = {
      id: generateId(),
      postId,
      author: CURRENT_USER,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      userHasLiked: false,
      replies: [],
      parentCommentId,
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        if (parentCommentId) {
          const addReply = (comments: Comment[]): Comment[] =>
            comments.map((c) =>
              c.id === parentCommentId
                ? { ...c, replies: [...c.replies, newComment] }
                : c.replies.length > 0
                ? { ...c, replies: addReply(c.replies) }
                : c
            );
          return {
            ...post,
            stats: { ...post.stats, comments: post.stats.comments + 1 },
            comments: addReply(post.comments || []),
          };
        }

        return {
          ...post,
          stats: { ...post.stats, comments: post.stats.comments + 1 },
          comments: [newComment, ...(post.comments || [])],
        };
      })
    );
  }, []);

  const updateComment = useCallback((commentId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        comments: post.comments?.map((c) =>
          c.id === commentId
            ? { ...c, content, updatedAt: new Date().toISOString() }
            : c.replies.length > 0
            ? { ...c, replies: c.replies.map((r) => (r.id === commentId ? { ...r, content, updatedAt: new Date().toISOString() } : r)) }
            : c
        ),
      }))
    );
  }, []);

  const deleteComment = useCallback((commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        stats: { ...post.stats, comments: Math.max(0, post.stats.comments - 1) },
        comments: post.comments?.filter((c) => {
          if (c.id === commentId) return false;
          if (c.replies.some((r) => r.id === commentId)) {
            c.replies = c.replies.filter((r) => r.id !== commentId);
          }
          return true;
        }),
      }))
    );
  }, []);

  const likeComment = useCallback((commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        comments: post.comments?.map((c) =>
          c.id === commentId
            ? { ...c, userHasLiked: !c.userHasLiked, likes: c.userHasLiked ? c.likes - 1 : c.likes + 1 }
            : c.replies.length > 0
            ? { ...c, replies: c.replies.map((r) =>
                r.id === commentId ? { ...r, userHasLiked: !r.userHasLiked, likes: r.userHasLiked ? r.likes - 1 : r.likes + 1 } : r
              ) }
            : c
        ),
      }))
    );
  }, []);

  const sharePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, stats: { ...post.stats, shares: post.stats.shares + 1 } }
          : post
      )
    );
  }, []);

  const getPost = useCallback((postId: string) => {
    return posts.find((p) => p.id === postId);
  }, [posts]);

  const value = useMemo<FeedContextValue>(
    () => ({
      posts,
      currentUser: CURRENT_USER,
      createPost,
      updatePost,
      deletePost,
      toggleLike,
      setReaction,
      toggleSave,
      addComment,
      updateComment,
      deleteComment,
      likeComment,
      sharePost,
      getPost,
    }),
    [
      posts,
      createPost,
      updatePost,
      deletePost,
      toggleLike,
      setReaction,
      toggleSave,
      addComment,
      updateComment,
      deleteComment,
      likeComment,
      sharePost,
      getPost,
    ]
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) {
    throw new Error("useFeed must be used within FeedProvider");
  }
  return ctx;
}