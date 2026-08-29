import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENT_USER,
  INITIAL_APPLICATIONS,
  INITIAL_COMMENTS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  INITIAL_SAVES,
  OPPORTUNITIES,
  TOP_SEVEN_IDS,
  type Application,
  type Conversation,
  type Opportunity,
  type Post,
  type PostComment,
  type PostKind,
  type PostMedia,
  type PostOpportunity,
  type PostVisibility,
  type ReactionType,
} from "@/lib/data";

type AppContextValue = {
  opportunities: Opportunity[];
  posts: Post[];
  savedPostIds: string[];
  applications: Application[];
  conversations: Conversation[];
  comments: Record<string, PostComment[]>;
  trendingHashtags: { tag: string; posts: number }[];
  suggestedPeople: { id: string; name: string; role: string; initials: string; color: string }[];
  toggleSave: (id: string) => void;
  applyTo: (opportunityId: string) => void;
  hasApplied: (opportunityId: string) => boolean;
  sendMessage: (conversationId: string, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  createPost: (args: {
    content: string;
    kind?: PostKind;
    visibility?: PostVisibility;
    media?: PostMedia[];
    opportunity?: PostOpportunity;
    achievement?: { kind: any; title: string; subtitle?: string; dateLabel?: string };
  }) => string;
  updatePost: (
    postId: string,
    args: {
      content?: string;
      kind?: PostKind;
      visibility?: PostVisibility;
      media?: PostMedia[];
    }
  ) => void;
  deletePost: (postId: string) => void;
  hidePost: (postId: string) => void;
  changePostVisibility: (postId: string, visibility: PostVisibility) => void;
  setPostReaction: (postId: string, reaction: ReactionType | null) => void;
  togglePostSave: (postId: string) => void;
  sharePost: (postId: string) => void;
  addComment: (postId: string, content: string, parentCommentId?: string) => void;
  updateComment: (postId: string, commentId: string, content: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  getComments: (postId: string) => PostComment[];
  getPost: (id: string) => Post | undefined;
  getSavedPosts: () => Post[];
  getMyPosts: () => Post[];
  getOpportunity: (id?: string) => Opportunity | undefined;
  getConversation: (id?: string) => Conversation | undefined;
  unreadMessages: number;
  unreadNotifications: number;
  reportPost: (postId: string, category: string, details?: string) => void;
  addConnection: (personId: string) => void;
  connectedIds: Set<string>;
};

const AppContext = createContext<AppContextValue | null>(null);

const SEE_MORE_THRESHOLD = 220;

export function extractMentionsAndHashtags(text: string) {
  const mentions: Post["mentions"] = [];
  const hashtags: Post["hashtags"] = [];
  const mentionRe = /@([A-Za-zÀ-ÿ][\wÀ-ÿ]*(?:\s[A-Za-zÀ-ÿ][\wÀ-ÿ]*)*)/g;
  const hashtagRe = /#([A-Za-zÀ-ÿ][\wÀ-ÿ]*)/g;
  let match: RegExpExecArray | null;
  while ((match = mentionRe.exec(text))) {
    mentions.push({
      id: match[1].toLowerCase().replace(/\s/g, "-"),
      name: match[1],
      offset: match.index,
      length: match[0].length,
    });
  }
  while ((match = hashtagRe.exec(text))) {
    hashtags.push({
      tag: match[0],
      offset: match.index,
      length: match[0].length,
    });
  }
  return { mentions, hashtags };
}

function totalReactionCounts(p: Post) {
  return Object.values(p.reactionCounts).reduce((sum, n) => sum + (n ?? 0), 0);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedPostIds, setSavedPostIds] = useState<string[]>(
    INITIAL_SAVES.map((s) => s.postId)
  );
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [comments, setComments] = useState<Record<string, PostComment[]>>(INITIAL_COMMENTS);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(TOP_SEVEN_IDS);

  const trendingHashtags = useMemo(
    () => [
      { tag: "#Internship", posts: 284 },
      { tag: "#Technology", posts: 221 },
      { tag: "#SomaliaJobs", posts: 198 },
      { tag: "#CareerDevelopment", posts: 174 },
      { tag: "#SoftwareEngineering", posts: 142 },
      { tag: "#Students", posts: 118 },
      { tag: "#Entrepreneurship", posts: 96 },
      { tag: "#CareerLinkSomalia", posts: 82 },
    ],
    []
  );

  const suggestedPeople = useMemo(
    () => [
      { id: "sug-1", name: "Yusuf Mohamed", role: "Recruiter · IBS Bank", initials: "YM", color: "#0f766e" },
      { id: "sug-2", name: "Fadumo Said", role: "UX Design Graduate", initials: "FS", color: "#7c3aed" },
      { id: "sug-3", name: "Khalid Ali", role: "Lecturer · SIMAD", initials: "KA", color: "#1d4ed8" },
      { id: "sug-4", name: "Nadira Abdi", role: "Product Designer", initials: "NA", color: "#db2777" },
    ],
    []
  );

  const toggleSave = useCallback((id: string) => {
    setSavedPostIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const hasApplied = useCallback(
    (opportunityId: string) => applications.some((app) => app.opportunityId === opportunityId),
    [applications]
  );

  const applyTo = useCallback((opportunityId: string) => {
    setApplications((prev) => {
      if (prev.some((app) => app.opportunityId === opportunityId)) return prev;
      return [
        {
          id: `app-${Date.now()}`,
          opportunityId,
          status: "Applied",
          date: "Applied just now",
        },
        ...prev,
      ];
    });
  }, []);

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, { id: `m-${Date.now()}`, fromMe: true, text: trimmed, time }],
            }
          : c
      )
    );
  }, []);

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId && c.unread > 0 ? { ...c, unread: 0 } : c))
    );
  }, []);

  const createPost = useCallback<AppContextValue["createPost"]>(
    ({ content, kind = "text", visibility = "public", media, opportunity, achievement }) => {
      const { mentions, hashtags } = extractMentionsAndHashtags(content);
      const id = `post-${Date.now()}`;
      const newPost: Post = {
        id,
        authorId: CURRENT_USER.id,
        authorName: CURRENT_USER.name,
        authorInitials: CURRENT_USER.initials,
        authorColor: CURRENT_USER.color,
        authorRole: CURRENT_USER.role,
        content,
        kind,
        visibility,
        time: "Just now",
        createdAt: Date.now(),
        media,
        opportunity,
        achievement,
        mentions,
        hashtags,
        shares: 0,
        saved: false,
        liked: false,
        reactionCounts: {},
        commentCount: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
      return id;
    },
    []
  );

  const updatePost = useCallback<AppContextValue["updatePost"]>((postId, args) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || p.authorId !== CURRENT_USER.id) return p;
        const updated = { ...p, time: "Edited just now" } as Post;
        if (args.content) {
          updated.content = args.content;
          const { mentions, hashtags } = extractMentionsAndHashtags(args.content);
          updated.mentions = mentions;
          updated.hashtags = hashtags;
        }
        if (args.kind) updated.kind = args.kind;
        if (args.visibility) updated.visibility = args.visibility;
        if (args.media) updated.media = args.media;
        return updated;
      })
    );
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((p) => !(p.id === postId && p.authorId === CURRENT_USER.id)));
    setComments((prev) => {
      const next = { ...prev };
      delete next[postId];
      return next;
    });
  }, []);

  const hidePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, hidden: true } : p))
    );
  }, []);

  const changePostVisibility = useCallback((postId: string, visibility: PostVisibility) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId && p.authorId === CURRENT_USER.id ? { ...p, visibility } : p
      )
    );
  }, []);

  const setPostReaction = useCallback((postId: string, reaction: ReactionType | null) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const counts = { ...p.reactionCounts };
        const current = p.reaction;
        if (current) counts[current] = Math.max(0, (counts[current] ?? 0) - 1);
        if (reaction) counts[reaction] = (counts[reaction] ?? 0) + 1;
        const total = Object.values(counts).reduce((s, n) => s + (n ?? 0), 0);
        return {
          ...p,
          reaction: reaction ?? undefined,
          liked: reaction === "like",
          reactionCounts: counts,
          likes: total,
        } as Post;
      })
    );
  }, []);

  const togglePostSave = useCallback((postId: string) => {
    setSavedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p))
    );
  }, []);

  const sharePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p))
    );
  }, []);

  const addComment = useCallback(
    (postId: string, content: string, parentCommentId?: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      const now = Date.now();
      const newComment: PostComment = {
        id: `c-${now}-${Math.random().toString(36).slice(2, 6)}`,
        postId,
        parentCommentId,
        authorId: CURRENT_USER.id,
        authorName: CURRENT_USER.name,
        authorInitials: CURRENT_USER.initials,
        authorColor: CURRENT_USER.color,
        authorRole: CURRENT_USER.role,
        content: trimmed,
        createdAt: now,
        timeLabel: "Just now",
        likes: 0,
        liked: false,
        replies: parentCommentId ? undefined : [],
      };
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p))
      );
      setComments((prev) => {
        const list = prev[postId] ? [...prev[postId]] : [];
        if (parentCommentId) {
          const idx = list.findIndex((c) => c.id === parentCommentId);
          if (idx >= 0) {
            list[idx] = {
              ...list[idx],
              replies: [...(list[idx].replies ?? []), newComment],
            };
          }
        } else {
          list.unshift(newComment);
        }
        return { ...prev, [postId]: list };
      });
    },
    []
  );

  const updateComment = useCallback((postId: string, commentId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setComments((prev) => {
      const list = prev[postId] ?? [];
      const mutate = (c: PostComment): PostComment =>
        c.id === commentId && c.authorId === CURRENT_USER.id
          ? { ...c, content: trimmed, edited: true, timeLabel: "Edited just now" }
          : { ...c, replies: c.replies?.map(mutate) };
      return { ...prev, [postId]: list.map(mutate) };
    });
  }, []);

  const deleteComment = useCallback((postId: string, commentId: string) => {
    const mutate = (c: PostComment): PostComment | null => {
      if (c.id === commentId && c.authorId === CURRENT_USER.id) return null;
      const replies = c.replies?.map(mutate).filter((x): x is PostComment => x !== null);
      return { ...c, replies };
    };
    setComments((prev) => {
      const list = (prev[postId] ?? [])
        .map(mutate)
        .filter((x): x is PostComment => x !== null);
      return { ...prev, [postId]: list };
    });
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentCount: Math.max(0, p.commentCount - 1) } : p
      )
    );
  }, []);

  const toggleCommentLike = useCallback((postId: string, commentId: string) => {
    const mutate = (c: PostComment): PostComment => {
      if (c.id === commentId) {
        return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
      }
      return { ...c, replies: c.replies?.map(mutate) };
    };
    setComments((prev) => {
      const list = prev[postId] ?? [];
      return { ...prev, [postId]: list.map(mutate) };
    });
  }, []);

  const getComments = useCallback(
    (postId: string) => comments[postId] ?? [],
    [comments]
  );

  const getPost = useCallback(
    (id: string) => posts.find((p) => p.id === id),
    [posts]
  );

  const getSavedPosts = useCallback(
    () => posts.filter((p) => savedPostIds.includes(p.id)),
    [posts, savedPostIds]
  );

  const getMyPosts = useCallback(
    () => posts.filter((p) => p.authorId === CURRENT_USER.id),
    [posts]
  );

  const getOpportunity = useCallback(
    (id?: string) => OPPORTUNITIES.find((o) => o.id === id),
    []
  );

  const getConversation = useCallback(
    (id?: string) => conversations.find((c) => c.id === id),
    [conversations]
  );

  const reportPost = useCallback(() => {}, []);

  const addConnection = useCallback((personId: string) => {
    setConnectedIds((prev) => {
      const next = new Set(prev);
      next.add(personId);
      return next;
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      opportunities: OPPORTUNITIES,
      posts,
      savedPostIds,
      applications,
      conversations,
      comments,
      trendingHashtags,
      suggestedPeople,
      toggleSave,
      applyTo,
      hasApplied,
      sendMessage,
      markConversationRead,
      createPost,
      updatePost,
      deletePost,
      hidePost,
      changePostVisibility,
      setPostReaction,
      togglePostSave,
      sharePost,
      addComment,
      updateComment,
      deleteComment,
      toggleCommentLike,
      getComments,
      getPost,
      getSavedPosts,
      getMyPosts,
      getOpportunity,
      getConversation,
      unreadMessages: conversations.reduce((sum, c) => sum + c.unread, 0),
      unreadNotifications: INITIAL_NOTIFICATIONS.filter((n) => n.unread).length,
      reportPost,
      addConnection,
      connectedIds,
    }),
    [
      applications,
      conversations,
      savedPostIds,
      toggleSave,
      applyTo,
      hasApplied,
      sendMessage,
      markConversationRead,
      createPost,
      updatePost,
      deletePost,
      hidePost,
      changePostVisibility,
      setPostReaction,
      togglePostSave,
      sharePost,
      addComment,
      updateComment,
      deleteComment,
      toggleCommentLike,
      getComments,
      getPost,
      getSavedPosts,
      getMyPosts,
      getOpportunity,
      getConversation,
      posts,
      comments,
      trendingHashtags,
      suggestedPeople,
      reportPost,
      addConnection,
      connectedIds,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}

export { SEE_MORE_THRESHOLD };
