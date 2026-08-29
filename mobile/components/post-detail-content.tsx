import { useMemo, useState, useRef } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import type { Post } from "@/lib/data";
import { CURRENT_USER } from "@/lib/data";
import { MediaGallery, FullscreenViewer, AchievementCard, OpportunityBox, parseContent } from "./post-shared";
import { ReactionRow, ReactionActionBar, ReactionPicker } from "./reaction-picker";
import { CommentList } from "./comment-list";
import { CommentComposer } from "./comment-composer";

const SEE_MORE_LIMIT = 400;

type PostDetailContentProps = {
  post: Post;
  onOpenShare: (postId: string) => void;
  onOpenMore: (postId: string, authorId: string) => void;
  reactionState: {
    reaction?: string;
    setReaction: (r: string | null) => void;
    saved: boolean;
    onToggleSave: () => void;
    onShare: () => void;
  };
  getComments: (postId: string) => any[];
  addComment: (postId: string, text: string, parentId?: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  updateComment: (postId: string, commentId: string, text: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  reportPost: (postId: string, category: string) => void;
};

export function PostDetailContent({
  post,
  onOpenShare,
  onOpenMore,
  reactionState,
  getComments,
  addComment,
  toggleCommentLike,
  updateComment,
  deleteComment,
  reportPost,
}: PostDetailContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaViewerId, setMediaViewerId] = useState<string | null>(null);
  const [likedPulse, setLikedPulse] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const pickerTimer = useRef<any>(null);

  const shouldCollapse = post.content.length > SEE_MORE_LIMIT && !expanded;
  const hashtagSegments = useMemo(() => parseContent(post.content), [post.content]);

  const effectiveReaction = reactionState.reaction ?? post.reaction;
  const effectiveSaved = reactionState.saved ?? post.saved;

  const comments = getComments(post.id);

  const hidePickerSoon = () => {
    if (pickerTimer.current) clearTimeout(pickerTimer.current);
    pickerTimer.current = setTimeout(() => setShowPicker(false), 120);
  };

  const showPickerFor = () => {
    if (pickerTimer.current) clearTimeout(pickerTimer.current);
    setShowPicker(true);
    pickerTimer.current = setTimeout(() => setShowPicker(false), 4000);
  };

  const handlePressLike = () => {
    if (showPicker) {
      setShowPicker(false);
      return;
    }
    if (!effectiveReaction) {
      reactionState.setReaction("like");
      setLikedPulse(true);
      setTimeout(() => setLikedPulse(false), 240);
    } else if (effectiveReaction === "like") {
      reactionState.setReaction(null);
    } else {
      reactionState.setReaction("like");
      setLikedPulse(true);
      setTimeout(() => setLikedPulse(false), 240);
    }
  };

  const handleOpenComments = () => {
    Keyboard.dismiss();
    setShowComments(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <PostHeader post={post} onOpenMore={onOpenMore} />

        {post.fromTopSeven && (
          <Animated.View entering={FadeIn.duration(300)} style={styles.top7Ribbon}>
            <Feather name="star" size={12} color="#f59e0b" />
            <Text style={styles.top7RibbonText}>From your Top 7</Text>
          </Animated.View>
        )}

        {post.kind === "achievement" && post.achievement && (
          <Animated.View entering={FadeIn.duration(300)} layout={Layout}>
            <AchievementCard achievement={post.achievement} authorColor={post.authorColor} />
          </Animated.View>
        )}

        {post.content && (
          <Animated.View entering={FadeIn.duration(300)} layout={Layout} style={styles.bodyWrap}>
            <Text style={styles.body}>
              {hashtagSegments.map((seg, idx) =>
                seg.type === "text" ? (
                  <Text key={idx}>{seg.value}</Text>
                ) : seg.type === "hashtag" ? (
                  <Text key={idx} style={styles.hashtag}>{seg.value}</Text>
                ) : (
                  <Text key={idx} style={styles.mention}>{seg.value}</Text>
                )
              )}
              {shouldCollapse && (
                <Text style={styles.seeMore} onPress={() => setExpanded(true)}>
                  {" "}See more
                </Text>
              )}
            </Text>
          </Animated.View>
        )}

        {post.media && post.media.length > 0 && (
          <Animated.View entering={FadeIn.duration(300)} layout={Layout}>
            <MediaGallery
              media={post.media}
              index={mediaIndex}
              setIndex={setMediaIndex}
              onOpen={(id) => setMediaViewerId(id)}
            />
          </Animated.View>
        )}

        {post.kind === "opportunity" && post.opportunity && (
          <Animated.View entering={FadeIn.duration(300)} layout={Layout}>
            <OpportunityBox
              job={post.opportunity}
              onPress={() => {}}
              applyLabel={
                post.opportunity.ctaLabel ?? "View Opportunity"
              }
              onApply={() => {}}
            />
          </Animated.View>
        )}

        <Animated.View entering={FadeIn.duration(300)} layout={Layout} style={styles.reactionWrap}>
          <ReactionRow
            reactionCounts={post.reactionCounts}
            currentReaction={effectiveReaction}
            totalComments={post.commentCount}
            totalShares={post.shares}
          />

          <View style={{ position: "relative" }}>
            <ReactionActionBar
              reaction={effectiveReaction}
              onPressReaction={handlePressLike}
              onLongPressReaction={showPickerFor}
              onPressComment={handleOpenComments}
              onPressShare={reactionState.onShare}
              saved={effectiveSaved}
              onPressSave={reactionState.onToggleSave}
            />
          </View>

          {showPicker && (
            <ReactionPicker
              currentReaction={effectiveReaction}
              onPick={(r) => {
                reactionState.setReaction(r);
                if (r === "like" || !r) {
                  setLikedPulse(true);
                  setTimeout(() => setLikedPulse(false), 240);
                }
                hidePickerSoon();
              }}
            />
          )}
        </Animated.View>

        {likedPulse && (
          <Animated.View
            entering={ZoomInPulse}
            exiting={FadeOut.duration(200)}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />
        )}

        <Animated.View entering={FadeIn.duration(300)} layout={Layout}>
          <Pressable
            style={styles.commentsTrigger}
            onPress={handleOpenComments}
            hitSlop={12}
          >
            <View style={styles.commentsTriggerRow}>
              <Ionicons name="chatbubble-outline" size={20} color="#64748b" />
              <Text style={styles.commentsTriggerText}>
                {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#94a3b8" />
            </View>
          </Pressable>
        </Animated.View>

        {showComments && (
          <>
            <CommentList
              postId={post.id}
              comments={comments}
              onAddComment={addComment}
              onLikeComment={toggleCommentLike}
              onUpdateComment={updateComment}
              onDeleteComment={deleteComment}
              onReport={reportPost}
            />
            <CommentComposer
              postId={post.id}
              onAddComment={addComment}
            />
          </>
        )}
      </ScrollView>

      {mediaViewerId && post.media && (
        <FullscreenViewer
          media={post.media}
          startId={mediaViewerId}
          onClose={() => setMediaViewerId(null)}
        />
      )}
    </View>
  );
}

function PostHeader({
  post,
  onOpenMore,
}: {
  post: Post;
  onOpenMore: (postId: string, authorId: string) => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.avatarWrap}
        onPress={() => {}}
        hitSlop={8}
      >
        <View style={[styles.avatar, { backgroundColor: post.authorColor + "24" }]}>
          <View style={[styles.avatarInner, { backgroundColor: post.authorColor }]}>
            <Text style={styles.avatarText}>{post.authorInitials}</Text>
          </View>
          {post.authorIsCompany ? (
            <View style={[styles.avatarBadge, styles.companyBadge]}>
              <Feather name="briefcase" size={9} color="#fff" />
            </View>
          ) : post.authorIsUniversity ? (
            <View style={[styles.avatarBadge, styles.universityBadge]}>
              <Feather name="book-open" size={9} color="#fff" />
            </View>
          ) : null}
        </View>
      </Pressable>
      <View style={styles.headerCopy}>
        <View style={styles.authorRow}>
          <Text style={styles.authorName} numberOfLines={1}>
            {post.authorName}
          </Text>
          {post.authorVerified && (
            <Ionicons name="checkmark-circle" size={14} color="#2563eb" />
          )}
        </View>
        <Text style={styles.authorHeadline} numberOfLines={1}>
          {post.authorRole}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.time}>{post.time}</Text>
          <View style={styles.metaDot} />
          <VisibilityDot visibility={post.visibility} />
        </View>
      </View>
      <Pressable
        hitSlop={8}
        onPress={() => onOpenMore(post.id, post.authorId)}
      >
        <Feather name="more-horizontal" size={22} color="#94a3b8" />
      </Pressable>
    </View>
  );
}

function VisibilityDot({ visibility }: { visibility: string }) {
  const meta = {
    public: { icon: "globe", label: "Anyone" },
    connections: { icon: "users", label: "Connections" },
    private: { icon: "lock", label: "Only me" },
  }[visibility] ?? { icon: "globe", label: "Anyone" };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      <Feather name={meta.icon} size={10} color="#94a3b8" />
      <Text style={styles.time}>{meta.label}</Text>
    </View>
  );
}

