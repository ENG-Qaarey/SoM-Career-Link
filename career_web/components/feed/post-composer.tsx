"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeed } from "@/context/feed-provider";
import { FeedUser, PostType, PostVisibility, PostMedia, PostOpportunity, PostAchievement } from "@/lib/feed-types";
import { getRandomColor } from "@/lib/feed-utils";

type ComposerProps = {
  onClose: () => void;
  onPostCreated: () => void;
};

const POST_TYPES: { id: PostType; label: string; icon: string; description: string }[] = [
  { id: "text", label: "Text", icon: "message-square", description: "Share thoughts, ideas, questions" },
  { id: "image", label: "Photo", icon: "image", description: "Add photos to your post" },
  { id: "video", label: "Video", icon: "video", description: "Share a video" },
  { id: "achievement", label: "Achievement", icon: "award", description: "Celebrate a milestone" },
  { id: "opportunity", label: "Opportunity", icon: "briefcase", description: "Share a job or internship" },
  { id: "document", label: "Document", icon: "file-text", description: "Attach a PDF or document" },
];

const VISIBILITY_OPTIONS: { id: PostVisibility; label: string; description: string; icon: string }[] = [
  { id: "public", label: "Anyone", description: "Visible to everyone", icon: "globe" },
  { id: "connections", label: "Connections", description: "Only your connections", icon: "users" },
  { id: "private", label: "Only me", description: "Visible only to you", icon: "lock" },
];

