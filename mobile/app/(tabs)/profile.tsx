import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const SKILLS = ["JavaScript", "React Native", "UI/UX", "Teamwork"];

type MenuItem = {
  icon: "user" | "file-text" | "bell" | "settings" | "help-circle" | "log-out";
  label: string;
  danger?: boolean;
  route?: string;
};

const MENU_ITEMS: MenuItem[] = [
  { icon: "user", label: "Personal Information" },
  { icon: "file-text", label: "My Resume & Documents" },
  { icon: "bell", label: "Notifications" },
  { icon: "settings", label: "Settings" },
  { icon: "help-circle", label: "Help & Support" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={[styles.portrait, { backgroundColor: "#0d6efd" }]}>
            <Text style={styles.portraitText}>AH</Text>
          </View>
          <Text style={styles.profileName}>Ahmed Hassan</Text>
          <Text style={styles.profileTitle}>
            Frontend Developer · Mogadishu
          </Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Applications</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Skills</Text>
            </View>
          </View>

          <View style={styles.skillsWrap}>
            {SKILLS.map((s, idx) => (
              <View key={idx} style={styles.skillPill}>
                <Text style={styles.skillText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.menuRow,
                idx < MENU_ITEMS.length - 1 && styles.menuRowBorder,
                pressed && styles.menuRowPressed,
              ]}
            >
              <View style={styles.menuIconWrap}>
                <Feather name={item.icon} size={16} color="#0d6efd" />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={16} color="#94a3b8" />
            </Pressable>
          ))}
          <Pressable
            style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
            onPress={handleLogout}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: "rgba(239,68,68,0.1)" }]}>
              <Feather name="log-out" size={16} color="#ef4444" />
            </View>
            <Text style={[styles.menuLabel, { color: "#ef4444" }]}>Logout</Text>
          </Pressable>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: "#e8edf4",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f8fafc",
  },
  portrait: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  portraitText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
    color: "#0b1f4b",
  },
  profileTitle: {
    fontSize: 12,
    marginTop: 2,
    color: "#64748b",
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0b1f4b",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(148, 163, 184, 0.25)",
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  skillPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(13,110,253,0.1)",
  },
  skillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0d6efd",
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#e8edf4",
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f8fafc",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)",
  },
  menuRowPressed: {
    opacity: 0.6,
  },
  menuIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13,110,253,0.08)",
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#0b1f4b",
  },
});