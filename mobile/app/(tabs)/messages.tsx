import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ScreenHeader } from "@/components/screen-header";
import { useApp } from "@/context/app-provider";

export default function MessagesScreen() {
  const router = useRouter();
  const { conversations } = useApp();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader title="Messages" subtitle="Chat with employers and connections" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {conversations.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptyText}>Start building your professional network.</Text>
          </View>
        ) : (
          conversations.map((msg) => (
            <Pressable
              key={msg.id}
              style={styles.row}
              onPress={() => router.push(`/chat/${msg.id}`)}
            >
              <View style={[styles.avatar, { backgroundColor: `${msg.color}1A` }]}>
                <Text style={[styles.avatarText, { color: msg.color }]}>{msg.initials}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.name}>{msg.name}</Text>
                <Text numberOfLines={1} style={styles.preview}>
                  {msg.messages[msg.messages.length - 1]?.text}
                </Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.time}>{msg.messages[msg.messages.length - 1]?.time}</Text>
                {msg.unread > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{msg.unread}</Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "800", fontSize: 15 },
  body: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  preview: { marginTop: 3, fontSize: 13, color: "#64748b" },
  meta: { alignItems: "flex-end", gap: 6 },
  time: { fontSize: 11, color: "#94a3b8" },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  empty: { alignItems: "center", paddingTop: 80, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  emptyText: { fontSize: 14, color: "#64748b" },
});
