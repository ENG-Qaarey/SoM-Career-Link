import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type Message = {
  id: string;
  name: string;
  preview: string;
  time: string;
  initials: string;
  color: string;
  unread: number;
};

const MESSAGES: Message[] = [
  {
    id: "1",
    name: "BlueWave Technologies",
    preview: "Congratulations! We'd like to invite you to an interview...",
    time: "10:42",
    initials: "BW",
    color: "#3b82f6",
    unread: 2,
  },
  {
    id: "2",
    name: "IBS Bank HR",
    preview: "Your application is currently under review...",
    time: "Yesterday",
    initials: "IB",
    color: "#0d9488",
    unread: 0,
  },
];

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Pressable style={styles.composeButton}>
          <Feather name="edit-3" size={18} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {MESSAGES.map((msg) => (
            <View key={msg.id} style={styles.msgRow}>
              <View style={[styles.avatar, { backgroundColor: `${msg.color}1A` }]}>
                <Text style={[styles.avatarText, { color: msg.color }]}>{msg.initials}</Text>
              </View>
              <View style={styles.msgBody}>
                <Text style={styles.msgName}>{msg.name}</Text>
                <Text
                  numberOfLines={1}
                  style={styles.msgPreview}
                >
                  {msg.preview}
                </Text>
              </View>
              <View style={styles.msgMeta}>
                <Text style={styles.msgTime}>
                  {msg.time}
                </Text>
                {msg.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{msg.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4,
    color: "#0b1f4b",
  },
  composeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0d6efd",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  list: {
    gap: 4,
  },
  msgRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "800",
  },
  msgBody: {
    flex: 1,
    gap: 3,
  },
  msgName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0b1f4b",
  },
  msgPreview: {
    fontSize: 12,
    color: "#64748b",
  },
  msgMeta: {
    alignItems: "flex-end",
    gap: 6,
  },
  msgTime: {
    fontSize: 11,
    color: "#94a3b8",
  },
  unreadBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0d6efd",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  unreadText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800",
  },
});