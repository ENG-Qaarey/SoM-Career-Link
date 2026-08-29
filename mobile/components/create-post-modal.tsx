import { useState, useMemo, useEffect, useCallback } from "react";
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
  Keyboard,
  Dimensions,
  useColorScheme,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CURRENT_USER, type PostKind, type PostVisibility } from "@/lib/data";
import { useApp } from "@/context/app-provider";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MAX_CHARS = 1300;

const ATTACHMENT_OPTIONS = [
  { id: "photo", label: "Photo", icon: "image", accent: "#2563eb", family: "feather" as const },
  { id: "video", label: "Video", icon: "video", accent: "#f59e0b", family: "feather" as const },
  { id: "achievement", label: "Achievement", icon: "award", accent: "#ec4899", family: "feather" as const },
  { id: "image", label: "Image", icon: "image-outline", accent: "#10b981", family: "ionicons" as const },
  { id: "video2", label: "Video", icon: "videocam-outline", accent: "#f97316", family: "ionicons" as const },
  { id: "document", label: "Document", icon: "description-outline", accent: "#8b5cf6", family: "ionicons" as const },
  { id: "achievement2", label: "Achievement", icon: "workspace-premium-outline", accent: "#f43f5e", family: "ionicons" as const },
  { id: "opportunity", label: "Opportunity", icon: "work-outline", accent: "#2563eb", family: "ionicons" as const },
] as const;

