import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useApp } from "@/context/app-provider";
import { buildPostsOnlyFeed, type FeedItem } from "@/lib/feed";
import { FeedPostCard } from "@/components/feed-post";
import { PostComposer } from "@/components/post-composer";
import { PostComments } from "@/components/post-comments";
import { PostMoreMenu, PostShareSheet } from "@/components/post-more-menu";
import { PostDetailModal } from "@/components/post-detail-modal";
import {
  CURRENT_USER,
  type PostKind,
  type PostVisibility,
  type Post,
} from "@/lib/data";

type SortTab = "latest" | "top";
type AuthorFilter = "all" | "mine" | "top7";

function SearchIconButton({ onPress }: { onPress: () => void }) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 80,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 0,
      duration: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    onPress();
  };

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const glowOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.searchIconBtn, { transform: [{ scale }] }]}>
        <Animated.View
          style={[
            styles.searchIconGlow,
            { opacity: glowOpacity },
          ]}
        />
        <Feather name="search" size={16} color="#2563eb" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default function PostsScreen() {
  const insets = useSafeAreaInsets();
  const {
    posts,
    createPost,
    getPost,
    getComments,
    addComment,
    toggleCommentLike,
    updateComment,
    deleteComment,
    reportPost,
  } = useApp();

  const [sort, setSort] = useState<SortTab>("latest");
  const [filter, setFilter] = useState<AuthorFilter>("all");
  const [search, setSearch] = useState("");
  const [composerVisible, setComposerVisible] = useState(false);
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
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const searchInputRef = useRef<TextInput>(null);
  const lastScrollY = useRef(0);
  const searchAnim = useRef(new Animated.Value(0)).current;
  const COLLAPSE_DISTANCE = 55;

  const { feedItems } = useMemo(() => {
    const allPosts = buildPostsOnlyFeed(posts);

    let list: FeedItem[] = allPosts.filter((it) => {
      if (it.type !== "post") return false;
      const mine = it.authorId === CURRENT_USER.id;
      const top7 = Boolean(it.fromTopSeven);
      const isCompany = Boolean(it.authorIsCompany);
      const isUniversity = Boolean(it.authorIsUniversity);
      return (mine || top7) && !isCompany && !isUniversity;
    });

    if (filter === "mine") {
      list = list.filter((it) => it.type === "post" && it.authorId === CURRENT_USER.id);
    } else if (filter === "top7") {
      list = list.filter((it) => it.type === "post" && it.fromTopSeven);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => {
        if (item.type !== "post") return false;
        return (
          item.content.toLowerCase().includes(q) ||
          item.authorName.toLowerCase().includes(q) ||
          (item.hashtags ?? []).some((h) => h.tag.toLowerCase().includes(q))
        );
      });
    }

    if (sort === "latest") {
      list = [...list].sort((a, b) => {
        const ta = a.type === "post" ? a.createdAt : 0;
        const tb = b.type === "post" ? b.createdAt : 0;
        return tb - ta;
      });
    }

    return {
      feedItems: list,
    };
  }, [sort, filter, posts, search]);

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

  const onScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = ev.nativeEvent.contentOffset.y;
    const prev = lastScrollY.current;

    let progress = 0;
    if (y > 10) {
      progress = Math.min(1, (y - 10) / (COLLAPSE_DISTANCE - 10));
    }
    searchAnim.setValue(progress);

    // Sync searchCollapsed state for pointerEvents
    if (progress > 0.5 && !searchCollapsed) {
      setSearchCollapsed(true);
    } else if (progress < 0.5 && searchCollapsed) {
      setSearchCollapsed(false);
    }

    lastScrollY.current = y;
  };

  const expandSearch = () => {
    Animated.timing(searchAnim, {
      toValue: 0,
      duration: 220,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start();
    setSearchCollapsed(false);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 240);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.top, { paddingTop: insets.top + 6 }]}>
        <View style={styles.topRow}>
          <View style={styles.titleWrap}>
            <View style={[styles.meDot, { backgroundColor: CURRENT_USER.color }]}>
              <Text style={styles.meDotText}>{CURRENT_USER.initials}</Text>
            </View>
            <View>
              <Text style={styles.title}>My Posts</Text>
              <Text style={styles.subtitle}>
                {CURRENT_USER.name.split(" ")[0]} + Top 7 network
              </Text>
            </View>
          </View>
          <View style={styles.topActions}>
            <Animated.View
              style={[
                styles.searchIconWrap,
                {
                  opacity: searchAnim,
                  transform: [
                    { scale: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) },
                  ],
                },
              ]}
              pointerEvents={searchCollapsed ? "auto" : "none"}
            >
              <SearchIconButton onPress={expandSearch} />
            </Animated.View>
            <Pressable
              style={styles.newPostBtn}
              onPress={() => {
                setEditing(null);
                setComposerVisible(true);
              }}
            >
              <Feather name="plus" size={14} color="#fff" />
              <Text style={styles.newPostText}>New post</Text>
            </Pressable>
          </View>
        </View>

        <Animated.View
          style={{
            height: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [48, 0] }),
            opacity: searchAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.35, 0] }),
            marginTop: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }),
            transform: [
              {
                translateY: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
            overflow: "hidden",
          }}
        >
          <View style={styles.searchBar}>
            <Feather name="search" size={15} color="#94a3b8" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search in your posts & Top 7…"
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </Animated.View>

        <View style={styles.switcher}>
          <View style={styles.switcherLeft}>
            {(["latest", "top"] as SortTab[]).map((t) => (
              <Pressable
                key={t}
                onPress={() => setSort(t)}
                style={[styles.switchItem, sort === t && styles.switchItemOn]}
              >
                <Feather
                  name={t === "latest" ? "clock" : "trending-up"}
                  size={13}
                  color={sort === t ? "#2563eb" : "#94a3b8"}
                />
                <Text style={[styles.switchText, sort === t && styles.switchTextOn]}>
                  {t === "latest" ? "Latest" : "Top"}
                </Text>
                {sort === t ? <View style={styles.switchUnderline} /> : null}
              </Pressable>
            ))}
          </View>
          <View style={styles.switcherRight}>
            {FILTERS.map((f) => (
              <Pressable
                key={f.id}
                onPress={() => setFilter(f.id)}
                style={[styles.filterChip, filter === f.id && styles.filterChipOn]}
              >
                <Feather
                  name={f.icon}
                  size={11}
                  color={filter === f.id ? "#ffffff" : "#475569"}
                />
                <Text style={[styles.filterLabel, filter === f.id && styles.filterLabelOn]}>
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2563eb"
            colors={["#2563eb"]}
          />
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
          <EmptyPosts sort={sort} filter={filter} hasSearch={search.trim().length > 0} />
        }
        contentContainerStyle={{ paddingBottom: 48 }}
      />

      <PostComposer
        visible={composerVisible}
        onClose={() => setComposerVisible(false)}
        editing={editing ?? undefined}
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

const FILTERS: { id: AuthorFilter; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: "all", label: "All", icon: "layers" },
  { id: "mine", label: "Mine", icon: "edit-3" },
  { id: "top7", label: "Top 7", icon: "star" },
];

function EmptyPosts({
  sort,
  filter,
  hasSearch,
}: {
  sort: SortTab;
  filter: AuthorFilter;
  hasSearch: boolean;
}) {
  let title = "Nothing in your personal posts yet";
  let text = "Your posts and updates from your Top 7 network will appear here.";

  if (hasSearch) {
    title = "No matches in your posts";
    text = "Try a different author, hashtag or keyword within your posts & Top 7.";
  } else if (filter === "mine") {
    title = "You haven't posted yet";
    text = "Tap 'New post' to share an achievement, opportunity or update.";
  } else if (filter === "top7") {
    title = "No Top 7 posts yet";
    text = "Your Top 7 connections haven't shared anything you can see yet.";
  } else if (sort === "latest") {
    title = "Be the first to share";
    text = "Create a new post to kick things off with your Top 7 network.";
  }

  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIconRing}>
        <Feather name="edit-3" size={28} color="#cbd5e1" />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  top: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  meDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  meDotText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 1,
  },
  newPostBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
  newPostText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#dbeafe",
    position: "relative",
    overflow: "hidden",
  },
  searchIconGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#2563eb",
    borderRadius: 18,
  },
  searchIconWrap: {
    width: 36,
    height: 36,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1f5f9",
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
  },
  switcher: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: -4,
  },
  switcherLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  switcherRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  switchItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    position: "relative",
  },
  switchItemOn: {
    backgroundColor: "transparent",
  },
  switchText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94a3b8",
  },
  switchTextOn: {
    color: "#2563eb",
    fontWeight: "800",
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
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterChipOn: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  filterLabelOn: {
    color: "#ffffff",
  },
  emptyWrap: {
    alignItems: "center",
    paddingTop: 72,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
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
    lineHeight: 19,
  },
});
