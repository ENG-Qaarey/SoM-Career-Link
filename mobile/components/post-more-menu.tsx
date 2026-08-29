import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useApp } from "@/context/app-provider";
import { CURRENT_USER, type PostVisibility } from "@/lib/data";

const REPORT_CATS = [
  { id: "spam", label: "Spam", icon: "alert-octagon" },
  { id: "harassment", label: "Harassment", icon: "user-x" },
  { id: "fake_opportunity", label: "Fake opportunity", icon: "shield-off" },
  { id: "scam", label: "Scam", icon: "alert-triangle" },
  { id: "inappropriate", label: "Inappropriate content", icon: "eye-off" },
  { id: "other", label: "Other", icon: "more-horizontal" },
] as const;

const VISIBILITY_OPTIONS: { id: PostVisibility; label: string; icon: "globe" | "users" | "lock"; hint: string }[] = [
  { id: "public", label: "Anyone", icon: "globe", hint: "Visible to everyone on CareerLink" },
  { id: "connections", label: "Connections", icon: "users", hint: "Only your connections" },
  { id: "private", label: "Only me", icon: "lock", hint: "Only you can see this" },
];

type PostMoreMenuProps = {
  visible: boolean;
  onClose: () => void;
  postId: string;
  authorId: string;
  onEdit?: () => void;
};