export function PostComposer({ onClose, onPostCreated }: ComposerProps) {
  const { createPost, currentUser } = useFeed();
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("text");
  const [visibility, setVisibility] = useState<PostVisibility>("public");
  const [media, setMedia] = useState<PostMedia[]>([]);
  const [opportunity, setOpportunity] = useState<PostOpportunity | null>(null);
  const [achievement, setAchievement] = useState<PostAchievement | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showVisibilitySelector, setShowVisibilitySelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = content.length;
  const maxChars = 3000;
  const canPost = content.trim().length > 0 && !isSubmitting;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!canPost) return;
    setIsSubmitting(true);

    try {
      createPost({
        content: content.trim(),
        type: postType,
        visibility,
        media: media.length > 0 ? media : undefined,
        opportunity: opportunity || undefined,
        achievement: achievement || undefined,
      });
      onPostCreated();
      onClose();
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setContent("");
    setPostType("text");
    setVisibility("public");
    setMedia([]);
    setOpportunity(null);
    setAchievement(null);
    setShowAchievementForm(false);
    setShowOpportunityForm(false);
  };

  const handleMediaAdd = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        const newMedia: PostMedia = {
          id: `media-${Date.now()}-${index}`,
          type: file.type.startsWith("video/") ? "video" : "image",
          url,
          displayOrder: media.length + index,
        };
        setMedia((prev) => [...prev, newMedia]);
      }
    });
  };

  const handleMediaRemove = (mediaId: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== mediaId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="cl-card"
    >
      <div className="p-4 border-b border-cl-border">
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cl-blue to-cl-blue-bright flex items-center justify-center text-white font-bold text-sm">
              {currentUser.initials}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-cl-main bg-cl-success" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-cl-text">{currentUser.name}</span>
              <span className="text-cl-muted">{currentUser.headline}</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => setShowVisibilitySelector(!showVisibilitySelector)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-blue-light transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </span>
                <span>Anyone</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showVisibilitySelector && (
                <div className="absolute z-10 mt-1 w-56 cl-card p-2 shadow-lg border border-cl-border rounded-xl animate-in fade-in-0 zoom-in-95 duration-150">
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setVisibility(opt.id);
                        setShowVisibilitySelector(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        visibility === opt.id
                          ? "bg-cl-blue-light text-cl-blue"
                          : "text-cl-text hover:bg-cl-secondary"
                      }`}
                    >
                      <span className="w-4 h-4 flex items-center justify-center">
                        {opt.icon === "globe" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        )}
                        {opt.icon === "users" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        {opt.icon === "lock" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </span>
                      <div>
                        <div className="font-medium">{opt.label}</div>
                        <div className="text-xs text-cl-muted">{opt.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something with your professional community..."
          className="w-full min-h-[100px] resize-none bg-transparent text-cl-text placeholder-cl-muted text-base leading-relaxed outline-none"
          maxLength={maxChars}
          aria-label="Post content"
        />

        {(showAchievementForm || showOpportunityForm) && (
          <AnimatePresence mode="wait">
            {showAchievementForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-cl-blue-light rounded-xl border border-cl-blue/20"
              >
                <h4 className="font-semibold text-cl-blue mb-3">Achievement Details</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Title (e.g., New Role: Product Manager)"
                    className="cl-input"
                    onChange={(e) => setAchievement({ ...(achievement || { id: "", title: "", subtitle: "", icon: "", iconColor: "" }), title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Subtitle (e.g., Company · Location)"
                    className="cl-input"
                    onChange={(e) => setAchievement({ ...(achievement || { id: "", title: "", subtitle: "", icon: "", iconColor: "" }), subtitle: e.target.value })}
                  />
                  <select className="cl-input cl-select" onChange={(e) => setAchievement({ ...(achievement || { id: "", title: "", subtitle: "", icon: "", iconColor: "" }), icon: e.target.value })}>
                    <option value="briefcase">Briefcase</option>
                    <option value="award">Award</option>
                    <option value="graduation-cap">Graduation Cap</option>
                    <option value="certificate">Certificate</option>
                    <option value="trophy">Trophy</option>
                  </select>
                  <input
                    type="color"
                    className="cl-input h-10 cursor-pointer"
                    onChange={(e) => setAchievement({ ...(achievement || { id: "", title: "", subtitle: "", icon: "", iconColor: "" }), iconColor: e.target.value })}
                  />
                </div>
              </motion.div>
            )}
            {showOpportunityForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-cl-blue-light rounded-xl border border-cl-blue/20"
              >
                <h4 className="font-semibold text-cl-blue mb-3">Opportunity Details</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Title (e.g., Software Engineering Intern)"
                    className="cl-input"
                    onChange={(e) => setOpportunity({ ...(opportunity || { id: "", title: "", company: "", location: "", type: "", posted: "", logoColor: "", logoInitials: "" }), title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="cl-input"
                    onChange={(e) => setOpportunity({ ...(opportunity || { id: "", title: "", company: "", location: "", type: "", posted: "", logoColor: "", logoInitials: "" }), company: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="cl-input"
                    onChange={(e) => setOpportunity({ ...(opportunity || { id: "", title: "", company: "", location: "", type: "", posted: "", logoColor: "", logoInitials: "" }), location: e.target.value })}
                  />
                  <select className="cl-input cl-select" onChange={(e) => setOpportunity({ ...(opportunity || { id: "", title: "", company: "", location: "", type: "", posted: "", logoColor: "", logoInitials: "" }), type: e.target.value })}>
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Graduate Program">Graduate Program</option>
                    <option value="Event">Event</option>
                    <option value="Scholarship">Scholarship</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {media.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {media.map((m) => (
              <div key={m.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                {m.type === "image" && (
                  <img src={m.url} alt={m.alt || ""} className="w-full h-full object-cover" />
                )}
                {m.type === "video" && (
                  <video src={m.url} className="w-full h-full object-cover" muted />
                )}
                <button
                  type="button"
                  onClick={() => handleMediaRemove(m.id)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Remove media"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-cl-border">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTypeSelector(!showTypeSelector)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors"
              aria-label="Add to post"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add</span>
            </button>

            {showTypeSelector && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 bottom-full left-0 mb-2 w-64 cl-card p-2 shadow-lg border border-cl-border rounded-xl animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  {POST_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setPostType(type.id);
                        setShowTypeSelector(false);
                        if (type.id === "achievement") setShowAchievementForm(true);
                        if (type.id === "opportunity") setShowOpportunityForm(true);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        postType === type.id
                          ? "bg-cl-blue-light text-cl-blue"
                          : "text-cl-text hover:bg-cl-secondary"
                      }`}
                    >
                      <span className="w-5 h-5 flex items-center justify-center">
                        {type.icon === "message-square" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                        {type.icon === "image" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {type.icon === "video" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                        {type.icon === "award" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )}
                        {type.icon === "briefcase" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {type.icon === "file-text" && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </span>
                      <div className="text-left">
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-cl-muted">{type.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {media.length === 0 && postType !== "achievement" && postType !== "opportunity" && (
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cl-muted hover:text-cl-text hover:bg-cl-secondary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files && handleMediaAdd(e.target.files)}
                  className="sr-only"
                />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Photo</span>
              </label>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-cl-muted">{charCount}/{maxChars}</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-cl-text hover:bg-cl-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canPost}
              className="cl-btn cl-btn-primary px-6"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}