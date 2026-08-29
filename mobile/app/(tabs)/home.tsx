import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { useApp } from "@/context/app-provider";
import { buildFeed, buildFollowingFeed, type FeedItem } from "@/lib/feed";
import { FeedPostCard } from "@/components/feed-post";
import { PostComposer } from "@/components/post-composer";
import { CreatePostModal } from "@/components/create-post-modal";
import { PostComments } from "@/components/post-comments";
import { PostMoreMenu, PostShareSheet } from "@/components/post-more-menu";
import { PostDetailModal } from "@/components/post-detail-modal";
import { CURRENT_USER, type PostKind, type PostVisibility, type Post } from "@/lib/data";

type TabKind = "foryou" | "following";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    posts,
    connectedIds,
    createPost,
    getPost,
    unreadNotifications,
    getComments,
    addComment,
    toggleCommentLike,
    updateComment,
    deleteComment,
    reportPost,
  } = useApp();

  const [tab, setTab] = useState<TabKind>("foryou");
  const [search, setSearch] = useState("");
  const [composerVisible, setComposerVisible] = useState(false);
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [editing, setEditing] = useState<null | {
    id: string;
    content: string;
    kind: PostKind;
    visibility: PostVisibility;
  }>(null);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const [moreFor, setMoreFor] = useState<{ id: string; authorId: string } | null>(null);
  const [shareFor, setShareFor] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailPost, setDetailPost] = useState<Post | null>(null);

  const feedItems: FeedItem[] = useMemo(() => {
    const base = tab === "foryou" ? buildFeed(posts) : buildFollowingFeed(posts, connectedIds);
    if (!search.trim()) return base;
    const q = search.trim().toLowerCase();
    return base.filter((item) => {
      if (item.type !== "post") return false;
      return (
        item.content.toLowerCase().includes(q) ||
        item.authorName.toLowerCase().includes(q) ||
        (item.hashtags ?? []).some((h) => h.tag.toLowerCase().includes(q))
      );
    });
  }, [tab, posts, connectedIds, search]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const openEdit = (postId: string) => {
    const p = getPost(postId);
    if (!p) return;
    setEditing({ id: p.id, content: p.content, kind: p.kind, visibility: p.visibility });
    setComposerVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.top, { paddingTop: insets.top + 6 }]}>
        <View style={styles.topRow}>
          <View style={[styles.meAvatar, { backgroundColor: CURRENT_USER.color }]}>
            <Text style={styles.meInitials}>{CURRENT_USER.initials}</Text>
          </View>
          <View style={styles.searchBar}>
            <Feather name="search" size={16} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search CareerLink"
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <Pressable style={styles.bell} hitSlop={8} onPress={() => router.push("/notifications")}>
            <Feather name="bell" size={22} color="#0f172a" />
            {unreadNotifications > 0 ? <View style={styles.bellDot} /> : null}
          </Pressable>
        </View>

        <View style={styles.switcher}>
          {(["foryou", "following"] as TabKind[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.switchItem, tab === t && styles.switchItemOn]}
            >
              <Text style={[styles.switchText, tab === t && styles.switchTextOn]}>
                {t === "foryou" ? "For you" : "Following"}
              </Text>
              {tab === t ? <View style={styles.switchUnderline} /> : null}
            </Pressable>
          ))}
          <View style={styles.switchSpacer} />
        </View>
      </View>

      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2563eb"
            colors={["#2563eb"]}
          />
        }
        ListHeaderComponent={
          <Animated.View entering={FadeIn.duration(200)} layout={Layout}>
            <View style={styles.composer}>
              <View style={[styles.meAvatarSmall, { backgroundColor: CURRENT_USER.color }]}>
                <Text style={styles.meInitialsSmall}>{CURRENT_USER.initials}</Text>
              </View>
              <Pressable
                style={styles.composerInput}
                onPress={() => { setEditing(null); setCreatePostModalVisible(true); }}
              >
                <Text style={styles.composerPlaceholder}>Start a post, {CURRENT_USER.name.split(" ")[0]}…</Text>
              </Pressable>
              <Pressable
                style={styles.composerPhoto}
                onPress={() => { setEditing(null); setCreatePostModalVisible(true); }}
              >
                <Feather name="image" size={18} color="#2563eb" />
              </Pressable>
            </View>
            <View style={styles.quickRow}>
              {QUICK.map((item) => (
                <Pressable
                  key={item.label}
                  style={styles.quickChip}
                  onPress={() => router.push("/(tabs)/explore")}
                >
                  <Feather name={item.icon} size={14} color="#2563eb" />
                  <Text style={styles.quickLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        }
        renderItem={({ item }) => (
          <FeedPostCard
            item={item}
            onOpenComments={(id) => setCommentsFor(id)}
            onOpenShare={(id) => setShareFor(id)}
            onOpenMore={(id, authorId) => setMoreFor({ id, authorId })}
            onOpenDetail={(post) => setDetailPost(post)}
            onEdit={openEdit}
          />
        )}
        ListEmptyComponent={
          <EmptyFeed tab={tab} />
        }
        contentContainerStyle={{ paddingBottom: 48 }}
      />

      <PostComposer
        visible={composerVisible}
        onClose={() => setComposerVisible(false)}
        editing={editing ?? undefined}
      />
      <CreatePostModal
        visible={createPostModalVisible}
        onClose={() => setCreatePostModalVisible(false)}
        onSuccess={() => console.log("Post created successfully")}
        onError={(error) => console.error("Failed to create post:", error)}
      />
      {commentsFor ? (
        <PostComments
          postId={commentsFor}
          visible
          onClose={() => setCommentsFor(null)}
        />
      ) : null}
      {moreFor ? (
        <PostMoreMenu
          visible
          onClose={() => setMoreFor(null)}
          postId={moreFor.id}
          authorId={moreFor.authorId}
          onEdit={() => {
            setMoreFor(null);
            openEdit(moreFor.id);
          }}
        />
      ) : null}
      {shareFor ? (
        <PostShareSheet
          visible
          onClose={() => setShareFor(null)}
          onRepost={() => {
            const p = getPost(shareFor);
            if (p) {
              createPost({
                content: p.content,
                kind: p.kind,
                visibility: "public",
              });
            }
          }}
          onShareWithComment={() => {
            const p = getPost(shareFor);
            if (p) {
              setEditing(null);
              setComposerVisible(true);
            }
          }}
        />
      ) : null}
      <PostDetailModal
        post={detailPost}
        visible={!!detailPost}
        onClose={() => setDetailPost(null)}
        onOpenShare={(id) => setShareFor(id)}
        onOpenMore={(id, authorId) => setMoreFor({ id, authorId })}
        reactionState={{
          reaction: detailPost?.reaction,
          setReaction: (r) => detailPost && r && detailPost.id && setDetailPost({ ...detailPost, reaction: r }),
          saved: detailPost?.saved ?? false,
          onToggleSave: () => {},
          onShare: () => {},
        }}
        getComments={getComments}
        addComment={addComment}
        toggleCommentLike={toggleCommentLike}
        updateComment={updateComment}
        deleteComment={deleteComment}
        reportPost={reportPost}
      />
    </View>
  );
}

function EmptyFeed({ tab }: { tab: TabKind }) {
  return (
    <View style={styles.emptyWrap}>
      <Feather name="inbox" size={44} color="#cbd5e1" />
      <Text style={styles.emptyTitle}>
        {tab === "following" ? "Connect with more people" : "No posts match your search"}
      </Text>
      <Text style={styles.emptyText}>
        {tab === "following"
          ? "Posts from your network will appear here."
          : "Try searching for a hashtag, person or topic."}
      </Text>
    </View>
  );
}

const QUICK = [
  { icon: "briefcase" as const, label: "Jobs" },
  { icon: "award" as const, label: "Internships" },
  { icon: "users" as const, label: "Network" },
  { icon: "calendar" as const, label: "Events" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  top: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  meAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  meInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  searchBar: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
  },
  bell: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  switcher: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: -4,
  },
  switchItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    position: "relative",
  },
  switchItemOn: {
    backgroundColor: "transparent",
  },
  switchUnderline: {
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 12,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "#2563eb",
  },
  switchSpacer: {
    flex: 1,
  },
  switchText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#94a3b8",
  },
  switchTextOn: {
    color: "#0f172a",
    fontWeight: "800",
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 8,
    borderBottomColor: "#f1f5f9",
  },
  meAvatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  meInitialsSmall: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  composerInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  composerPlaceholder: {
    color: "#94a3b8",
    fontSize: 14,
  },
  composerPhoto: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  quickRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 8,
    borderBottomColor: "#f1f5f9",
  },
  quickChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },
  emptyWrap: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
    marginTop: 8,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 320,
  },
});
