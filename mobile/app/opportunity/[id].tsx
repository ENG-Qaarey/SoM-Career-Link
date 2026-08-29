import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScreenHeader } from "@/components/screen-header";
import { useApp } from "@/context/app-provider";

export default function OpportunityDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { getOpportunity, toggleSave, savedPostIds, applyTo, hasApplied } = useApp();
  const job = getOpportunity(id);

  if (!job) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Opportunity" onBack={() => router.back()} />
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Opportunity not found</Text>
          <Pressable style={styles.primary} onPress={() => router.replace("/(tabs)/explore")}>
            <Text style={styles.primaryText}>Back to Explore</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const saved = savedPostIds.includes(job.id);
  const applied = hasApplied(job.id);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader title="Opportunity" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.logo, { backgroundColor: `${job.color}18` }]}>
          <Text style={[styles.logoText, { color: job.color }]}>{job.initials}</Text>
        </View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.meta}>
          {job.location} · {job.type} · {job.paid ? "Paid" : "Unpaid"}
        </Text>
        <Text style={styles.meta}>Posted {job.posted} · Deadline {job.deadline}</Text>

        <Text style={styles.section}>About this role</Text>
        <Text style={styles.body}>{job.description}</Text>

        <Text style={styles.section}>Requirements</Text>
        {job.requirements.map((item) => (
          <Text key={item} style={styles.bullet}>
            • {item}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.save} onPress={() => toggleSave(job.id)}>
          <Text style={styles.saveText}>{saved ? "Saved" : "Save"}</Text>
        </Pressable>
        <Pressable
          style={[styles.primary, applied && styles.primaryDisabled]}
          onPress={() => !applied && applyTo(job.id)}
          disabled={applied}
        >
          <Text style={styles.primaryText}>{applied ? "Applied" : "Apply"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 20, paddingBottom: 40 },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  logoText: { fontSize: 20, fontWeight: "800" },
  title: { fontSize: 24, fontWeight: "800", color: "#0f172a", letterSpacing: -0.4 },
  company: { marginTop: 6, fontSize: 16, color: "#64748b" },
  meta: { marginTop: 6, fontSize: 13, color: "#94a3b8" },
  section: { marginTop: 24, fontSize: 16, fontWeight: "800", color: "#0f172a" },
  body: { marginTop: 8, fontSize: 15, lineHeight: 22, color: "#334155" },
  bullet: { marginTop: 8, fontSize: 15, color: "#334155" },
  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },
  save: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#2563eb", fontWeight: "800", fontSize: 15 },
  primary: {
    flex: 1.4,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryDisabled: { backgroundColor: "#93c5fd" },
  primaryText: { color: "#ffffff", fontWeight: "800", fontSize: 15 },
  empty: { padding: 24, alignItems: "center", gap: 16 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
});
