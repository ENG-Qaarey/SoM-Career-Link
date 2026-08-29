import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useApp } from "@/context/app-provider";

export default function ChatScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getConversation, sendMessage, markConversationRead } = useApp();
  const conversation = getConversation(id);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (id) markConversationRead(id);
  }, [id, markConversationRead]);

  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text style={styles.missing}>Conversation not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Feather name="chevron-left" size={22} color="#0f172a" />
        </Pressable>
        <View style={[styles.avatar, { backgroundColor: conversation.color }]}>
          <Text style={styles.avatarText}>{conversation.initials}</Text>
        </View>
        <View style={styles.headerCopy}>
          <Text style={styles.name}>{conversation.name}</Text>
          <Text style={styles.status}>{conversation.online ? "Online" : "Offline"}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {conversation.messages.map((msg) => (
          <View key={msg.id} style={[styles.bubble, msg.fromMe ? styles.mine : styles.theirs]}>
            <Text style={[styles.bubbleText, msg.fromMe && styles.mineText]}>{msg.text}</Text>
            <Text style={[styles.time, msg.fromMe && styles.mineTime]}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          value={draft}
          onChangeText={setDraft}
        />
        <Pressable
          style={styles.send}
          onPress={() => {
            sendMessage(conversation.id, draft);
            setDraft("");
          }}
        >
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
    gap: 10,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800" },
  headerCopy: { flex: 1 },
  name: { fontSize: 16, fontWeight: "800", color: "#0f172a" },
  status: { fontSize: 12, color: "#10b981", marginTop: 1 },
  messages: { padding: 16, gap: 10, paddingBottom: 24 },
  bubble: {
    maxWidth: "82%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  theirs: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 4,
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: "#2563eb",
    borderTopRightRadius: 4,
  },
  bubbleText: { fontSize: 15, lineHeight: 21, color: "#0f172a" },
  mineText: { color: "#ffffff" },
  time: { marginTop: 4, fontSize: 10, color: "#94a3b8" },
  mineTime: { color: "rgba(255,255,255,0.75)" },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0f172a",
  },
  send: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { color: "#fff", fontWeight: "800" },
  missing: { marginTop: 80, textAlign: "center", fontSize: 16, color: "#0f172a" },
  link: { textAlign: "center", marginTop: 12, color: "#2563eb", fontWeight: "700" },
});
