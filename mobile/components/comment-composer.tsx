import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CURRENT_USER } from "@/lib/data";

type CommentComposerProps = {
  postId: string;
  onAddComment: (postId: string, text: string, parentId?: string) => void;
};

export function CommentComposer({ postId, onAddComment }: CommentComposerProps) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(postId, trimmed);
    setText("");
  };

  return (
    <View style={styles.composer}>
      <View style={styles.meAvatar}>
        <Text style={styles.meAvatarText}>{CURRENT_USER.initials}</Text>
      </View>
      <View style={styles.composerInputWrap}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor="#94a3b8"
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
          autoFocus
        />
      </View>
      <Pressable
        onPress={submit}
        disabled={!text.trim()}
        style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
        hitSlop={8}
      >
        <Ionicons name="send" size={18} color={text.trim() ? "#fff" : "#cbd5e1"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
    gap: 10,
  },
  meAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  meAvatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  composerInputWrap: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 6,
  },
  input: {
    fontSize: 14,
    color: "#0f172a",
    paddingTop: 4,
    minHeight: 28,
    maxHeight: 110,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  sendBtnDisabled: {
    backgroundColor: "#cbd5e1",
  },
});