const VISIBILITY_OPTIONS: { id: PostVisibility; label: string; icon: "globe" | "users" | "lock" }[] = [
  { id: "public", label: "Anyone", icon: "globe" },
  { id: "connections", label: "Connections", icon: "users" },
  { id: "private", label: "Only me", icon: "lock" },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.9;
const SPRING_CONFIG = { damping: 22, stiffness: 180, mass: 0.8 } as const;
const DISMISS_THRESHOLD = 100;
const DISMISS_VELOCITY = 500;

type CreatePostModalProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

function getColors(isDark: boolean) {
  return {
    background: isDark ? "#1e293b" : "#ffffff",
    surface: isDark ? "#334155" : "#f8fafc",
    surfaceHover: isDark ? "#475569" : "#f1f5f9",
    border: isDark ? "#475569" : "#e2e8f0",
    textPrimary: isDark ? "#f1f5f9" : "#0f172a",
    textSecondary: isDark ? "#94a3b8" : "#64748b",
    textMuted: isDark ? "#64748b" : "#94a3b8",
    primary: "#2563eb",
    primaryLight: isDark ? "#1e3a5f" : "#eff6ff",
    primaryDisabled: isDark ? "#3b82f6" : "#93c5fd",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    shadow: isDark ? "rgba(0,0,0,0.4)" : "rgba(15, 23, 42, 0.1)",
    overlay: isDark ? "rgba(0,0,0,0.6)" : "rgba(15, 23, 42, 0.5)",
    avatarBg: "#2563eb",
  };
}

export function CreatePostModal({ visible, onClose, onSuccess, onError }: CreatePostModalProps) {
  const { createPost } = useApp();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = getColors(isDark);

  const [content, setContent] = useState("");
  const [showVisibilityPicker, setShowVisibilityPicker] = useState(false);
  const [visibility, setVisibility] = useState<PostVisibility>("public");
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const trimmed = content.trim();
  const canPost = trimmed.length > 0;
  const charCount = content.length;
  const isAtLimit = charCount >= MAX_CHARS;

  const translateY = useSharedValue(SHEET_MAX_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart((_, ctx: any) => {
          ctx.startY = translateY.value;
          isDismissing.value = false;
        })
        .onUpdate((event, ctx: any) => {
          const translation = Math.max(0, (ctx.startY ?? 0) + event.translationY);
          translateY.value = translation;
        })
        .onEnd((event) => {
          const velocity = event.velocityY;
          const shouldDismiss = translateY.value > DISMISS_THRESHOLD || velocity > DISMISS_VELOCITY;

          if (shouldDismiss) {
            handleDismiss();
          } else {
            snapOpen();
          }
        }),
    []
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const snapOpen = useCallback(() => {
    translateY.value = withSpring(0, SPRING_CONFIG);
    backdropOpacity.value = withTiming(0.5, { duration: 200 });
  }, []);

  const handleDismiss = useCallback(() => {
    if (isDismissing.value) return;
    isDismissing.value = true;
    translateY.value = withTiming(SHEET_MAX_HEIGHT, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(closeModal)();
      }
    });
    backdropOpacity.value = withTiming(0, { duration: 150 });
  }, []);

  const closeModal = useCallback(() => {
    if (trimmed.length > 0 && !isSubmitting && !showSuccess) {
      Alert.alert("Discard post?", "Your changes will not be saved.", [
        { text: "Keep editing", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: performClose },
      ]);
    } else {
      performClose();
    }
  }, [trimmed, isSubmitting, showSuccess]);

  const performClose = useCallback(() => {
    setContent("");
    setVisibility("public");
    setShowVisibilityPicker(false);
    setShowAttachmentPicker(false);
    setIsSubmitting(false);
    setShowSuccess(false);
    onClose();
  }, [onClose]);

  const handleBackdropPress = useCallback(() => {
    if (!isDismissing.value && !isSubmitting) {
      Keyboard.dismiss();
      handleDismiss();
    }
  }, [handleDismiss, isSubmitting]);

  const handleContentPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!canPost || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createPost({
        content: trimmed,
        kind: "text",
        visibility,
      });
      setShowSuccess(true);
      setIsSubmitting(false);
      onSuccess?.();
      setTimeout(() => {
        performClose();
      }, 800);
    } catch (error) {
      setIsSubmitting(false);
      onError?.(error as Error);
      Alert.alert("Failed to post", "Please try again.");
    }
  }, [canPost, isSubmitting, trimmed, visibility, createPost, onSuccess, onError, performClose]);

  useEffect(() => {
    if (visible) {
      snapOpen();
    } else {
      translateY.value = SHEET_MAX_HEIGHT;
      backdropOpacity.value = 0;
      isDismissing.value = false;
    }
  }, [visible, snapOpen]);

  if (!visible && translateY.value === SHEET_MAX_HEIGHT) return null;

  const renderAttachmentIcon = (option: typeof ATTACHMENT_OPTIONS[0]) => {
    const bgColor = `${option.accent}15`;
    switch (option.family) {
      case "feather":
        return <Feather name={option.icon} size={22} color={option.accent} />;
      case "ionicons":
        return <Ionicons name={option.icon} size={22} color={option.accent} />;
      case "material":
        return <MaterialIcons name={option.icon} size={22} color={option.accent} />;
    }
  };

  return (
    <GestureDetector gesture={panGesture}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.overlay, { backgroundColor: colors.overlay }]}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
      >
        <Animated.View style={[styles.backdrop, backdropStyle]} onTouchStart={handleBackdropPress} pointerEvents={visible ? "auto" : "none"} />
        <Animated.View style={[styles.sheet, sheetStyle, { backgroundColor: colors.background }]}>
          <View style={styles.sheetContent}>
            <View style={styles.dragHandleWrapper}>
              <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />
            </View>

            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <Pressable
                style={styles.cancelButton}
                onPress={closeModal}
                hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
                disabled={isSubmitting}
              >
                <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
              </Pressable>

              <Text style={[styles.title, { color: colors.textPrimary }]}>Create a post</Text>

              <Pressable
                style={[
                  styles.postButton,
                  canPost && !isSubmitting ? styles.postButtonActive : styles.postButtonDisabled,
                  { backgroundColor: canPost && !isSubmitting ? colors.primary : colors.primaryDisabled },
                ]}
                onPress={handleSubmit}
                disabled={!canPost || isSubmitting}
                hitSlop={8}
              >
                <Text
                  style={[
                    styles.postButtonText,
                    { color: canPost && !isSubmitting ? "#ffffff" : colors.textMuted },
                  ]}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onTouchStart={handleContentPress}
            >
              <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: colors.avatarBg }]}>
                  <Text style={styles.avatarText}>{CURRENT_USER.initials}</Text>
                </View>
                <View style={styles.userDetails}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.userName, { color: colors.textPrimary }]}>{CURRENT_USER.name}</Text>
                    {CURRENT_USER.isStudent && (
                      <View style={styles.studentBadge}>
                        <Feather name="book-open" size={10} color="#ffffff" />
                        <Text style={styles.studentBadgeText}>Student</Text>
                      </View>
                    )}
                  </View>
                  <Pressable
                    style={[styles.audienceSelector, { backgroundColor: colors.primaryLight }]}
                    onPress={() => setShowVisibilityPicker(true)}
                    hitSlop={8}
                  >
                    <Feather
                      name={visibility === "public" ? "globe" : visibility === "connections" ? "users" : "lock"}
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={[styles.audienceText, { color: colors.textPrimary }]}>
                      {VISIBILITY_OPTIONS.find((v) => v.id === visibility)?.label}
                    </Text>
                    <Feather name="chevron-down" size={14} color={colors.textMuted} />
                  </Pressable>
                </View>
              </View>

              <View style={[styles.editorContainer, { borderColor: colors.border }]}>
                <TextInput
                  style={[styles.editor, { backgroundColor: colors.surface, color: colors.textPrimary }]}
                  placeholder="Share something with your professional community..."
                  placeholderTextColor={colors.textMuted}
                  value={content}
                  onChangeText={setContent}
                  multiline
                  maxLength={MAX_CHARS}
                  textAlignVertical="top"
                  autoFocus={visible}
                />
                <View style={[styles.editorFooter, { borderTopColor: colors.border }]}>
                  <View style={styles.editorTools}>
                    <Pressable style={[styles.toolButton, { backgroundColor: colors.surfaceHover }]} hitSlop={8}>
                      <Feather name="smile" size={20} color={colors.textSecondary} />
                    </Pressable>
                    <Pressable style={[styles.toolButton, { backgroundColor: colors.surfaceHover }]} hitSlop={8}>
                      <Text style={[styles.toolButtonText, { color: colors.textSecondary }]}>@</Text>
                    </Pressable>
                    <Pressable style={[styles.toolButton, { backgroundColor: colors.surfaceHover }]} hitSlop={8}>
                      <Text style={[styles.toolButtonText, { color: colors.textSecondary }]}>#</Text>
                    </Pressable>
                  </View>
                  <View style={styles.charCounter}>
                    <Text
                      style={[
                        styles.charCounterText,
                        { color: isAtLimit ? colors.error : colors.textMuted },
                      ]}
                    >
                      {charCount} / {MAX_CHARS}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: isDark ? "#334155" : "#f1f5f9" }]} />

              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Add to your post</Text>

              <View style={styles.attachmentGrid}>
                {ATTACHMENT_OPTIONS.map((option) => (
                  <Pressable
                    key={option.id}
                    style={[
                      styles.attachmentCard,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                    onPress={() => {
                      setShowAttachmentPicker(true);
                    }}
                    hitSlop={8}
                    android_ripple={{ color: colors.primaryLight }}
                  >
                    <View style={[styles.attachmentIconWrapper, { backgroundColor: `${option.accent}15` }]}>
                      {renderAttachmentIcon(option)}
                    </View>
                    <Text style={[styles.attachmentLabel, { color: colors.textPrimary }]}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            {showSuccess && (
              <View style={[styles.successOverlay, { backgroundColor: colors.background }]}>
                <View style={styles.successContent}>
                  <View style={[styles.successIcon, { backgroundColor: `${colors.success}15` }]}>
                    <Feather name="check-circle" size={28} color={colors.success} />
                  </View>
                  <Text style={[styles.successText, { color: colors.textPrimary }]}>Posted successfully!</Text>
                </View>
              </View>
            )}

            {showVisibilityPicker && (
              <View style={[styles.pickerOverlay, { backgroundColor: colors.overlay }]}>
                <View style={[styles.pickerSheet, { backgroundColor: colors.background }]}>
                  <View style={[styles.pickerHeader, { borderBottomColor: colors.border }]}>
                    <Pressable
                      style={styles.pickerBack}
                      onPress={() => setShowVisibilityPicker(false)}
                      hitSlop={8}
                    >
                      <Feather name="x" size={20} color={colors.textSecondary} />
                    </Pressable>
                    <Text style={[styles.pickerTitle, { color: colors.textPrimary }]}>Who can see this?</Text>
                    <View style={{ width: 40 }} />
                  </View>
                  <ScrollView style={styles.pickerList} showsVerticalScrollIndicator={false}>
                    {VISIBILITY_OPTIONS.map((opt) => (
                      <Pressable
                        key={opt.id}
                        style={[
                          styles.pickerItem,
                          visibility === opt.id ? styles.pickerItemActive : null,
                          { backgroundColor: colors.surface, borderColor: colors.border },
                        ]}
                        onPress={() => {
                          setVisibility(opt.id);
                          setShowVisibilityPicker(false);
                        }}
                        android_ripple={{ color: colors.primaryLight }}
                      >
                        <View
                          style={[
                            styles.pickerIconWrapper,
                            { backgroundColor: visibility === opt.id ? colors.primaryLight : colors.surfaceHover },
                          ]}
                        >
                          <Feather name={opt.icon} size={18} color={visibility === opt.id ? colors.primary : colors.textSecondary} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.pickerItemLabel, { color: colors.textPrimary }]}>{opt.label}</Text>
                          <Text style={[styles.pickerItemSub, { color: colors.textSecondary }]}>
                            {opt.id === "public"
                              ? "Anyone on the platform"
                              : opt.id === "connections"
                              ? "Your professional connections"
                              : "Only you can see this post"}
                          </Text>
                        </View>
                        {visibility === opt.id && (
                          <Feather name="check" size={20} color={colors.primary} />
                        )}
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 200,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SHEET_MAX_HEIGHT,
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.15,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: -8 },
    elevation: 24,
    overflow: "hidden",
  },
  sheetContent: {
    flex: 1,
  },
  dragHandleWrapper: {
    alignItems: "center",
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cancelButton: {
    minWidth: 60,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  postButton: {
    minWidth: 72,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  postButtonActive: {},
  postButtonDisabled: {},
  postButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
    maxHeight: SHEET_MAX_HEIGHT - 120,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  userDetails: {
    flex: 1,
    gap: 6,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
  },
  studentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2563eb",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  studentBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
  },
  audienceSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  audienceText: {
    fontSize: 12,
    fontWeight: "600",
  },
  editorContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  editor: {
    minHeight: 140,
    fontSize: 16,
    lineHeight: 24,
    padding: 14,
  },
  editorFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  editorTools: {
    flexDirection: "row",
    gap: 8,
  },
  toolButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toolButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  charCounter: {
    paddingHorizontal: 4,
  },
  charCounterText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 8,
    marginHorizontal: -16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  attachmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  attachmentCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  attachmentIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  attachmentLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  successContent: {
    alignItems: "center",
    gap: 12,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    fontSize: 16,
    fontWeight: "700",
  },
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    justifyContent: "flex-end",
  },
  pickerSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.2,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: -8 },
    elevation: 24,
  },
  pickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  pickerList: {
    padding: 16,
    gap: 8,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  pickerItemActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  pickerIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerItemLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  pickerItemSub: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default CreatePostModal;