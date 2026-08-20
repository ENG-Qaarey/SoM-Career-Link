import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

type SavedItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  initials: string;
  color: string;
  type: string;
};

const SAVED_JOBS: SavedItem[] = [
  {
    id: "1",
    initials: "BW",
    color: "#3b82f6",
    title: "Frontend Developer Intern",
    company: "BlueWave Technologies",
    location: "Mogadishu, Somalia",
    type: "Internship",
  },
  {
    id: "2",
    initials: "IB",
    color: "#0d9488",
    title: "Graduate Trainee Program",
    company: "IBS Bank",
    location: "Mogadishu, Somalia",
    type: "Full-time",
  },
];

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(SAVED_JOBS);

  const removeItem = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
        <Text style={styles.headerCount}>
          {saved.length} saved
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {saved.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Feather name="bookmark" size={36} color="#0d6efd" />
            </View>
            <Text style={styles.emptyTitle}>No saved jobs yet</Text>
            <Text style={styles.emptyText}>
              Bookmark jobs you like and they will show up here.
            </Text>
          </View>
        ) : (
          <View style={styles.jobsList}>
            {saved.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={[styles.jobLogo, { backgroundColor: `${job.color}15` }]}>
                  <Text style={[styles.jobLogoText, { color: job.color }]}>{job.initials}</Text>
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                  <View style={styles.jobMeta}>
                    <Feather name="map-pin" size={12} color="#94a3b8" />
                    <Text style={styles.jobLocation}>{job.location}</Text>
                  </View>
                </View>
                <Pressable style={styles.removeButton} onPress={() => removeItem(job.id)}>
                  <Feather name="trash-2" size={16} color="#94a3b8" />
                </Pressable>
              </View>
            ))}
          </View>
        )}
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
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    backgroundColor: "rgba(13,110,253,0.08)",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0b1f4b",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 240,
    color: "#64748b",
  },
  jobsList: {
    gap: 12,
  },
  jobCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e8edf4",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  jobLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  jobLogoText: {
    fontSize: 15,
    fontWeight: "800",
  },
  jobInfo: {
    flex: 1,
    marginLeft: 14,
    gap: 3,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0b1f4b",
  },
  jobCompany: {
    fontSize: 12,
    color: "#64748b",
  },
  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  jobLocation: {
    fontSize: 11,
    color: "#94a3b8",
  },
  removeButton: {
    padding: 6,
  },
});