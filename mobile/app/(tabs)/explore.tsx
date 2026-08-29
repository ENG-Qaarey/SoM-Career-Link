import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ScreenHeader } from "@/components/screen-header";
import { useApp } from "@/context/app-provider";
import type { OpportunityType } from "@/lib/data";

const FILTERS: ("All" | OpportunityType)[] = [
  "All",
  "Internship",
  "Full-time",
  "Graduate Program",
];

export default function ExploreScreen() {
  const router = useRouter();
  const { opportunities, savedPostIds, toggleSave } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((job) => {
      const matchesFilter = filter === "All" || job.type === filter;
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, opportunities, query]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader title="Explore" subtitle="Find internships, jobs and programs" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <Feather name="search" size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title, skill or company"
            placeholderTextColor="#94a3b8"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FILTERS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.chip, filter === item && styles.chipOn]}
            >
              <Text style={[styles.chipText, filter === item && styles.chipTextOn]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.count}>
          {results.length} opportunit{results.length === 1 ? "y" : "ies"}
        </Text>

        {results.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No opportunities found</Text>
            <Text style={styles.emptyText}>Try a different search or clear your filters.</Text>
          </View>
        ) : (
          results.map((job) => {
            const saved = savedPostIds.includes(job.id);
            return (
              <Pressable
                key={job.id}
                style={styles.card}
                onPress={() => router.push(`/opportunity/${job.id}`)}
              >
                <View style={[styles.logo, { backgroundColor: `${job.color}18` }]}>
                  <Text style={[styles.logoText, { color: job.color }]}>{job.initials}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{job.title}</Text>
                  <Text style={styles.company}>{job.company}</Text>
                  <Text style={styles.meta}>
                    {job.location} · {job.type} · {job.paid ? "Paid" : "Unpaid"}
                  </Text>
                  <Text style={styles.posted}>{job.posted}</Text>
                </View>
                <Pressable hitSlop={10} onPress={() => toggleSave(job.id)}>
                  <Feather name="heart" size={20} color={saved ? "#ef4444" : "#94a3b8"} />
                </Pressable>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 16, paddingBottom: 40 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  searchInput: { flex: 1, fontSize: 15, color: "#0f172a" },
  filters: { gap: 8, paddingVertical: 14 },
  chip: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  chipOn: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  chipText: { fontSize: 13, fontWeight: "700", color: "#64748b" },
  chipTextOn: { color: "#ffffff" },
  count: { fontSize: 13, color: "#64748b", marginBottom: 12, fontWeight: "600" },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontWeight: "800", fontSize: 14 },
  info: { flex: 1, marginHorizontal: 12 },
  title: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  company: { marginTop: 2, fontSize: 13, color: "#64748b" },
  meta: { marginTop: 6, fontSize: 12, color: "#94a3b8" },
  posted: { marginTop: 4, fontSize: 12, color: "#2563eb", fontWeight: "600" },
  empty: { alignItems: "center", paddingVertical: 48 },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  emptyText: { marginTop: 6, fontSize: 13, color: "#64748b" },
});
