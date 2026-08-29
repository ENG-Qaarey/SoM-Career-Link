import { useState, useRef } from "react";
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
import type { Post } from "@/lib/data";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Segment =
  | { type: "text"; value: string }
  | { type: "hashtag"; value: string }
  | { type: "mention"; value: string };

export function parseContent(input: string): Segment[] {
  const tokens: Segment[] = [];
  const re = /(#[\p{L}\p{N}_]+|@[\p{L}][\p{L}\p{N}]*(?:\s[\p{L}][\p{L}\p{N}]*)*)/giu;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(input))) {
    if (match.index > last) {
      tokens.push({ type: "text", value: input.slice(last, match.index) });
    }
    const v = match[0];
    tokens.push({
      type: v.startsWith("#") ? "hashtag" : "mention",
      value: v,
    });
    last = match.index + v.length;
  }
  if (last < input.length) tokens.push({ type: "text", value: input.slice(last) });
  return tokens;
}

const ACHIEVEMENT_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  graduation: "book-open",
  new_job: "briefcase",
  internship: "compass",
  certificate: "award",
  promotion: "trending-up",
  competition: "award",
  project: "zap",
};

export function AchievementCard({
  achievement,
  authorColor,
}: {
  achievement: NonNullable<Post["achievement"]>;
  authorColor: string;
}) {
  const iconName = ACHIEVEMENT_ICONS[achievement.kind] ?? "award";
  return (
    <View style={[styles.achievementCard, { borderLeftColor: authorColor }]}>
      <View style={[styles.achievementIcon, { backgroundColor: authorColor + "18" }]}>
        <Feather name={iconName} size={20} color={authorColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        {achievement.subtitle ? (
          <Text style={styles.achievementSubtitle}>{achievement.subtitle}</Text>
        ) : null}
        {achievement.dateLabel ? (
          <Text style={styles.achievementDate}>{achievement.dateLabel}</Text>
        ) : null}
      </View>
    </View>
  );
}

export function MediaGallery({
  media,
  index,
  setIndex,
  onOpen,
}: {
  media: NonNullable<Post["media"]>;
  index: number;
  setIndex: (i: number) => void;
  onOpen: (id: string) => void;
}) {
  if (media.length === 1) {
    const m = media[0];
    return (
      <Pressable onPress={() => onOpen(m.id)}>
        <View style={[styles.mediaSingle, { backgroundColor: m.accent ?? "#eff6ff" }]}>
          <Ionicons
            name={m.type === "video" ? "play-circle-outline" : "image-outline"}
            size={36}
            color="#3b82f6"
          />
          {m.type === "video" ? (
            <View style={styles.videoLabel}>
              <Feather name="film" size={12} color="#0f172a" />
              <Text style={styles.videoLabelText}>Video</Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.mediaGrid}>
      {media.map((m, i) => (
        <Pressable
          key={m.id}
          onPress={() => {
            setIndex(i);
            onOpen(m.id);
          }}
          style={[
            styles.mediaCell,
            media.length === 2 && styles.mediaCellTwo,
            media.length >= 3 && i === 0 && styles.mediaCellBig,
            { backgroundColor: m.accent ?? "#eff6ff" },
          ]}
        >
          <Ionicons
            name={m.type === "video" ? "play-circle-outline" : "image-outline"}
            size={24}
            color="#3b82f6"
          />
          {i === 2 && media.length > 3 ? (
            <View style={styles.mediaOverlay}>
              <Text style={styles.mediaOverlayText}>+{media.length - 3}</Text>
            </View>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

export function OpportunityBox({
  job,
  onApply,
  applyLabel,
  onPress,
}: {
  job: {
    opportunityId: string;
    title: string;
    company: string;
    location: string;
    type: string;
  };
  onApply: () => void;
  applyLabel: string;
  onPress?: () => void;
}) {
  const typeLabel = job.type;
  return (
    <Pressable style={styles.jobBox} onPress={onPress}>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={styles.jobTypeTag}>
          <Feather name="briefcase" size={10} color="#2563eb" />
          <Text style={styles.jobTypeTagText}>{typeLabel}</Text>
        </View>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobMeta}>
          {job.company} · {job.location}
        </Text>
      </View>
      <Pressable onPress={onApply} style={styles.applyBtn}>
        <Text style={styles.applyText}>{applyLabel}</Text>
      </Pressable>
    </Pressable>
  );
}

export function FullscreenViewer({
  media,
  startId,
  onClose,
}: {
  media: NonNullable<Post["media"]>;
  startId: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const close = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };
  const startIdx = Math.max(
    0,
    media.findIndex((m) => m.id === startId)
  );
  void startIdx;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <Pressable style={styles.viewerBackdrop} onPress={close}>
        <Pressable style={{ flex: 1 }} onPress={() => {}}>
          <View style={styles.viewerHeader}>
            <Pressable onPress={close} hitSlop={8}>
              <Ionicons name="close" size={24} color="#fff" />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.viewerStage}
          >
            {media.map((m, i) => (
              <View
                key={m.id}
                style={[
                  styles.viewerSlide,
                  { width: SCREEN_WIDTH - 32, backgroundColor: m.accent ?? "#eff6ff" },
                ]}
              >
                <Ionicons
                  name={m.type === "video" ? "play-circle" : "image"}
                  size={64}
                  color="#3b82f6"
                />
                <Text style={styles.viewerCount}>
                  {i + 1} / {media.length}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  achievementCard: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderLeftWidth: 4,
  },
  achievementIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  achievementSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  achievementDate: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 3,
    fontWeight: "700",
  },
  mediaSingle: {
    marginTop: 12,
    height: 220,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  videoLabel: {
    position: "absolute",
    left: 12,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  videoLabelText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0f172a",
  },
  mediaGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  mediaCell: {
    width: "31.6%",
    height: 110,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mediaCellTwo: {
    width: "48.9%",
    height: 180,
  },
  mediaCellBig: {
    width: "65%",
    height: 220,
  },
  mediaOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaOverlayText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  jobBox: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "#f8fafc",
  },
  jobTypeTag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  jobTypeTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#2563eb",
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  jobMeta: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748b",
  },
  applyBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  applyText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  viewerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 6, 23, 0.96)",
    padding: 16,
  },
  viewerHeader: {
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
  viewerStage: {
    alignItems: "center",
    paddingTop: 24,
    gap: 16,
  },
  viewerSlide: {
    height: 420,
    borderRadius: 24,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  viewerCount: {
    position: "absolute",
    bottom: 16,
    color: "#0f172a",
    fontSize: 12,
    fontWeight: "800",
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
});