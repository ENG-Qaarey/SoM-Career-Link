import type { Post, FeedUser } from "@/lib/feed-types";

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function extractHashtags(text: string): string[] {
  return text.match(/#(\w+)/g)?.map((h) => h.slice(1)) || [];
}

export function extractMentions(text: string): string[] {
  return text.match(/@(\w+)/g)?.map((m) => m.slice(1)) || [];
}

export function parsePostContent(text: string): {
  html: string;
  hashtags: string[];
  mentions: string[];
} {
  const hashtags = extractHashtags(text);
  const mentions = extractMentions(text);

  let html = text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/\n/g, "<br />")
    .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mention">@$1</span>')
    .replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="link">$1</a>'
    );

  return { html, hashtags, mentions };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getRandomColor(): string {
  const colors = [
    "#2563eb",
    "#7c3aed",
    "#0f766e",
    "#ea580c",
    "#db2777",
    "#1d4ed8",
    "#0891b2",
    "#65a30d",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function isCurrentUserAuthor(post: Post, currentUserId: string): boolean {
  return post.author.id === currentUserId;
}

export function getReactionIcon(type: string): string {
  const icons: Record<string, string> = {
    like: "heart",
    celebrate: "party-popper",
    insightful: "lightbulb",
    support: "hand",
  };
  return icons[type] || "heart";
}

export function getReactionLabel(type: string): string {
  const labels: Record<string, string> = {
    like: "Like",
    celebrate: "Celebrate",
    insightful: "Insightful",
    support: "Support",
  };
  return labels[type] || "Like";
}

export function getPostTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    text: "message-square",
    image: "image",
    video: "video",
    achievement: "award",
    opportunity: "briefcase",
    document: "file-text",
  };
  return icons[type] || "message-square";
}

export function getPostTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    text: "Post",
    image: "Photo",
    video: "Video",
    achievement: "Achievement",
    opportunity: "Opportunity",
    document: "Document",
  };
  return labels[type] || "Post";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}