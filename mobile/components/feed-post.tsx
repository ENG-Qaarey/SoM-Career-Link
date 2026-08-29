import { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import type { FeedItem } from "@/lib/feed";
import { CURRENT_USER, type Post, type ReactionType } from "@/lib/data";
import { useApp } from "@/context/app-provider";
import {
  ReactionActionBar,
  ReactionPicker,
  ReactionRow,
} from "@/components/reaction-picker";
import {
  MediaGallery,
  FullscreenViewer,
  AchievementCard,
  OpportunityBox,
  parseContent,
} from "./post-shared";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SEE_MORE_LIMIT = 200;

type FeedPostCardProps = {
  item: FeedItem;
  onOpenComposer?: () => void;
  onOpenComments: (postId: string) => void;
  onOpenShare: (postId: string) => void;
  onOpenMore: (postId: string, authorId: string) => void;
  onOpenDetail?: (post: any) => void;
  onEdit?: (postId: string) => void;
};

const ACHIEVEMENT_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  graduation: "book-open",
  new_job: "briefcase",
  internship: "compass",
  certificate: "award",
  promotion: "trending-up",
  competition: "award",
  project: "zap",
};

export function FeedPostCard({
  item,
  onOpenComments,
  onOpenShare,
  onOpenMore,
  onOpenDetail,
  onEdit,
}: FeedPostCardProps) {
  const {
    setPostReaction,
    togglePostSave,
    sharePost,
    addConnection,
    connectedIds,
    applyTo,
    hasApplied,
    getOpportunity,
  } = useApp();

  if (item.type === "suggested_people") {
    return (
      <CardWrapper>
        <View style={styles.peopleHeader}>
          <View>
            <Text style={styles.peopleTitle}>People you may know</Text>
            <Text style={styles.peopleHint}>Grow your professional network</Text>
          </View>
          <Ionicons name="people-outline" size={22} color="#2563eb" />
        </View>
        {(item.people ?? []).map((person) => {
          const connected = connectedIds.has(person.id);
          return (
            <View key={person.id} style={styles.personRow}>
              <View style={[styles.avatar, { backgroundColor: person.color }]}>
                <Text style={styles.avatarText}>{person.initials}</Text>
              </View>
              <View style={styles.personCopy}>
                <Text style={styles.authorName}>{person.name}</Text>
                <Text style={styles.authorHeadline} numberOfLines={1}>
                  {person.headline}
                </Text>
              </View>
              <Pressable
                onPress={() => addConnection(person.id)}
                style={[styles.connectBtn, connected && styles.connectBtnOn]}
              >
                <Text style={[styles.connectText, connected && styles.connectTextOn]}>
                  {connected ? "Added" : "Connect"}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </CardWrapper>
    );
  }

  if (item.type === "trending") {
    return (
      <CardWrapper>
        <View style={styles.peopleHeader}>
          <View>
            <Text style={styles.peopleTitle}>Trending topics</Text>
            <Text style={styles.peopleHint}>Explore the professional conversation</Text>
          </View>
          <Feather name="trending-up" size={20} color="#2563eb" />
        </View>
        <View style={styles.trendingGrid}>
          {(item.topics ?? []).map((t, idx) => (
            <Pressable key={t.tag} style={styles.trendingChip}>
              <View style={styles.trendingRank}>
                <Text style={styles.trendingRankText}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.trendingTag}>{t.tag}</Text>
                <Text style={styles.trendingCount}>{t.posts.toLocaleString()} posts</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </CardWrapper>
    );
  }

  if (item.type === "opportunity_promo") {
    return (
      <CardWrapper>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: item.author.color }]}>
            <Text style={styles.avatarText}>{item.author.initials}</Text>
          </View>
          <View style={styles.headerCopy}>
            <View style={styles.authorRow}>
              <Text style={styles.authorName}>{item.author.name}</Text>
            </View>
            <Text style={styles.authorHeadline} numberOfLines={1}>
              {item.author.headline}
            </Text>
            <Text style={styles.time}>Promoted · {item.time}</Text>
          </View>
        </View>
        <Text style={styles.body}>{item.text}</Text>
        <OpportunityBox
          job={item.job}
          onPress={() => {}}
          applyLabel={hasApplied(item.job.opportunityId) ? "Applied" : "View"}
          onApply={() => applyTo(item.job.opportunityId)}
        />
      </CardWrapper>
    );
  }

  return (
    <PostCard
      post={item}
      onOpenComments={onOpenComments}
      onOpenShare={onOpenShare}
      onOpenMore={onOpenMore}
      onOpenDetail={onOpenDetail}
      onEdit={onEdit}
      reactionState={{
        reaction: item.reaction,
        setReaction: (r) => setPostReaction(item.id.replace(/^feed-/, ""), r),
        saved: item.saved,
        onToggleSave: () => togglePostSave(item.id.replace(/^feed-/, "")),
        onShare: () => {
          sharePost(item.id.replace(/^feed-/, ""));
          onOpenShare(item.id.replace(/^feed-/, ""));
        },
      }}
      getOpportunity={getOpportunity}
      applyTo={applyTo}
      hasApplied={hasApplied}
    />
  );
}

type PostCardInnerProps = {
  post: Post;
  onOpenComments: (postId: string) => void;
  onOpenShare: (postId: string) => void;
  onOpenMore: (postId: string, authorId: string) => void;
  onOpenDetail?: (post: Post) => void;
  onEdit?: (postId: string) => void;
  reactionState: {
    reaction?: ReactionType;
    setReaction: (r: ReactionType | null) => void;
    saved: boolean;
    onToggleSave: () => void;
    onShare: () => void;
  };
  getOpportunity: (id?: string) => any;
  applyTo: (id: string) => void;
  hasApplied: (id: string) => boolean;
  compact?: boolean;
};

export function PostCard(props: PostCardInnerProps) {
  const {
    post,
    onOpenComments,
    onOpenShare,
    onOpenMore,
    onOpenDetail,
    onEdit,
    reactionState,
    getOpportunity,
    applyTo,
    hasApplied,
    compact,
  } = props;
  void onOpenShare;
  void getOpportunity;

  const [expanded, setExpanded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaViewerId, setMediaViewerId] = useState<string | null>(null);
  const [likedPulse, setLikedPulse] = useState(false);
  const pickerTimer = useRef<any>(null);

  const shouldCollapse = post.content.length > SEE_MORE_LIMIT && !expanded;

  const hashtagSegments = useMemo(() => parseContent(post.content), [post.content]);

  const effectiveReaction = reactionState.reaction ?? post.reaction;
  const effectiveSaved = reactionState.saved ?? post.saved;

  const hidePickerSoon = () => {
    clearTimeout(pickerTimer.current);
    pickerTimer.current = setTimeout(() => setShowPicker(false), 120);
  };

  const showPickerFor = () => {
    clearTimeout(pickerTimer.current);
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

  return (
    <Pressable onPress={() => onOpenDetail?.(post)} style={{ flex: 1 }}>
      <CardWrapper compact={compact}>
        {post.fromTopSeven ? (
        <Animated.View entering={FadeIn.duration(300)} style={styles.top7Ribbon}>
          <Feather name="star" size={12} color="#f59e0b" />
          <Text style={styles.top7RibbonText}>From your Top 7</Text>
        </Animated.View>
      ) : null}

      <View style={styles.header}>
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
        <View style={styles.headerCopy}>
          <View style={styles.authorRow}>
            <Text style={styles.authorName} numberOfLines={1}>
              {post.authorName}
            </Text>
            {post.authorVerified ? (
              <Ionicons name="checkmark-circle" size={14} color="#2563eb" />
            ) : null}
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
          onLongPress={() => onEdit && post.authorId === CURRENT_USER.id && onEdit(post.id)}
          delayLongPress={300}
        >
          <Feather name="more-horizontal" size={20} color="#94a3b8" />
        </Pressable>
      </View>

      {post.kind === "achievement" && post.achievement ? (
        <AchievementCard achievement={post.achievement} authorColor={post.authorColor} />
      ) : null}

      {post.content ? (
        <Text style={[styles.body, compact && styles.bodyCompact]}>
          {hashtagSegments.map((seg, idx) =>
            seg.type === "text" ? (
              <Text key={idx}>{seg.value}</Text>
            ) : seg.type === "hashtag" ? (
              <Text key={idx} style={styles.hashtag}>
                {seg.value}
              </Text>
            ) : (
              <Text key={idx} style={styles.mention}>
                {seg.value}
              </Text>
            )
          )}
          {shouldCollapse ? (
            <Text style={styles.seeMore} onPress={() => setExpanded(true)}>
              {" "}See more
            </Text>
          ) : null}
        </Text>
      ) : null}

      {post.media && post.media.length > 0 ? (
        <MediaGallery
          media={post.media}
          index={mediaIndex}
          setIndex={setMediaIndex}
          onOpen={(id) => setMediaViewerId(id)}
        />
      ) : null}

      {post.kind === "opportunity" && post.opportunity ? (
        <OpportunityBox
          job={post.opportunity}
          onPress={() => {}}
          applyLabel={
            hasApplied(post.opportunity.opportunityId)
              ? "Applied"
              : post.opportunity.ctaLabel ?? "View Opportunity"
          }
          onApply={() => applyTo(post.opportunity!.opportunityId)}
        />
      ) : null}

      <ReactionRow
        reactionCounts={post.reactionCounts}
        currentReaction={effectiveReaction}
        totalComments={post.commentCount}
        totalShares={post.shares}
      />

      <View style={{ position: "relative" }}>
        <ReactionPicker
          visible={showPicker}
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
        <ReactionActionBar
          reaction={effectiveReaction}
          onPressReaction={handlePressLike}
          onLongPressReaction={showPickerFor}
          onPressComment={() => onOpenComments(post.id)}
          onPressShare={reactionState.onShare}
          saved={effectiveSaved}
          onPressSave={reactionState.onToggleSave}
        />
      </View>

      {likedPulse ? (
        <Animated.View
          entering={ZoomInPulse}
          exiting={FadeOut.duration(200)}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      {mediaViewerId && post.media ? (
        <FullscreenViewer
          media={post.media}
          startId={mediaViewerId}
          onClose={() => setMediaViewerId(null)}
        />
      ) : null}
    </CardWrapper>
  </Pressable>
);
}

const ZoomInPulse = {
  animations: [
    {
      animation: "spring",
      config: { damping: 12, stiffness: 200, mass: 0.6 },
      values: {
        transform: [{ scale: [1, 1.04, 1] }],
      },
      initialValues: { transform: [{ scale: 1 }] },
    },
  ],
  initialValues: {},
} as any;

function CardWrapper({
  children,
  compact,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(260).springify().damping(18).stiffness(120)}
      layout={Layout.springify().damping(20).stiffness(130)}
      style={[styles.card, compact && styles.cardCompact]}
    >
      {children}
    </Animated.View>
  );
}

function VisibilityDot({ visibility }: { visibility: string }) {
  const meta = {
    public: { icon: "globe" as const, label: "Anyone" },
    connections: { icon: "users" as const, label: "Connections" },
    private: { icon: "lock" as const, label: "Only me" },
  }[visibility] ?? { icon: "globe" as const, label: "Anyone" };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      <Feather name={meta.icon} size={10} color="#94a3b8" />
      <Text style={styles.time}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 2,
    borderBottomWidth: 8,
    borderBottomColor: "#f1f5f9",
  },
  cardCompact: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eef2f7",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  top7Ribbon: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fffbeb",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fde68a",
    marginBottom: 10,
  },
  top7RibbonText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#b45309",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
  companyBadge: {
    backgroundColor: "#0f766e",
  },
  universityBadge: {
    backgroundColor: "#1d4ed8",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  headerCopy: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  authorName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  authorHeadline: {
    marginTop: 1,
    fontSize: 12,
    color: "#64748b",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 6,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#cbd5e1",
  },
  time: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
  },
  body: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#1e293b",
  },
  bodyCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
  hashtag: {
    color: "#2563eb",
    fontWeight: "700",
  },
  mention: {
    color: "#7c3aed",
    fontWeight: "700",
  },
  seeMore: {
    color: "#2563eb",
    fontWeight: "700",
  },
  peopleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 12,
  },
  peopleTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  peopleHint: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  personCopy: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  connectBtn: {
    borderWidth: 1.5,
    borderColor: "#2563eb",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  connectBtnOn: {
    backgroundColor: "#2563eb",
  },
  connectText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },
  connectTextOn: {
    color: "#ffffff",
  },
  trendingGrid: {
    gap: 4,
    marginTop: 6,
  },
  trendingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  trendingRank: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  trendingRankText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563eb",
  },
  trendingTag: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  trendingCount: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});
