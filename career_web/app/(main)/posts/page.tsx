"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "@/context/feed-provider";
import { FeedUser, PostType, PostVisibility, PostMedia, PostOpportunity, PostAchievement } from "@/lib/feed-types";
import { PostCard } from "@/components/feed/post-card";
import { PostComposer } from "@/components/feed/post-composer";
import { FeedSidebar } from "@/components/feed/feed-sidebar";
import { formatRelativeTime } from "@/lib/feed-utils";
import { Navbar } from "@/components/landing/navbar";

const REACTION_TYPES = [
  { type: "like", label: "Like", icon: "heart" },
  { type: "celebrate", label: "Celebrate", icon: "party-popper" },
  { type: "insightful", label: "Insightful", icon: "lightbulb" },
  { type: "support", label: "Support", icon: "hand" },
] as const;

export default function FeedPage() {
  const { posts, currentUser } = useFeed();
  const [showComposer, setShowComposer] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const handlePostCreated = () => {
    setShowComposer(false);
  };

  return (
    <div className="min-h-screen bg-cl-bg">
      <Navbar />
      <header className="border-b border-cl-border bg-cl-main/95 backdrop-blur-xl">
        <div className="cl-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="cl-heading text-xl font-bold">Posts</h1>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="cl-input cl-select px-3 py-1.5 text-sm min-w-[160px]"
                defaultValue="relevant"
              >
                <option value="relevant">Recommended</option>
                <option value="recent">Latest</option>
                <option value="popular">Popular</option>
                <option value="connections">Connections</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="cl-container py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <PostComposer
              onClose={() => setShowComposer(false)}
              onPostCreated={handlePostCreated}
            />

            <AnimatePresence mode="popLayout">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PostCard
                    post={post}
                    currentUser={currentUser}
                    isExpanded={expandedPostId === post.id}
                    onExpand={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {posts.length === 0 && (
              <div className="cl-card p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-cl-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="mt-4 cl-heading text-lg">No posts yet</h3>
                <p className="mt-2 cl-subtext">Be the first to share something with your professional community</p>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <FeedSidebar currentUser={currentUser} />
          </aside>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <FeedSidebar currentUser={currentUser} isMobile={true} />
      </div>
    </div>
  );
}