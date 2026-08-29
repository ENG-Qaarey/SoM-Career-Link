import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { ScreenHeader } from "@/components/screen-header";
import { INITIAL_NOTIFICATIONS, type Application } from "@/lib/data";
import { useApp } from "@/context/app-provider";
import { STATUS_STEPS } from "@/lib/data";

const TABS = [
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "applications", label: "Applications", icon: "file-text" },
] as const;

const ICONS = {
  job: "briefcase",
  message: "message-circle",
  application: "check-circle",
  interview: "calendar",
  post_reaction: "heart",
  post_comment: "message-square",
  mention: "at-sign",
} as const;

function stepIndex(status: Application["status"]) {
  if (status === "Rejected") return 1;
  return Math.max(0, STATUS_STEPS.indexOf(status));
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { applications, getOpportunity } = useApp();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("notifications");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader title="Notifications" onBack={() => router.back()} />
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Feather name={tab.icon} size={18} color={activeTab === tab.id ? "#2563eb" : "#94a3b8"} />
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "notifications" ? (
          <>
            {INITIAL_NOTIFICATIONS.map((item) => (
              <View key={item.id} style={styles.notificationRow}>
                <View style={styles.iconWrap}>
                  <Feather name={ICONS[item.type]} size={18} color="#2563eb" />
                </View>
                <View style={styles.notificationCopy}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationBody}>{item.body}</Text>
                </View>
                <Text style={styles.notificationTime}>{item.time}</Text>
                {item.unread ? <View style={styles.unreadDot} /> : null}
              </View>
            ))}
          </>
        ) : (
          <>
            {applications.length === 0 ? (
              <View style={styles.empty}>
                <Feather name="file-text" size={48} color="#94a3b8" />
                <Text style={styles.emptyTitle}>No applications yet</Text>
                <Text style={styles.emptyText}>Discover opportunities and apply to get started.</Text>
              </View>
            ) : (
              applications.map((app) => {
                const job = getOpportunity(app.opportunityId);
                if (!job) return null;
                const active = stepIndex(app.status);
                return (
                  <View key={app.id} style={styles.appCard}>
                    <View style={styles.appCardTop}>
                      <View style={[styles.appLogo, { backgroundColor: `${job.color}18` }]}>
                        <Text style={[styles.appLogoText, { color: job.color }]}>{job.initials}</Text>
                      </View>
                      <View style={styles.appInfo}>
                        <Text style={styles.appTitle}>{job.title}</Text>
                        <Text style={styles.appCompany}>{job.company}</Text>
                        <Text style={styles.appDate}>{app.date}</Text>
                      </View>
                      <View style={styles.appStatusBadge}>
                        <Text style={[styles.appStatusText, (styles as any)[`status${app.status.replace(/\s/g, "")}`]]}>{app.status}</Text>
                      </View>
                    </View>
                    <View style={styles.appTimeline}>
                      {STATUS_STEPS.slice(0, 4).map((step, i) => (
                        <View key={step} style={styles.appStep}>
                          <View style={[styles.appDot, i <= active && styles.appDotOn]} />
                          <View style={styles.appStepLine} />
                          <Text style={[styles.appStepLabel, i <= active && styles.appStepLabelOn]}>
                            {step === "Under Review" ? "Review" : step}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
  },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#2563eb", marginBottom: -1 },
  tabText: { fontSize: 14, fontWeight: "700", color: "#64748b" },
  tabTextActive: { color: "#2563eb" },
  content: { padding: 16, paddingBottom: 40 },
  notificationRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationCopy: { flex: 1, gap: 3 },
  notificationTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  notificationBody: { fontSize: 13, lineHeight: 18, color: "#64748b" },
  notificationTime: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563eb",
    marginTop: 6,
  },
  appCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
    gap: 16,
  },
  appCardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  appLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  appLogoText: { fontWeight: "800", fontSize: 14 },
  appInfo: { flex: 1, gap: 3 },
  appTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  appCompany: { fontSize: 13, color: "#64748b" },
  appDate: { fontSize: 12, color: "#94a3b8" },
  appStatusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: "flex-start" },
  appStatusText: { fontSize: 11, fontWeight: "700", color: "#fff" },
  statusApplied: { backgroundColor: "#2563eb" },
  statusUnderReview: { backgroundColor: "#f59e0b" },
  statusShortlisted: { backgroundColor: "#7c3aed" },
  statusInterview: { backgroundColor: "#0f766e" },
  statusAccepted: { backgroundColor: "#16a34a" },
  statusRejected: { backgroundColor: "#ef4444" },
  appTimeline: { flexDirection: "row", justifyContent: "space-between" },
  appStep: { alignItems: "center", flex: 1 },
  appDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#e2e8f0", marginBottom: 6 },
  appDotOn: { backgroundColor: "#2563eb" },
  appStepLine: { position: "absolute", top: 5, left: -9999, right: -9999, height: 1, backgroundColor: "#e2e8f0", zIndex: -1 },
  appStepLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "600", textAlign: "center", width: 60 },
  appStepLabelOn: { color: "#2563eb" },
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  emptyText: { fontSize: 14, color: "#64748b", textAlign: "center", maxWidth: 260 },
});