import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { REACTION_META, type ReactionType } from "@/lib/data";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const REACTION_TYPES: ReactionType[] = ["like", "celebrate", "insightful", "support"];

type ReactionPickerProps = {
  visible: boolean;
  currentReaction?: ReactionType;
  onPick: (reaction: ReactionType | null) => void;
  anchorStyle?: object;
};

export function ReactionPicker({ visible, currentReaction, onPick, anchorStyle }: ReactionPickerProps) {
  if (!visible) return null;
  return (
    <Animated.View
      entering={FadeIn.duration(120)}
      exiting={FadeOut.duration(100)}
      layout={Layout.duration(120)}
      style={[styles.picker, anchorStyle]}
    >
      {REACTION_TYPES.map((type, idx) => {
        const meta = REACTION_META[type];
        const active = currentReaction === type;
        return (
          <Pressable
            key={type}
            onPress={() => onPick(active ? null : type)}
            style={({ pressed }) => [
              styles.reactionBtn,
              active && styles.reactionBtnActive,
              pressed && { transform: [{ scale: 0.92 }] },
            ]}
          >
            <Animated.Text
              entering={ZoomIn.delay(idx * 30).duration(160)}
              exiting={ZoomOut.duration(80)}
              style={[styles.reactionEmoji, active && styles.reactionEmojiActive]}
            >
              {meta.emoji}
            </Animated.Text>
            <Text style={[styles.reactionLabel, active && { color: meta.color }]}>
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

type ReactionBadgeProps = {
  type: ReactionType;
  size?: number;
  count?: number;
  onPress?: () => void;
};

export function ReactionBadge({ type, size = 16, count, onPress }: ReactionBadgeProps) {
  const meta = REACTION_META[type];
  const content = (
    <View style={styles.badge}>
      <Text style={{ fontSize: size, lineHeight: size + 4 }}>{meta.emoji}</Text>
      {typeof count === "number" ? (
        <Text style={[styles.badgeCount, { color: meta.color }]}>{count}</Text>
      ) : null}
    </View>
  );
  return onPress ? (
    <Pressable onPress={onPress} hitSlop={6}>
      {content}
    </Pressable>
  ) : (
    content
  );
}

type ReactionRowProps = {
  reactionCounts: Partial<Record<ReactionType, number>>;
  currentReaction?: ReactionType;
  totalComments: number;
  totalShares: number;
  onPress?: () => void;
};

export function ReactionRow({
  reactionCounts,
  currentReaction,
  totalComments,
  totalShares,
  onPress,
}: ReactionRowProps) {
  const entries = (Object.entries(reactionCounts) as [ReactionType, number][])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const totalReactions = entries.reduce((sum, [, n]) => sum + n, 0);
  if (totalReactions === 0 && totalComments === 0 && totalShares === 0) return null;
  return (
    <Pressable onPress={onPress} hitSlop={4}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          {entries.length > 0 ? (
            <View style={styles.stack}>
              {entries.map(([type], idx) => (
                <View
                  key={type}
                  style={[
                    styles.stackEmoji,
                    { zIndex: entries.length - idx, marginLeft: idx === 0 ? 0 : -8 },
                  ]}
                >
                  <Text style={styles.stackEmojiText}>{REACTION_META[type].emoji}</Text>
                </View>
              ))}
            </View>
          ) : null}
          {totalReactions > 0 ? (
            <Text style={styles.rowCount}>{totalReactions}</Text>
          ) : null}
          {currentReaction ? (
            <View style={[styles.youBadge, { backgroundColor: REACTION_META[currentReaction].color + "18" }]}>
              <Text style={[styles.youBadgeText, { color: REACTION_META[currentReaction].color }]}>
                You {REACTION_META[currentReaction].emoji}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.rowRight}>
          {totalComments > 0 ? (
            <Text style={styles.rowCount}>{totalComments} comment{totalComments === 1 ? "" : "s"}</Text>
          ) : null}
          {totalShares > 0 ? (
            <Text style={[styles.rowCount, totalComments > 0 && { marginLeft: 10 }]}>
              {totalShares} share{totalShares === 1 ? "" : "s"}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

type ReactionActionBarProps = {
  reaction?: ReactionType;
  onLongPressReaction?: () => void;
  onPressReaction: () => void;
  onPressComment: () => void;
  onPressShare: () => void;
  saved: boolean;
  onPressSave: () => void;
};

export function ReactionActionBar({
  reaction,
  onLongPressReaction,
  onPressReaction,
  onPressComment,
  onPressShare,
  saved,
  onPressSave,
}: ReactionActionBarProps) {
  const icon = (active?: boolean, activeName?: keyof typeof Ionicons.glyphMap, inactiveName?: keyof typeof Ionicons.glyphMap, tint?: string) => {
    const color = tint ?? (active ? "#ef4444" : "#64748b");
    return <Ionicons name={active ? (activeName as any) : (inactiveName as any)} size={18} color={color} />;
  };
  const reactionMeta = reaction ? REACTION_META[reaction] : null;
  return (
    <View style={styles.actionBar}>
      <Pressable
        style={styles.actionBtn}
        onPress={onPressReaction}
        onLongPress={onLongPressReaction}
        delayLongPress={180}
      >
        {reactionMeta ? (
          <Text style={{ fontSize: 18 }}>{reactionMeta.emoji}</Text>
        ) : (
          icon(false, "heart", "heart-outline")
        )}
        <Text style={[styles.actionLabel, reaction && { color: REACTION_META[reaction].color }]}>
          {reaction ? reactionMeta?.label ?? "Like" : "Like"}
        </Text>
      </Pressable>
      <Pressable style={styles.actionBtn} onPress={onPressComment}>
        <Ionicons name="chatbubble-outline" size={18} color="#64748b" />
        <Text style={styles.actionLabel}>Comment</Text>
      </Pressable>
      <Pressable style={styles.actionBtn} onPress={onPressShare}>
        <Ionicons name="arrow-redo-outline" size={18} color="#64748b" />
        <Text style={styles.actionLabel}>Share</Text>
      </Pressable>
      <Pressable style={styles.actionBtn} onPress={onPressSave}>
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={18}
          color={saved ? "#2563eb" : "#64748b"}
        />
        <Text style={[styles.actionLabel, saved && { color: "#2563eb" }]}>
          {saved ? "Saved" : "Save"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    top: -58,
    left: 0,
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 50,
  },
  reactionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  reactionBtnActive: {
    backgroundColor: "#eff6ff",
  },
  reactionEmoji: {
    fontSize: 18,
  },
  reactionEmojiActive: {
    transform: [{ scale: 1.1 }],
  },
  reactionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeCount: {
    fontSize: 12,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowCount: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  stack: {
    flexDirection: "row",
    alignItems: "center",
  },
  stackEmoji: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  stackEmojiText: {
    fontSize: 13,
  },
  youBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  youBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  actionBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
  },
});

export { ReactionPicker, ReactionBadge, ReactionRow, ReactionActionBar };
