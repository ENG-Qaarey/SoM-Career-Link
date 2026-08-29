import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export type JobCardData = {
  id: string;
  title: string;
  company: string;
  location: string;
  initials: string;
  color: string;
  type: string;
};

type JobCardProps = {
  job: JobCardData;
  saved?: boolean;
  onSave?: () => void;
};

export function JobCard({ job, saved = false, onSave }: JobCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={[styles.logo, { backgroundColor: `${job.color}18` }]}>
        <Text style={[styles.logoText, { color: job.color }]}>{job.initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {job.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {job.company}
        </Text>
        <View style={styles.metaRow}>
          <Feather name="map-pin" size={12} color="#94a3b8" />
          <Text style={styles.meta}>{job.location}</Text>
        </View>
        <View style={styles.metaRow}>
          <Feather name="briefcase" size={12} color="#94a3b8" />
          <Text style={styles.meta}>{job.type}</Text>
        </View>
      </View>
      <Pressable hitSlop={10} onPress={onSave} style={styles.bookmark}>
        <Feather
          name="bookmark"
          size={20}
          color={saved ? "#0d6efd" : "#94a3b8"}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 14,
    shadowColor: "#0b1f4b",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 15,
    fontWeight: "800",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.2,
  },
  company: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748b",
  },
  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  meta: {
    fontSize: 12,
    color: "#94a3b8",
  },
  bookmark: {
    paddingTop: 2,
  },
});
