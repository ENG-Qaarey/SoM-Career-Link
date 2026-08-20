import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Application = {
  id: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected";
  date: string;
};

const APPLICATIONS: Application[] = [
  {
    id: "1",
    initials: "BW",
    color: "#3b82f6",
    title: "Frontend Developer Intern",
    company: "BlueWave Technologies",
    status: "Interview",
    date: "Applied Aug 1",
  },
  {
    id: "2",
    initials: "IB",
    color: "#0d9488",
    title: "Graduate Trainee Program",
    company: "IBS Bank",
    status: "In Review",
    date: "Applied Jul 28",
  },
];

const STATUS_COLORS: Record<Application["status"], string> = {
  Applied: "#64748b",
  "In Review": "#f59e0b",
  Interview: "#8b5cf6",
  Offer: "#10b981",
  Rejected: "#ef4444",
};

export default function ApplicationsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Applications</Text>
        <Text style={styles.headerCount}>
          {APPLICATIONS.length} active
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.jobsList}>
          {APPLICATIONS.map((app) => (
            <View key={app.id} style={styles.appCard}>
              <View style={[styles.appLogo, { backgroundColor: `${app.color}15` }]}>
                <Text style={[styles.appLogoText, { color: app.color }]}>{app.initials}</Text>
              </View>
              <View style={styles.appInfo}>
                <Text style={styles.appTitle}>{app.title}</Text>
                <Text style={styles.appCompany}>{app.company}</Text>
                <Text style={styles.appDate}>{app.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${STATUS_COLORS[app.status]}1A` }]}>
                <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[app.status] }]} />
                <Text style={[styles.statusText, { color: STATUS_COLORS[app.status] }]}>{app.status}</Text>
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
  headerCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  jobsList: {
    gap: 12,
  },
  appCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e8edf4",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  appLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  appLogoText: {
    fontSize: 15,
    fontWeight: "800",
  },
  appInfo: {
    flex: 1,
    marginLeft: 14,
    gap: 2,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0b1f4b",
  },
  appCompany: {
    fontSize: 12,
    color: "#64748b",
  },
  appDate: {
    fontSize: 11,
    marginTop: 2,
    color: "#94a3b8",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
});