const ZoomInPulse = {
  animations: [
    {
      animation: "spring",
      config: { damping: 12, stiffness: 200, mass: 0.6 },
      values: { transform: [{ scale: [1, 1.04, 1] }] },
      initialValues: { transform: [{ scale: 1 }] },
    },
  ],
  initialValues: {},
} as any;

const FadeOut = {
  animations: [{ animation: "timing", config: { duration: 200 }, values: { opacity: 0 } }],
  initialValues: { opacity: 1 },
} as any;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 4,
  },
  avatarWrap: { marginRight: 10 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBadge: {
    position: "absolute",
    right: -1,
    bottom: -1,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  companyBadge: { backgroundColor: "#0f766e" },
  universityBadge: { backgroundColor: "#1d4ed8" },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  headerCopy: { flex: 1, marginRight: 8 },
  authorRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  authorName: { fontSize: 16, fontWeight: "800", color: "#0f172a" },
  authorHeadline: { marginTop: 2, fontSize: 13, color: "#64748b" },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6 },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "#cbd5e1" },
  time: { fontSize: 11, color: "#94a3b8", fontWeight: "600" },
  top7Ribbon: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#fffbeb",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  top7RibbonText: { fontSize: 11, fontWeight: "800", color: "#b45309" },
  bodyWrap: { marginTop: 2 },
  body: { fontSize: 15, lineHeight: 23, color: "#1e293b" },
  hashtag: { color: "#2563eb", fontWeight: "700" },
  mention: { color: "#7c3aed", fontWeight: "700" },
  seeMore: { color: "#2563eb", fontWeight: "700" },
  reactionWrap: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#e2e8f0", paddingTop: 8 },
  commentsTrigger: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    paddingBottom: 4,
  },
  commentsTriggerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  commentsTriggerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
});