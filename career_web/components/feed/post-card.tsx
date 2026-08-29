"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "@/context/feed-provider";
import { Post, FeedUser, ReactionType } from "@/lib/feed-types";
import { formatRelativeTime, formatNumber, truncateText, parsePostContent } from "@/lib/feed-utils";

type PostCardProps = {
  post: Post;
  currentUser: FeedUser;
  isExpanded?: boolean;
  onExpand?: () => void;
};

const REACTIONS: ReactionType[] = ["like", "celebrate", "insightful", "support"];

function PostHeader({ post, currentUser, onMenuClick, onMenuClose, showMenu, menuRef }: {
  post: Post;
  currentUser: FeedUser;
  onMenuClick: (e: React.MouseEvent) => void;
  onMenuClose: () => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isAuthor = post.author.id === currentUser.id;

  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <button
          className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
          aria-label={`${post.author.name}'s profile`}
        >
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--cl-blue)] to-[var(--cl-blue-bright)] flex items-center justify-center text-white font-bold text-sm">
              {post.author.initials}
            </div>
          )}
          {post.author.verified && (
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-cl-blue rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-cl-text truncate">{post.author.name}</span>
            {post.author.verified && (
              <span className="flex items-center justify-center w-5 h-5" aria-label="Verified">
                <svg className="w-3.5 h-3.5 text-cl-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
            {post.author.isTop7 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Top 7
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-cl-muted mt-1">
            <span>{post.author.headline}</span>
            <span>·</span>
            <time dateTime={post.createdAt}>{formatRelativeTime(post.createdAt)}</time>
            {post.isRepost && post.originalPostAuthor && (
              <>
                <span>·</span>
                <span>Reposted from {post.originalPostAuthor.name}</span>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors"
            aria-label="More options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {showMenu && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute right-0 top-full mt-1 w-48 cl-card shadow-lg border border-cl-border rounded-xl py-1 z-10 animate-in fade-in-0 zoom-in-95 duration-150"
                ref={menuRef}
              >
                {isAuthor && (
                  <>
                    <button
                      onClick={onMenuClose}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-cl-text hover:bg-cl-secondary"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit post
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this post?")) {
                          // delete handled by parent
                        }
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete post
                    </button>
                    <hr className="my-1 border-cl-border" />
                  </>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-cl-text hover:bg-cl-secondary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy link
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-cl-text hover:bg-cl-secondary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Hide post
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Report post
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function PostContent({ post }: { post: Post }) {
  const [expandedContent, setExpandedContent] = useState(false);
  const shouldTruncate = post.content.length > 300 && !expandedContent;
  const displayContent = shouldTruncate ? truncateText(post.content, 300) : post.content;

  return (
    <div className="px-4 pb-4">
      {post.opportunity && (
        <div className="mb-3 p-3 bg-cl-blue-light/50 border border-cl-blue/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--cl-blue)] to-[var(--cl-blue-bright)] flex items-center justify-center text-white font-bold text-sm">
              {post.opportunity.logoInitials}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-cl-blue truncate">{post.opportunity.title}</h4>
              <p className="text-sm text-cl-muted">{post.opportunity.company} · {post.opportunity.location}</p>
              <p className="text-xs text-cl-muted mt-1">{post.opportunity.type} · {post.opportunity.posted}</p>
            </div>
          </div>
        </div>
      )}

      {post.achievement && (
        <div className="mb-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">{post.achievement.title}</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{post.achievement.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-cl-text leading-relaxed whitespace-pre-wrap">
        <span dangerouslySetInnerHTML={{ __html: parsePostContent(displayContent).html }} />
        {shouldTruncate && (
          <button
            onClick={() => setExpandedContent(true)}
            className="ml-1 text-sm font-medium text-cl-blue hover:underline"
          >
            See more
          </button>
        )}
        {!shouldTruncate && expandedContent && (
          <button
            onClick={() => setExpandedContent(false)}
            className="ml-1 text-sm font-medium text-cl-blue hover:underline"
          >
            See less
          </button>
        )}
      </div>

      {post.hashtags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {post.hashtags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-cl-blue bg-cl-blue-light rounded-full"
            >
              #{tag}
            </span>
          ))}
          {post.hashtags.length > 5 && (
            <span className="px-2 py-1 text-xs font-medium text-cl-muted bg-cl-secondary rounded-full">
              +{post.hashtags.length - 5} more
            </span>
          )}
        </div>
      )}

      {post.media.length > 0 && (
        <div className="mt-4">
          {post.media.length === 1 && post.media[0].type === "image" && (
            <img
              src={post.media[0].url}
              alt={post.media[0].alt || ""}
              className="w-full max-h-[500px] rounded-xl object-cover"
              loading="lazy"
            />
          )}
          {post.media.length > 1 && (
            <div className="grid gap-2">
              {post.media.length === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {post.media.map((m) => (
                    <img
                      key={m.id}
                      src={m.url}
                      alt={m.alt || ""}
                      className="w-full h-48 rounded-xl object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              {post.media.length === 3 && (
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src={post.media[0].url}
                    alt={post.media[0].alt || ""}
                    className="col-span-2 h-48 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <img
                    src={post.media[1].url}
                    alt={post.media[1].alt || ""}
                    className="h-48 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <img
                    src={post.media[2].url}
                    alt={post.media[2].alt || ""}
                    className="h-48 rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {post.media.length >= 4 && (
                <div className="grid grid-cols-2 gap-2">
                  {post.media.slice(0, 4).map((m) => (
                    <img
                      key={m.id}
                      src={m.url}
                      alt={m.alt || ""}
                      className="h-48 rounded-xl object-cover"
                      loading="lazy"
                    />
                  ))}
                  {post.media.length > 4 && (
                    <div className="relative h-48 rounded-xl bg-cl-secondary flex items-center justify-center">
                      <span className="text-cl-muted font-semibold text-lg">+{post.media.length - 4}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PostActions({ post, onLike, onComment, onShare, onSave, onReaction }: {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  onReaction: (reaction: ReactionType) => void;
}) {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="border-t border-cl-border">
      <div className="flex items-center">
        <button
          onClick={onLike}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            post.userHasLiked
              ? "text-cl-blue"
              : "text-cl-muted hover:text-cl-text hover:bg-cl-secondary"
          }`}
          aria-label={post.userHasLiked ? "Unlike" : "Like"}
        >
          <svg className="w-5 h-5" fill={post.userHasLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{formatNumber(post.stats.likes)}</span>
        </button>

        <div className="w-px h-8 bg-cl-border mx-1" />

        <button
          onClick={onComment}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors"
          aria-label={`${post.stats.comments} comments`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{formatNumber(post.stats.comments)}</span>
        </button>

        <div className="w-px h-8 bg-cl-border mx-1" />

        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors"
          aria-label="Share"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{formatNumber(post.stats.shares)}</span>
        </button>

        <div className="w-px h-8 bg-cl-border mx-1" />

        <button
          onClick={onSave}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            post.userHasSaved
              ? "text-cl-blue"
              : "text-cl-muted hover:text-cl-text hover:bg-cl-secondary"
          }`}
          aria-label={post.userHasSaved ? "Unsave" : "Save"}
        >
          <svg className="w-5 h-5" fill={post.userHasSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Save</span>
        </button>
      </div>

      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2 px-4 py-2 border-t border-cl-border"
          >
            {REACTIONS.map((reaction) => (
              <button
                key={reaction}
                onClick={() => onReaction(reaction)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  post.userReaction === reaction
                    ? "bg-cl-blue-light text-cl-blue"
                    : "text-cl-muted hover:text-cl-text hover:bg-cl-secondary"
                }`}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {reaction === "like" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 10.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  )}
                  {reaction === "celebrate" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429 2.637 5.384a1 1 0 001.774 0l2.637-5.384 5 1.429a1 1 0 001.169-1.409l-7-14zM10 7.743l2.659 5.363 5.887-1.683-4.263 4.15 1.008 5.847-5.292-2.783-5.292 2.783 1.008-5.847-4.264-4.15 5.887 1.683z" />
                    </svg>
                  )}
                  {reaction === "insightful" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0111 5zm0 10a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {reaction === "support" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.49 3.836a1 1 0 011.223 1.275l-.521 2.51a4.5 4.5 0 01.928 1.55l2.028 1.976a1 1 0 11-1.42 1.455l-2.029-1.977a6.5 6.5 0 01-1.572-.954l-.52 2.511a1 1 0 11-1.973-.41l.521-2.51a6.5 6.5 0 01-1.572.954l-2.029 1.977a1 1 0 11-1.419-1.455l2.028-1.976a4.5 4.5 0 01.928-1.55l-.521-2.51a1 1 0 011.223-1.275l2.362-.687a6.5 6.5 0 013.279 0l2.361.687zM7 15a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                  )}
                </span>
                <span>{reaction === "like" ? "Like" : reaction === "celebrate" ? "Celebrate" : reaction === "insightful" ? "Insightful" : "Support"}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CommentsSection({ post, currentUser, addComment, likeComment }: {
  post: Post;
  currentUser: FeedUser;
  addComment: (postId: string, content: string, parentCommentId?: string) => void;
  likeComment: (commentId: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleCommentSubmit = (parentId?: string) => {
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;
    addComment(post.id, content.trim(), parentId);
    if (parentId) {
      setReplyingTo(null);
      setReplyContent("");
    } else {
      setNewComment("");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowComments(!showComments)}
        className="w-full py-2 text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors"
      >
        {showComments ? "Hide comments" : `${formatNumber(post.stats.comments)} comments`}
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cl-border bg-cl-secondary/50"
          >
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {post.comments?.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUser={currentUser}
                  onReply={() => setReplyingTo(comment.id)}
                  onLike={() => likeComment(comment.id)}
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  isReplying={replyingTo === comment.id}
                  onSubmitReply={() => handleCommentSubmit(comment.id)}
                />
              ))}

              <div className="flex items-start gap-3 pt-4 border-t border-cl-border">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cl-blue to-cl-blue-bright flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {currentUser.initials}
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyingTo ? replyContent : newComment}
                    onChange={(e) => replyingTo ? setReplyContent(e.target.value) : setNewComment(e.target.value)}
                    placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                    className="w-full min-h-[60px] max-h-32 resize-none bg-cl-main border border-cl-border rounded-xl px-3 py-2 text-sm text-cl-text placeholder-cl-muted outline-none focus:border-cl-blue focus:ring-2 focus:ring-cl-blue/20"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    {replyingTo && (
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-1.5 text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => handleCommentSubmit(replyingTo ?? undefined)}
                      disabled={!replyingTo ? !newComment.trim() : !replyContent.trim()}
                      className="cl-btn cl-btn-primary px-4 py-1.5 text-sm"
                    >
                      {replyingTo ? "Reply" : "Comment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CommentItem({
  comment,
  currentUser,
  onReply,
  onLike,
  replyContent,
  setReplyContent,
  isReplying,
  onSubmitReply,
}: {
  comment: any;
  currentUser: FeedUser;
  onReply: () => void;
  onLike: () => void;
  replyContent: string;
  setReplyContent: (v: string) => void;
  isReplying: boolean;
  onSubmitReply: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cl-blue to-cl-blue-bright flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
        {comment.author.initials}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-cl-text">{comment.author.name}</span>
          <span className="text-xs text-cl-muted">{formatRelativeTime(comment.createdAt)}</span>
        </div>
        <p className="text-cl-text mt-1 text-sm leading-relaxed">{comment.content}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onReply}
            className="text-xs font-medium text-cl-muted hover:text-cl-blue transition-colors"
          >
            Reply
          </button>
          <button
            onClick={onLike}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              comment.userHasLiked ? "text-cl-blue" : "text-cl-muted hover:text-cl-text"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill={comment.userHasLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{comment.likes}</span>
          </button>
        </div>

        {isReplying && (
          <div className="mt-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cl-blue to-cl-blue-bright flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {currentUser.initials}
            </div>
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full min-h-[60px] max-h-32 resize-none bg-cl-main border border-cl-border rounded-xl px-3 py-2 text-sm text-cl-text placeholder-cl-muted outline-none focus:border-cl-blue focus:ring-2 focus:ring-cl-blue/20"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={onReply}
                  className="px-3 py-1.5 text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmitReply}
                  disabled={!replyContent.trim()}
                  className="cl-btn cl-btn-primary px-4 py-1.5 text-sm"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {comment.replies.length > 0 && !isReplying && (
          <div className="ml-11 mt-3 space-y-3 border-l-2 border-cl-border pl-3">
            {comment.replies.map((reply: any) => (
              <div key={reply.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cl-blue to-cl-blue-bright flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {reply.author.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-cl-text text-sm">{reply.author.name}</span>
                    <span className="text-xs text-cl-muted">{formatRelativeTime(reply.createdAt)}</span>
                  </div>
                  <p className="text-cl-text mt-1 text-sm leading-relaxed">{reply.content}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button className="text-xs font-medium text-cl-muted hover:text-cl-blue transition-colors">Reply</button>
                    <button className="flex items-center gap-1 text-xs font-medium text-cl-muted hover:text-cl-text transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PostCard({ post, currentUser, isExpanded, onExpand }: PostCardProps) {
  const { toggleLike, setReaction, toggleSave, addComment, sharePost, deletePost, likeComment } = useFeed();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleReactionClick = (reaction: ReactionType) => {
    if (post.userReaction === reaction) {
      setReaction(post.id, null);
    } else {
      setReaction(post.id, reaction);
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
      setShowMenu(false);
    }
  };

  return (
    <article className="cl-card flex flex-col">
      <PostHeader
        post={post}
        currentUser={currentUser}
        onMenuClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        onMenuClose={() => setShowMenu(false)}
        showMenu={showMenu}
        menuRef={menuRef}
      />
      <PostContent post={post} />
      <PostActions
        post={post}
        onLike={() => toggleLike(post.id)}
        onComment={() => {}}
        onShare={() => sharePost(post.id)}
        onSave={() => toggleSave(post.id)}
        onReaction={handleReactionClick}
      />
      <CommentsSection
        post={post}
        currentUser={currentUser}
        addComment={addComment}
        likeComment={likeComment}
      />
    </article>
  );
}