export function PostMoreMenu({ visible, onClose, postId, authorId, onEdit }: PostMoreMenuProps) {
  const { hidePost, deletePost, changePostVisibility, reportPost, setPostReaction, togglePostSave, posts, getPost } = useApp();
  void setPostReaction;
  void posts;
  const [reportStep, setReportStep] = useState<"select" | "details" | null>(null);
  const [reportCat, setReportCat] = useState<string>("");
  const [reportDetails, setReportDetails] = useState("");
  const [showVisibility, setShowVisibility] = useState(false);

  const post = getPost(postId);
  const isMine = authorId === CURRENT_USER.id;

  const close = () => {
    setReportStep(null);
    setReportCat("");
    setReportDetails("");
    setShowVisibility(false);
    onClose();
  };

  const confirmDelete = () => {
    Alert.alert("Delete post", "This post and its comments will be permanently removed.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deletePost(postId);
          close();
        },
      },
    ]);
  };

  const submitReport = () => {
    if (!reportCat) return;
    reportPost(postId, reportCat, reportDetails);
    close();
    Alert.alert("Thank you", "Your report has been submitted. Our team will review it.");
  };

  if (!visible || !post) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close}>
        <Animated.View
          entering={FadeIn.duration(160)}
          exiting={FadeOut.duration(120)}
          style={styles.sheet}
        >
          <View style={styles.sheetInner}>
            <Pressable style={styles.handlePressable}>
              <View style={styles.handle} />
            </Pressable>

            {reportStep === "select" || reportStep === "details" ? (
              <ReportFlow
                step={reportStep}
                setStep={setReportStep}
                reportCat={reportCat}
                setReportCat={setReportCat}
                reportDetails={reportDetails}
                setReportDetails={setReportDetails}
                onSubmit={submitReport}
                onCancel={() => {
                  setReportStep(null);
                  setReportCat("");
                  setReportDetails("");
                }}
              />
            ) : showVisibility ? (
              <VisibilityPicker
                current={post.visibility}
                onPick={(v) => {
                  changePostVisibility(postId, v);
                  close();
                }}
                onBack={() => setShowVisibility(false)}
              />
            ) : (
              <ScrollView
                style={{ maxHeight: 560 }}
                contentContainerStyle={{ gap: 2 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <MenuItem
                  icon="bookmark"
                  label={post.saved ? "Unsave post" : "Save post"}
                  tint="#2563eb"
                  subtitle={post.saved ? "Remove from saved" : "Save for later"}
                  onPress={() => {
                    togglePostSave(postId);
                    close();
                  }}
                />
                <MenuItem
                  icon="link"
                  label="Copy link"
                  tint="#0f766e"
                  subtitle="Share the post URL"
                  onPress={() => {
                    close();
                    Alert.alert("Link copied", "Post link copied to clipboard.");
                  }}
                />
                {isMine ? (
                  <>
                    <Divider />
                    <MenuItem
                      icon="edit-3"
                      label="Edit post"
                      tint="#1d4ed8"
                      subtitle="Update content or visibility"
                      onPress={() => {
                        close();
                        onEdit?.();
                      }}
                    />
                    <MenuItem
                      icon="eye-off"
                      label="Change visibility"
                      tint="#7c3aed"
                      subtitle={`Currently: ${VISIBILITY_OPTIONS.find((v) => v.id === post.visibility)?.label}`}
                      onPress={() => setShowVisibility(true)}
                    />
                    <Divider />
                    <MenuItem
                      icon="trash-2"
                      label="Delete post"
                      tint="#ef4444"
                      danger
                      onPress={confirmDelete}
                    />
                  </>
                ) : (
                  <>
                    <MenuItem
                      icon="eye-off"
                      label="Hide post"
                      tint="#64748b"
                      subtitle="Don't show this in your feed"
                      onPress={() => {
                        hidePost(postId);
                        close();
                      }}
                    />
                    <Divider />
                    <MenuItem
                      icon="flag"
                      label="Report post"
                      tint="#ef4444"
                      danger
                      subtitle="Report as spam, scam, or inappropriate"
                      onPress={() => setReportStep("select")}
                    />
                  </>
                )}
              </ScrollView>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

function MenuItem({
  icon,
  label,
  subtitle,
  tint,
  danger,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  subtitle?: string;
  tint: string;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && { backgroundColor: "#f8fafc" },
      ]}
    >
      <View style={[styles.menuIcon, { backgroundColor: tint + "14" }]}>
        <Feather name={icon} size={18} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
        {subtitle ? <Text style={styles.menuSub}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function ReportFlow({
  step,
  setStep,
  reportCat,
  setReportCat,
  reportDetails,
  setReportDetails,
  onSubmit,
  onCancel,
}: {
  step: "select" | "details";
  setStep: (s: "select" | "details" | null) => void;
  reportCat: string;
  setReportCat: (c: string) => void;
  reportDetails: string;
  setReportDetails: (s: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  if (step === "select") {
    return (
      <View style={{ gap: 4 }}>
        <SheetHeader
          title="Report post"
          subtitle="Why are you reporting this?"
          onBack={onCancel}
          backLabel="Cancel"
        />
        <View style={{ gap: 2, marginTop: 4 }}>
          {REPORT_CATS.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => {
                setReportCat(c.id);
                if (c.id === "other") setStep("details");
                else onSubmit();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: "#f8fafc" },
              ]}
            >
              <View style={[styles.menuIcon, { backgroundColor: "#fef2f2" }]}>
                <Feather name={c.icon} size={18} color="#ef4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuLabel}>{c.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
  return (
    <View style={{ gap: 12 }}>
      <SheetHeader
        title="Add details (optional)"
        subtitle="Anything else we should know?"
        onBack={() => setStep("select")}
        backLabel="Back"
      />
      <TextInput
        style={styles.reportText}
        placeholder="Tell us more about what you're reporting..."
        placeholderTextColor="#94a3b8"
        value={reportDetails}
        onChangeText={setReportDetails}
        multiline
        maxLength={500}
      />
      <Pressable
        onPress={onSubmit}
        disabled={!reportCat}
        style={[styles.reportSubmit, !reportCat && styles.submitDisabled]}
      >
        <Text style={styles.reportSubmitText}>Submit report</Text>
      </Pressable>
    </View>
  );
}

function VisibilityPicker({
  current,
  onPick,
  onBack,
}: {
  current: PostVisibility;
  onPick: (v: PostVisibility) => void;
  onBack: () => void;
}) {
  return (
    <View style={{ gap: 4 }}>
      <SheetHeader
        title="Post visibility"
        subtitle="Choose who can see this post"
        onBack={onBack}
        backLabel="Back"
      />
      <View style={{ gap: 8, marginTop: 4 }}>
        {VISIBILITY_OPTIONS.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => onPick(o.id)}
            style={({ pressed }) => [
              styles.visibilityItem,
              current === o.id && styles.visibilityItemOn,
              pressed && { opacity: 0.9 },
            ]}
          >
            <View style={[styles.visibilityIcon, { backgroundColor: current === o.id ? "#2563eb" : "#eff6ff" }]}>
              <Feather name={o.icon} size={18} color={current === o.id ? "#fff" : "#2563eb"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.visibilityLabel, current === o.id && styles.visibilityLabelOn]}>
                {o.label}
              </Text>
              <Text style={styles.visibilityHint}>{o.hint}</Text>
            </View>
            <Feather
              name={current === o.id ? "check-circle" : "circle"}
              size={20}
              color={current === o.id ? "#2563eb" : "#cbd5e1"}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SheetHeader({
  title,
  subtitle,
  onBack,
  backLabel,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
}) {
  return (
    <View style={styles.sheetHeader}>
      {onBack ? (
        <Pressable style={styles.sheetBack} onPress={onBack}>
          <Feather name="arrow-left" size={16} color="#2563eb" />
          <Text style={styles.sheetBackText}>{backLabel ?? "Back"}</Text>
        </Pressable>
      ) : (
        <View style={{ width: 60 }} />
      )}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.sheetTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sheetSub}>{subtitle}</Text> : null}
      </View>
      <View style={{ width: 60 }} />
    </View>
  );
}

type ShareSheetProps = {
  visible: boolean;
  onClose: () => void;
  onRepost: () => void;
  onShareWithComment: () => void;
};

export function PostShareSheet({ visible, onClose, onRepost, onShareWithComment }: ShareSheetProps) {
  if (!visible) return null;
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          entering={FadeIn.duration(160)}
          exiting={FadeOut.duration(120)}
          style={styles.sheet}
        >
          <View style={styles.sheetInner}>
            <View style={styles.handlePressable}>
              <View style={styles.handle} />
            </View>
            <SheetHeader title="Share post" onBack={onClose} backLabel="Cancel" />
            <View style={{ gap: 2, marginTop: 6 }}>
              <MenuItem
                icon="repeat"
                label="Repost"
                tint="#2563eb"
                subtitle="Share directly to your feed"
                onPress={() => {
                  onClose();
                  onRepost();
                  Alert.alert("Reposted", "Shared to your feed.");
                }}
              />
              <MenuItem
                icon="message-square"
                label="Share with comment"
                tint="#7c3aed"
                subtitle="Add your own message"
                onPress={() => {
                  onClose();
                  onShareWithComment();
                }}
              />
              <MenuItem
                icon="link"
                label="Copy link"
                tint="#0f766e"
                subtitle="Copy post URL"
                onPress={() => {
                  onClose();
                  Alert.alert("Copied", "Post link copied to clipboard.");
                }}
              />
              <MenuItem
                icon="share-2"
                label="Share externally"
                tint="#ea580c"
                subtitle="Share via other apps"
                onPress={() => {
                  onClose();
                  Alert.alert("Share", "Native share sheet would open.");
                }}
              />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 28,
    maxHeight: "86%",
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 20,
  },
  sheetInner: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  handlePressable: {
    alignItems: "center",
    paddingVertical: 4,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 4,
  },
  sheetBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 60,
  },
  sheetBackText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  sheetSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  menuLabelDanger: {
    color: "#ef4444",
  },
  menuSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 4,
    marginHorizontal: 6,
  },
  reportText: {
    minHeight: 110,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 14,
    color: "#0f172a",
    textAlignVertical: "top",
  },
  reportSubmit: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  submitDisabled: {
    backgroundColor: "#cbd5e1",
  },
  reportSubmitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  visibilityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  visibilityLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  visibilityLabelOn: {
    color: "#2563eb",
  },
  visibilityHint: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});
