import { useState, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CURRENT_USER, OPPORTUNITIES, type PostKind, type PostVisibility } from "@/lib/data";
import { useApp } from "@/context/app-provider";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const KIND_OPTIONS: {
  id: PostKind;
  label: string;
  icon: "message-square" | "image" | "video" | "award" | "briefcase";
  accent: string;
}[] = [
  { id: "text", label: "Post", icon: "message-square", accent: "#eff6ff" },
  { id: "image", label: "Photo", icon: "image", accent: "#ecfdf5" },
  { id: "video", label: "Video", icon: "video", accent: "#fef3c7" },
  { id: "achievement", label: "Achievement", icon: "award", accent: "#fdf2f8" },
  { id: "opportunity", label: "Opportunity", icon: "briefcase", accent: "#eff6ff" },
];

const VISIBILITY_OPTIONS: { id: PostVisibility; label: string; icon: "globe" | "users" | "lock" }[] = [
  { id: "public", label: "Anyone", icon: "globe" },
  { id: "connections", label: "Connections", icon: "users" },
  { id: "private", label: "Only me", icon: "lock" },
];

const MAX_CHARS = 1300;

type PostComposerProps = {
  visible: boolean;
  onClose: () => void;
  editing?: { id: string; content: string; kind: PostKind; visibility: PostVisibility } | null;
};

