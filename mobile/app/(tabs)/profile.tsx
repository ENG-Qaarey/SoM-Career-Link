import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { ScreenHeader } from "@/components/screen-header";
import { useApp } from "@/context/app-provider";
import { TOP_SEVEN, CURRENT_USER, type PostKind, type PostVisibility } from "@/lib/data";
import { PostCard } from "@/components/feed-post";
import { PostComposer } from "@/components/post-composer";
import { PostComments } from "@/components/post-comments";
import { PostMoreMenu } from "@/components/post-more-menu";

const SKILLS = ["JavaScript", "React Native", "UI/UX", "Teamwork"];

export default function ProfileScreen() {
  const router = useRouter();
  const {
    applications,
    savedPostIds,
    getMyPosts,
    getPost,
    setPostReaction,
    togglePostSave,
    sharePost,
    applyTo,
    hasApplied,
    getOpportunity,
  } = useApp();

  const [composerVisible, setComposerVisible] = useState(false);
  const [editing, setEditing] = useState<null | {
    id: string;
    content: string;
    kind: PostKind;
    visibility: PostVisibility;
  }>(null);
  const [commentsFor, setCommentsFor] = useState<string | null>(null);
  const [moreFor, setMoreFor] = useState<{ id: string; authorId: string } | null>(null);

  const myPosts = getMyPosts();

  const openEdit = (postId: string) => {
    const p = getPost(postId);
    if (!p) return;
    setEditing({ id: p.id, content: p.content, kind: p.kind, visibility: p.visibility });
    setComposerVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.portrait, { backgroundColor: CURRENT_USER.color }]}>
            <Text style={styles.portraitText}>{CURRENT_USER.initials}</Text>
          </View>
          <Text style={styles.name}>{CURRENT_USER.name}</Text>
          <Text style={styles.headline}>Software Engineering Student</Text>
          <Text style={styles.meta}>Jazeera University · Mogadishu, Somalia</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{applications.length}</Text>
              <Text style={styles.statLabel}>Applications</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{savedPostIds.length}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Top 7</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{myPosts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>Top 7</Text>
        <Text style={styles.sectionHint}>Seven important people in {CURRENT_USER.name.split(" ")[0]}&apos;s network</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.top7}>
          {TOP_SEVEN.map((person, i) => (
            <View key={person.id} style={styles.top7Card}>
              <View style={[styles.top7Avatar, { backgroundColor: person.color }]}>
                <Text style={styles.top7Initials}>{person.initials}</Text>
              </View>
              <Text style={styles.top7Name} numberOfLines={1}>
                {person.name.split(" ")[0]}
              </Text>
              <Text style={styles.top7Role} numberOfLines={1}>
                {person.role}
              </Text>
              <Text style={styles.top7Index}>{i + 1}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.section}>About</Text>
        <Text style={styles.about}>
          Computer science student focused on frontend and mobile. Looking for internships
          and graduate programs across Somalia.
        </Text>

        <Text style={styles.section}>Skills</Text>
        <View style={styles.skills}>
          {SKILLS.map((skill) => (
            <View key={skill} style={styles.pill}>
              <Text style={styles.pillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Education</Text>
        <View style={styles.block}>
          <Text style={styles.blockTitle}>BSc Computer Science</Text>
          <Text style={styles.blockMeta}>Jazeera University · 2023 – 2027</Text>
        </View>

        <Text style={styles.section}>CV</Text>
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Ahmed_Hassan_CV.pdf</Text>
          <Text style={styles.blockMeta}>Uploaded for applications</Text>
        </View>

        <View style={styles.postsHeader}>
          <Text style={styles.section}>Posts</Text>
          <Pressable
            onPress={() => { setEditing(null); setComposerVisible(true); }}
            style={styles.newPostBtn}
          >
            <Feather name="plus" size={14} color="#fff" />
            <Text style={styles.newPostText}>New</Text>
          </Pressable>
        </View>
        {myPosts.length === 0 ? (
          <View style={styles.emptyPosts}>
            <Feather name="edit-3" size={32} color="#cbd5e1" />
            <Text style={styles.emptyPostsTitle}>No posts yet</Text>
            <Text style={styles.emptyPostsHint}>Share an achievement, opportunity or update with your network.</Text>
            <Pressable
              style={styles.emptyPostsBtn}
              onPress={() => { setEditing(null); setComposerVisible(true); }}
            >
              <Text style={styles.emptyPostsBtnText}>Create your first post</Text>
            </Pressable>
          </View>
        ) : (
          <Animated.View layout={Layout} style={{ gap: 12 }}>
            {myPosts.map((post) => (
              <Animated.View key={post.id} entering={FadeIn.duration(220)}>
                <PostCard
                  post={post}
                  compact
                  onOpenComments={(id) => setCommentsFor(id)}
                  onOpenShare={(id) => { sharePost(id); }}
                  onOpenMore={(id, authorId) => setMoreFor({ id, authorId })}
                  onEdit={openEdit}
                  reactionState={{
                    reaction: post.reaction,
                    setReaction: (r) => setPostReaction(post.id, r),
                    saved: savedPostIds.includes(post.id),
                    onToggleSave: () => togglePostSave(post.id),
                    onShare: () => sharePost(post.id),
                  }}
                  getOpportunity={getOpportunity}
                  applyTo={applyTo}
                  hasApplied={hasApplied}
                />
              </Animated.View>
            ))}
          </Animated.View>
        )}

        <Pressable style={styles.menu} onPress={() => router.push("/notifications")}>
          <Feather name="bell" size={18} color="#2563eb" />
          <Text style={styles.menuLabel}>Notifications</Text>
          <Feather name="chevron-right" size={18} color="#94a3b8" />
        </Pressable>
        <Pressable style={styles.menu} onPress={() => router.replace("/")}>
          <Feather name="log-out" size={18} color="#ef4444" />
          <Text style={[styles.menuLabel, { color: "#ef4444" }]}>Logout</Text>
        </Pressable>
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 16, paddingBottom: 40 },
  hero: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  portrait: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  portraitText: { color: "#fff", fontSize: 24, fontWeight: "800" },
  name: { marginTop: 12, fontSize: 20, fontWeight: "800", color: "#0f172a" },
  headline: { marginTop: 4, fontSize: 14, color: "#64748b" },
  meta: { marginTop: 4, fontSize: 12, color: "#94a3b8" },
  stats: { flexDirection: "row", marginTop: 18, width: "100%" },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  statLabel: { fontSize: 11, color: "#64748b", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#e2e8f0" },
  section: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  sectionHint: { fontSize: 12, color: "#64748b", marginTop: -4, marginBottom: 10 },
  top7: { gap: 10, paddingRight: 8 },
  top7Card: {
    width: 92,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  top7Avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  top7Initials: { color: "#fff", fontWeight: "800", fontSize: 13 },
  top7Name: { marginTop: 8, fontSize: 12, fontWeight: "700", color: "#0f172a" },
  top7Role: { marginTop: 2, fontSize: 10, color: "#64748b", textAlign: "center" },
  top7Index: { marginTop: 6, fontSize: 10, fontWeight: "800", color: "#2563eb" },
  about: { fontSize: 14, lineHeight: 21, color: "#334155" },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: { color: "#2563eb", fontWeight: "700", fontSize: 12 },
  block: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  blockTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  blockMeta: { marginTop: 4, fontSize: 12, color: "#64748b" },
  postsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 8,
  },
  newPostBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  newPostText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyPosts: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eef2f7",
    gap: 6,
  },
  emptyPostsTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 8,
  },
  emptyPostsHint: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 280,
  },
  emptyPostsBtn: {
    marginTop: 10,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  emptyPostsBtnText: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 13,
  },
  menu: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#0f172a" },
});
