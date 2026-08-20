import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

type JobItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  initials: string;
  color: string;
  type: string;
};

const RECOMMENDED_JOBS: JobItem[] = [
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
  {
    id: "3",
    initials: "CL",
    color: "#8b5cf6",
    title: "Mobile Developer Intern",
    company: "CareerLink Lab",
    location: "Hargeisa, Somalia",
    type: "Internship",
  },
];

const CATEGORIES = [
  { icon: "briefcase" as const, label: "Internships" },
  { icon: "home" as const, label: "Jobs" },
  { icon: "award" as const, label: "Programs" },
  { icon: "calendar" as const, label: "Events" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header bar */}
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <View style={styles.headerLeft}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.headerLogo}
            contentFit="contain"
          />
          <Text style={styles.headerTitle}>CareerLink</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={17} color="#0b1f4b" />
            <View style={styles.bellDot} />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={handleLogout}>
            <Feather name="log-out" size={17} color="#0b1f4b" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hello, Ahmed 👋</Text>
          <Text style={styles.subtitle}>Ready to take the next step in your career?</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Feather name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, internships, programs..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Promo Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerTitle}>Find Opportunities That Match Your Skills</Text>
            <Pressable style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explore Now</Text>
            </Pressable>
          </View>
          <View style={styles.bannerArt}>
            <Feather name="trending-up" size={40} color="rgba(255, 255, 255, 0.3)" />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((item, idx) => (
              <View key={idx} style={styles.categoryItem}>
                <View style={styles.categoryIconWrapper}>
                  <Feather name={item.icon} size={18} color="#0d6efd" />
                </View>
                <Text style={styles.categoryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Jobs */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See all</Text>
            </Pressable>
          </View>

          <View style={styles.jobsList}>
            {RECOMMENDED_JOBS.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={[styles.jobLogo, { backgroundColor: `${job.color}15` }]}>
                  <Text style={[styles.jobLogoText, { color: job.color }]}>{job.initials}</Text>
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                  <View style={styles.jobMeta}>
                    <Feather name="map-pin" size={11} color="#94a3b8" />
                    <Text style={styles.jobLocation}>{job.location}</Text>
                  </View>
                  <View style={styles.tagWrapper}>
                    <Text style={styles.jobTag}>{job.type}</Text>
                  </View>
                </View>
                <Pressable style={styles.bookmarkButton}>
                  <Feather name="bookmark" size={16} color="#64748b" />
                </Pressable>
              </View>
            ))}
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLogo: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0b1f4b",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ef4444",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  welcomeSection: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0b1f4b",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
    lineHeight: 19,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#0b1f4b",
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#0d6efd",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    overflow: "hidden",
    alignItems: "center",
  },
  bannerInfo: {
    flex: 1,
    gap: 12,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 21,
  },
  bannerButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#0d6efd",
    fontSize: 12,
    fontWeight: "700",
  },
  bannerArt: {
    marginLeft: 12,
    opacity: 0.8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0b1f4b",
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 13,
    color: "#0d6efd",
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
  },
  categoryIconWrapper: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  jobsList: {
    gap: 10,
  },
  jobCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8edf4",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
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
    marginLeft: 12,
    gap: 2,
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
    marginTop: 1,
  },
  jobLocation: {
    fontSize: 11,
    color: "#94a3b8",
  },
  tagWrapper: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 5,
  },
  jobTag: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0d6efd",
  },
  bookmarkButton: {
    padding: 4,
  },
});