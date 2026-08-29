export type PostType =
  | "text"
  | "image"
  | "video"
  | "achievement"
  | "opportunity"
  | "event"
  | "document";

export type PostVisibility = "public" | "connections" | "private";

export type ReactionType =
  | "like"
  | "celebrate"
  | "insightful"
  | "support";

export type UserRole = "student" | "graduate" | "company" | "university";

export interface FeedUser {
  id: string;
  name: string;
  headline: string;
  avatarUrl?: string;
  initials: string;
  avatarColor: string;
  role: UserRole;
  verified: boolean;
  isTop7?: boolean;
  companyId?: string;
  universityId?: string;
}

export interface PostMedia {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  alt?: string;
  displayOrder: number;
}

export interface PostOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  logoColor: string;
  logoInitials: string;
}

export interface PostAchievement {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
}

export interface Post {
  id: string;
  author: FeedUser;
  content: string;
  type: PostType;
  visibility: PostVisibility;
  media: PostMedia[];
  opportunity?: PostOpportunity;
  achievement?: PostAchievement;
  hashtags: string[];
  mentions: string[];
  createdAt: string;
  updatedAt?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  userReaction?: ReactionType | null;
  userHasLiked: boolean;
  userHasSaved: boolean;
  isRepost: boolean;
  originalPostId?: string;
  originalPostAuthor?: FeedUser;
  comments?: Comment[];
}

export interface Reaction {
  id: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: FeedUser;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  userHasLiked: boolean;
  replies: Comment[];
  parentCommentId?: string;
}

export interface Hashtag {
  tag: string;
  count: number;
}

export interface TrendingTopic {
  hashtag: string;
  count: number;
  category: string;
}

export interface SuggestedConnection {
  user: FeedUser;
  mutualConnections: number;
  reason: string;
}

export interface FeedFilters {
  type?: PostType;
  authorRole?: UserRole;
  hashtag?: string;
  sortBy?: "recent" | "popular" | "relevant";
  timeRange?: "day" | "week" | "month" | "all";
}