export function PostComposer({ visible, onClose, editing }: PostComposerProps) {
  const { createPost, updatePost } = useApp();
  const [content, setContent] = useState(editing?.content ?? "");
  const [kind, setKind] = useState<PostKind>(editing?.kind ?? "text");
  const [visibility, setVisibility] = useState<PostVisibility>(editing?.visibility ?? "public");
  const [showVisibilityPicker, setShowVisibilityPicker] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [attachedOpportunityId, setAttachedOpportunityId] = useState<string | null>(null);
  const [showOppPicker, setShowOppPicker] = useState(false);
  const [achievementTitle, setAchievementTitle] = useState("");

  const isEdit = !!editing;
  const trimmed = content.trim();
  const canPost =
    trimmed.length > 0 ||
    mediaUrls.length > 0 ||
    (kind === "opportunity" && attachedOpportunityId) ||
    (kind === "achievement" && achievementTitle.trim().length > 0);

  const translateY = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const reset = () => {
    setContent("");
    setKind("text");
    setVisibility("public");
    setMediaUrls([]);
    setAttachedOpportunityId(null);
    setAchievementTitle("");
    setShowOppPicker(false);
    setShowVisibilityPicker(false);
  };

  const close = () => {
    translateY.value = withTiming(0, { duration: 200 }, () => {
      isDismissing.value = false;
      runOnJS(reset)();
      runOnJS(onClose)();
    });
  };

  const confirmClose = () => {
    if (trimmed.length > 0 || mediaUrls.length > 0 || achievementTitle) {
      Alert.alert("Discard post?", "Your changes will not be saved.", [
        { text: "Keep editing", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: close },
      ]);
    } else {
      close();
    }
  };

  const handleSubmit = () => {
    if (!canPost) return;
    if (isEdit) {
      updatePost(editing.id, { content: trimmed, kind, visibility });
    } else {
      const media =
        mediaUrls.length > 0
          ? mediaUrls.map((url, idx) => ({
              id: `media-${Date.now()}-${idx}`,
              type: kind === "video" ? ("video" as const) : ("image" as const),
              url,
              accent: "#eff6ff",
            }))
          : undefined;
      const opportunity =
        kind === "opportunity" && attachedOpportunityId
          ? (() => {
              const opp = OPPORTUNITIES.find((o) => o.id === attachedOpportunityId);
              if (!opp) return undefined;
              return {
                opportunityId: opp.id,
                title: opp.title,
                company: opp.company,
                location: opp.location,
                type: opp.type,
                ctaLabel: opp.type === "Event" ? "View Event" : "View Opportunity",
              };
            })()
          : undefined;
      const achievement =
        kind === "achievement" && achievementTitle.trim()
          ? { kind: "project" as const, title: achievementTitle.trim() }
          : undefined;
      createPost({ content: trimmed, kind, visibility, media, opportunity, achievement });
    }
    close();
  };

  const panGesture = useMemo(() => {
    const gesture = Gesture.Pan()
      .onStart((_, ctx: any) => {
        ctx.startY = translateY.value;
      })
      .onUpdate((event, ctx: any) => {
        const translation = (ctx.startY ?? 0) + event.translationY;
        if (translation > 0) {
          translateY.value = translation;
        }
      })
      .onEnd((event) => {
        const velocity = event.velocityY;
        const shouldDismiss = translateY.value > 100 || velocity > 500;
        if (shouldDismiss) {
          isDismissing.value = true;
          translateY.value = withTiming(300, { duration: 200 }, () => {
            runOnJS(confirmClose)();
          });
        } else {
          translateY.value = withSpring(0, { damping: 20, stiffness: 150 });
        }
      });
    return gesture;
  }, []);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.overlay}
      keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
    >
      <Pressable style={styles.backdrop} onPress={confirmClose} />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.sheetHeader}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Pressable onPress={confirmClose} hitSlop={8}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Text style={styles.title}>{isEdit ? "Edit post" : "Create a post"}</Text>
            <Pressable
              onPress={handleSubmit}
              disabled={!canPost}
              style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
            >
              <Text style={[styles.postBtnText, !canPost && styles.postBtnTextDisabled]}>
                {isEdit ? "Save" : "Post"}
              </Text>
            </Pressable>
          </View>
        </View>

        {showOppPicker ? (
          <View style={styles.pickerWrap}>
            <View style={styles.pickerHeader}>
              <Pressable
                style={styles.pickerBack}
                onPress={() => setShowOppPicker(false)}
              >
                <Feather name="arrow-left" size={16} color="#2563eb" />
                <Text style={styles.pickerBackText}>Back</Text>
              </Pressable>
              <Text style={styles.pickerTitle}>Attach an opportunity</Text>
              <View style={{ width: 44 }} />
            </View>
            <ScrollView
              style={styles.pickerList}
              contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
              showsVerticalScrollIndicator={false}
            >
              {OPPORTUNITIES.map((o) => (
                <Pressable
                  key={o.id}
                  onPress={() => {
                    setAttachedOpportunityId(o.id);
                    setShowOppPicker(false);
                  }}
                  style={[
                    styles.oppItem,
                    attachedOpportunityId === o.id && styles.oppItemActive,
                  ]}
                >
                  <View style={[styles.oppAvatar, { backgroundColor: o.color }]}>
                    <Text style={styles.oppAvatarText}>{o.initials}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.oppItemTitle}>{o.title}</Text>
                    <Text style={styles.oppItemMeta}>
                      {o.company} · {o.location}
                    </Text>
                    <Text style={styles.oppItemType}>{o.type}</Text>
                  </View>
                  {attachedOpportunityId === o.id ? (
                    <Feather name="check-circle" size={22} color="#2563eb" />
                  ) : null}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : showVisibilityPicker ? (
          <View style={styles.pickerWrap}>
            <View style={styles.pickerHeader}>
              <Pressable
                style={styles.pickerBack}
                onPress={() => setShowVisibilityPicker(false)}
              >
                <Feather name="arrow-left" size={16} color="#2563eb" />
                <Text style={styles.pickerBackText}>Back</Text>
              </Pressable>
              <Text style={styles.pickerTitle}>Who can see this?</Text>
              <View style={{ width: 44 }} />
            </View>
            <View style={styles.visibilityList}>
              {VISIBILITY_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.id}
                  onPress={() => {
                    setVisibility(opt.id);
                    setShowVisibilityPicker(false);
                  }}
                  style={[
                    styles.visibilityItem,
                    visibility === opt.id && styles.visibilityItemOn,
                  ]}
                >
                  <View style={styles.visibilityIcon}>
                    <Feather name={opt.icon} size={18} color="#2563eb" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.visibilityLabel}>{opt.label}</Text>
                    <Text style={styles.visibilitySub}>
                      {opt.id === "public"
                        ? "Anyone on CareerLink"
                        : opt.id === "connections"
                        ? "Your professional connections"
                        : "Only you can see"}
                    </Text>
                  </View>
                  {visibility === opt.id ? (
                    <Feather name="check" size={18} color="#2563eb" />
                  ) : null}
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.composerHeader}>
              <View style={[styles.avatar, { backgroundColor: CURRENT_USER.color }]}>
                <Text style={styles.avatarText}>{CURRENT_USER.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.authorRow}>
                  <Text style={styles.authorName}>{CURRENT_USER.name}</Text>
                  {CURRENT_USER.isStudent ? (
                    <View style={styles.rolePill}>
                      <Feather name="book-open" size={10} color="#2563eb" />
                      <Text style={styles.rolePillText}>Student</Text>
                    </View>
                  ) : null}
                </View>
                <Pressable
                  style={styles.visibilityBtn}
                  onPress={() => setShowVisibilityPicker(true)}
                >
                  <Feather
                    name={
                      visibility === "public"
                        ? "globe"
                        : visibility === "connections"
                        ? "users"
                        : "lock"
                    }
                    size={12}
                    color="#2563eb"
                  />
                  <Text style={styles.visibilityBtnText}>
                    {VISIBILITY_OPTIONS.find((v) => v.id === visibility)?.label}
                  </Text>
                  <Feather name="chevron-down" size={14} color="#94a3b8" />
                </Pressable>
              </View>
            </View>

            <TextInput
              style={styles.editor}
              placeholder="Share something with your professional community..."
              placeholderTextColor="#94a3b8"
              value={content}
              onChangeText={setContent}
              multiline
              maxLength={MAX_CHARS}
              textAlignVertical="top"
            />

            <View style={styles.kindRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {KIND_OPTIONS.map((opt) => (
                  <Pressable
                    key={opt.id}
                    onPress={() => setKind(opt.id)}
                    style={[styles.kindChip, kind === opt.id && { backgroundColor: opt.accent, borderColor: opt.accent }]}
                  >
                    <Feather
                      name={opt.icon}
                      size={14}
                      color={kind === opt.id ? "#2563eb" : "#64748b"}
                    />
                    <Text
                      style={[
                        styles.kindChipText,
                        kind === opt.id && styles.kindChipTextOn,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {kind === "achievement" ? (
              <View style={styles.attachBlock}>
                <Text style={styles.attachTitle}>Achievement</Text>
                <TextInput
                  style={styles.attachInput}
                  placeholder="e.g. Completed Google UX Certificate"
                  placeholderTextColor="#94a3b8"
                  value={achievementTitle}
                  onChangeText={setAchievementTitle}
                  maxLength={80}
                />
              </View>
            ) : null}

            {kind === "opportunity" ? (
              <View style={styles.attachBlock}>
                <Text style={styles.attachTitle}>Attached opportunity</Text>
                {attachedOpportunityId ? (
                  <Pressable
                    style={styles.attachItem}
                    onPress={() => setShowOppPicker(true)}
                  >
                    {(() => {
                      const o = OPPORTUNITIES.find((x) => x.id === attachedOpportunityId);
                      if (!o) return null;
                      return (
                        <>
                          <View style={[styles.oppAvatar, { backgroundColor: o.color }]}>
                            <Text style={styles.oppAvatarText}>{o.initials}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.attachItemTitle}>{o.title}</Text>
                            <Text style={styles.attachItemMeta}>
                              {o.company} · {o.type}
                            </Text>
                          </View>
                          <Feather name="edit-2" size={16} color="#64748b" />
                        </>
                      );
                    })()}
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.attachEmpty}
                    onPress={() => setShowOppPicker(true)}
                  >
                    <Feather name="briefcase" size={18} color="#94a3b8" />
                    <Text style={styles.attachEmptyText}>Choose an opportunity</Text>
                  </Pressable>
                )}
              </View>
            ) : null}

            {(kind === "image" || kind === "video") ? (
              <View style={styles.attachBlock}>
                <Text style={styles.attachTitle}>
                  {kind === "video" ? "Video" : "Images"}
                </Text>
                <View style={styles.mediaGrid}>
                  {mediaUrls.map((_, idx) => (
                    <View key={idx} style={styles.mediaBox}>
                      <View style={[styles.mediaBoxInner, { backgroundColor: "#eff6ff" }]}>
                        <Ionicons
                          name={kind === "video" ? "play-circle-outline" : "image-outline"}
                          size={22}
                          color="#3b82f6"
                        />
                      </View>
                      <Pressable
                        onPress={() =>
                          setMediaUrls((prev) => prev.filter((_, i) => i !== idx))
                        }
                        style={styles.mediaRemove}
                      >
                        <Ionicons name="close" size={12} color="#fff" />
                      </Pressable>
                    </View>
                  ))}
                  <Pressable
                    onPress={() => setMediaUrls((prev) => [...prev, `u-${Date.now()}`])}
                    style={[styles.mediaBox, styles.mediaBoxAdd]}
                  >
                    <Feather name="plus" size={20} color="#2563eb" />
                    <Text style={styles.mediaBoxAddText}>
                      Add {kind === "video" ? "video" : "image"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : null}

            <View style={styles.toolbar}>
              <Pressable style={styles.toolBtn} onPress={() => setKind("image")}>
                <Feather name="image" size={18} color="#10b981" />
                <Text style={styles.toolBtnText}>Image</Text>
              </Pressable>
              <Pressable style={styles.toolBtn} onPress={() => setKind("video")}>
                <Feather name="video" size={18} color="#f59e0b" />
                <Text style={styles.toolBtnText}>Video</Text>
              </Pressable>
              <Pressable style={styles.toolBtn}>
                <Feather name="file-text" size={18} color="#8b5cf6" />
                <Text style={styles.toolBtnText}>Doc</Text>
              </Pressable>
              <Pressable style={styles.toolBtn} onPress={() => setKind("achievement")}>
                <Feather name="award" size={18} color="#ec4899" />
                <Text style={styles.toolBtnText}>Achievement</Text>
              </Pressable>
              <Pressable style={styles.toolBtn} onPress={() => setKind("opportunity")}>
                <Feather name="briefcase" size={18} color="#2563eb" />
                <Text style={styles.toolBtnText}>Opportunity</Text>
              </Pressable>
            </View>
</ScrollView>
        )}
      {!showOppPicker && !showVisibilityPicker ? (
        <View style={styles.footer}>
          <Text style={[styles.counter, content.length > MAX_CHARS * 0.9 && styles.counterWarn]}>
            {content.length} / {MAX_CHARS}
          </Text>
        </View>
      ) : null}
    </Animated.View>
      </GestureDetector>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 120,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "92%",
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.2,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: -8 },
    elevation: 24,
  },
  sheetHeader: {
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
    marginBottom: 10,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  postBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  postBtnDisabled: {
    backgroundColor: "#dbeafe",
  },
  postBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  postBtnTextDisabled: {
    color: "rgba(255,255,255,0.8)",
  },
  body: {
    maxHeight: 640,
  },
  bodyContent: {
    padding: 16,
    gap: 12,
  },
  composerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  rolePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  rolePillText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#2563eb",
  },
  visibilityBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
  },
  visibilityBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563eb",
  },
  editor: {
    minHeight: 140,
    fontSize: 16,
    lineHeight: 24,
    color: "#0f172a",
    paddingHorizontal: 2,
  },
  kindRow: {
    paddingVertical: 2,
  },
  kindChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  kindChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
  },
  kindChipTextOn: {
    color: "#2563eb",
    fontWeight: "800",
  },
  attachBlock: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  attachTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  attachInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0f172a",
  },
  attachItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  attachItemTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  attachItemMeta: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  attachEmpty: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    paddingVertical: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  attachEmptyText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94a3b8",
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  mediaBox: {
    width: 88,
    height: 88,
    borderRadius: 14,
    overflow: "hidden",
  },
  mediaBoxInner: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaRemove: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaBoxAdd: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
    gap: 2,
  },
  mediaBoxAddText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748b",
  },
  toolbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingTop: 6,
    paddingHorizontal: 2,
  },
  toolBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
    alignItems: "flex-end",
  },
  counter: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94a3b8",
  },
  counterWarn: {
    color: "#f59e0b",
  },
  pickerWrap: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    maxHeight: 640,
  },
  pickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  pickerBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 64,
  },
  pickerBackText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },
  pickerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  pickerList: {
    marginTop: 6,
  },
  oppItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  oppItemActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  oppAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  oppAvatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  oppItemTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  oppItemMeta: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  oppItemType: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563eb",
    marginTop: 2,
  },
  visibilityList: {
    marginTop: 6,
    gap: 8,
  },
  visibilityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  visibilityItemOn: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  visibilityIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  visibilityLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  visibilitySub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});
