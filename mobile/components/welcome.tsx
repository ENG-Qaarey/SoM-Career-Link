import { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  useColorScheme,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Defs, RadialGradient, Rect, Circle, Stop } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

type BackgroundProps = {
  isDark: boolean;
};

const INFO_SLIDES = [
  {
    id: "1",
    icon: "briefcase" as const,
    badge: "Hot Opportunities",
    highlight: "1,200+ Jobs",
    title: "Internships & Jobs",
    desc: "Discover local and remote internship and job opportunities tailored for young professionals across Somalia.",
    accent: "#0d6efd",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    icon: "award" as const,
    badge: "100% Verified",
    highlight: "Top Employers",
    title: "Verified Companies",
    desc: "Connect directly with top-tier verified telecom, banking, and tech employers seeking local talent.",
    accent: "#10b981",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    icon: "book-open" as const,
    badge: "Skill Accelerator",
    highlight: "Fast Acceleration",
    title: "Graduate Programs",
    desc: "Launch your career with structured graduate training and skill acceleration programs after university.",
    accent: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    icon: "calendar" as const,
    badge: "Live Networking",
    highlight: "Virtual Fairs",
    title: "Networking Events",
    desc: "Gain exclusive access to local virtual career fairs, developer workshops, and top networking events.",
    accent: "#f59e0b",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    icon: "file-text" as const,
    badge: "Fast Track",
    highlight: "1-Tap Profile",
    title: "Smart Applications",
    desc: "Build a professional profile, create resumes, and track your active job applications in real-time.",
    accent: "#ec4899",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
];

function PremiumBackground({ isDark }: BackgroundProps) {
  const stop0 = isDark ? "#0b1220" : "#ffffff";
  const stop1 = isDark ? "#070d19" : "#eef6ff";
  const stop2 = isDark ? "#040810" : "#93c5fd";
  const stop3 = isDark ? "#010204" : "#0d6efd";
  const glowColor = isDark ? "#60a5fa" : "#0a58ca";
  const glowOpacity = isDark ? 0.18 : 0.25;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="mainBg"
            cx="50%"
            cy="50%"
            rx="85%"
            ry="85%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor={stop0} stopOpacity="1" />
            <Stop offset="30%" stopColor={stop1} stopOpacity="1" />
            <Stop offset="70%" stopColor={stop2} stopOpacity="1" />
            <Stop offset="100%" stopColor={stop3} stopOpacity="1" />
          </RadialGradient>

          <RadialGradient id="cornerGlow" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity={glowOpacity} />
            <Stop offset="100%" stopColor={glowColor} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#mainBg)" />

        {/* Corner Glow Blobs */}
        <Circle cx="0" cy="0" r="220" fill="url(#cornerGlow)" />
        <Circle cx={SCREEN_WIDTH} cy="0" r="180" fill="url(#cornerGlow)" />
        <Circle cx="0" cy={SCREEN_HEIGHT} r="250" fill="url(#cornerGlow)" />
        <Circle cx={SCREEN_WIDTH} cy={SCREEN_HEIGHT} r="220" fill="url(#cornerGlow)" />

        {/* Twinkling Stars */}
        <Circle cx={SCREEN_WIDTH * 0.15} cy={SCREEN_HEIGHT * 0.12} r="1.5" fill="#ffffff" opacity={isDark ? 0.65 : 0.45} />
        <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.08} r="2" fill="#ffffff" opacity={isDark ? 0.85 : 0.55} />
        <Circle cx={SCREEN_WIDTH * 0.45} cy={SCREEN_HEIGHT * 0.18} r="1.2" fill="#ffffff" opacity={isDark ? 0.45 : 0.35} />
        <Circle cx={SCREEN_WIDTH * 0.85} cy={SCREEN_HEIGHT * 0.22} r="2.5" fill="#a5f3fc" opacity={isDark ? 0.8 : 0.55} />
        <Circle cx={SCREEN_WIDTH * 0.08} cy={SCREEN_HEIGHT * 0.35} r="1.8" fill="#a5f3fc" opacity={isDark ? 0.55 : 0.35} />
        <Circle cx={SCREEN_WIDTH * 0.9} cy={SCREEN_HEIGHT * 0.42} r="1.2" fill="#ffffff" opacity={isDark ? 0.75 : 0.45} />
        <Circle cx={SCREEN_WIDTH * 0.22} cy={SCREEN_HEIGHT * 0.6} r="1" fill="#ffffff" opacity={isDark ? 0.5 : 0.3} />
        <Circle cx={SCREEN_WIDTH * 0.75} cy={SCREEN_HEIGHT * 0.72} r="1.5" fill="#ffffff" opacity={isDark ? 0.6 : 0.35} />
      </Svg>
    </View>
  );
}

export function WelcomeView() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const iconSource = isDark 
    ? require("@/assets/images/icon1.png") // white logo
    : require("@/assets/images/icon.png"); // colored logo

  // Interactive Slider State & Timer Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextIndex = (prev + 1) % INFO_SLIDES.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    if (index >= 0 && index < INFO_SLIDES.length) {
      setCurrentSlide(index);
    }
    startAutoPlay();
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= INFO_SLIDES.length) return;
    setCurrentSlide(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    startAutoPlay();
  };

  const getItemLayout = (_: any, index: number) => ({
    length: CARD_WIDTH,
    offset: CARD_WIDTH * index,
    index,
  });

  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* SVG Programmatic Gradient Background */}
      <PremiumBackground isDark={isDark} />

      {/* Main Content Scrollable Area - Constrained to top of bottomSheet */}
        <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { flexGrow: 1, paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 20) + 180 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Lockup */}
        <View style={styles.logoWrapper}>
          <Image
            source={iconSource}
            style={styles.logoIcon}
            contentFit="contain"
          />
          <Text style={[styles.logoName, isDark ? styles.textDark : styles.textLight]}>
            CareerLink
          </Text>
          <View style={styles.somaliaDivider}>
            <View style={[styles.dividerLine, isDark ? styles.dividerDark : styles.dividerLight]} />
            <Text style={[styles.somaliaText, isDark ? styles.textDark : styles.textLight]}>
              SOMALIA
            </Text>
            <View style={[styles.dividerLine, isDark ? styles.dividerDark : styles.dividerLight]} />
          </View>
          <Text style={styles.tagline}>Connect. Grow. Succeed.</Text>

          {/* Social Proof Avatar Bar */}
          <View style={styles.socialProofBar}>
            <View style={styles.avatarGroup}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" }}
                style={[styles.avatar, styles.avatarOverlap]}
              />
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop" }}
                style={[styles.avatar, styles.avatarOverlap]}
              />
            </View>
            <Text style={[styles.socialProofText, isDark ? styles.descDark : styles.descLight]}>
              Joined by <Text style={styles.proofHighlight}>10,000+</Text> talent in Somalia
            </Text>
          </View>
        </View>

        {/* Informative Interactive Slider Section */}
        <View style={[styles.infoSection, { flex: 1, justifyContent: "space-between" }]}>
          <View style={styles.sliderHeader}>
            <View>
              <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
                Explore CareerLink
              </Text>
              <Text style={[styles.sectionSubtitle, isDark ? styles.descDark : styles.descLight]}>
                Swipe to discover features
              </Text>
            </View>
            
            <View style={styles.navigationControls}>
              <Text style={[styles.counterText, isDark ? styles.descDark : styles.descLight]}>
                <Text style={styles.counterCurrent}>0{currentSlide + 1}</Text> / 0{INFO_SLIDES.length}
              </Text>
              <View style={styles.arrowGroup}>
                <Pressable
                  style={({ pressed }) => [
                    styles.arrowBtn,
                    isDark ? styles.arrowBtnDark : styles.arrowBtnLight,
                    currentSlide === 0 && styles.arrowDisabled,
                    pressed && styles.arrowPressed,
                  ]}
                  onPress={() => goToSlide(currentSlide - 1)}
                  disabled={currentSlide === 0}
                >
                  <Feather
                    name="chevron-left"
                    size={16}
                    color={currentSlide === 0 ? (isDark ? "#475569" : "#cbd5e1") : (isDark ? "#ffffff" : "#0b1f4b")}
                  />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.arrowBtn,
                    isDark ? styles.arrowBtnDark : styles.arrowBtnLight,
                    currentSlide === INFO_SLIDES.length - 1 && styles.arrowDisabled,
                    pressed && styles.arrowPressed,
                  ]}
                  onPress={() => goToSlide(currentSlide + 1)}
                  disabled={currentSlide === INFO_SLIDES.length - 1}
                >
                  <Feather
                    name="chevron-right"
                    size={16}
                    color={currentSlide === INFO_SLIDES.length - 1 ? (isDark ? "#475569" : "#cbd5e1") : (isDark ? "#ffffff" : "#0b1f4b")}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Swipeable FlatList */}
          <FlatList
            ref={flatListRef}
            data={INFO_SLIDES}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            getItemLayout={getItemLayout}
            onScrollBeginDrag={stopAutoPlay}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            style={styles.flatListContainer}
            renderItem={({ item }) => (
              <View style={[styles.sliderCard, isDark ? styles.cardDark : styles.cardLight]}>
                {/* Hero Image Banner inside Card */}
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    contentFit="cover"
                    transition={200}
                  />
                  {/* Top Badge & Highlight Bar overlay on Image */}
                  <View style={styles.cardHeaderOverlayRow}>
                    <View style={[styles.badgePill, { backgroundColor: "rgba(0,0,0,0.55)", borderColor: item.accent }]}>
                      <View style={[styles.badgeDot, { backgroundColor: item.accent }]} />
                      <Text style={[styles.badgeText, { color: "#ffffff" }]}>
                        {item.badge}
                      </Text>
                    </View>
                    <View style={[styles.highlightPill, { backgroundColor: "rgba(0,0,0,0.55)" }]}>
                      <Text style={[styles.highlightText, { color: "#ffffff" }]}>
                        {item.highlight}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Main Card Body */}
                <View style={styles.cardBody}>
                  <View style={[styles.featureIconContainer, { backgroundColor: item.accent + "1F" }]}>
                    <Feather name={item.icon} size={22} color={item.accent} />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={[styles.featureTitle, isDark ? styles.textDark : styles.textLight]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.featureDesc, isDark ? styles.descDark : styles.descLight]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>

                {/* Card Footer Perk Tag */}
                <View style={[styles.cardFooterRow, isDark ? styles.footerDark : styles.footerLight]}>
                  <Feather name="check-circle" size={13} color={item.accent} />
                  <Text style={[styles.footerText, { color: item.accent }]}>
                    CareerLink Verified Somalia Network
                  </Text>
                </View>
              </View>
            )}
          />

          {/* Interactive Indicator Dots */}
          <View style={styles.indicatorContainer}>
            {INFO_SLIDES.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => goToSlide(index)}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              >
                <View
                  style={[
                    styles.dot,
                    index === currentSlide
                      ? [styles.activeDot, { backgroundColor: item.accent }]
                      : { backgroundColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(11,31,75,0.15)" }
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sheet Card - Sits exactly at the bottom matching the requested layout */}
      <View style={[styles.bottomSheet, isDark ? styles.bottomSheetDark : styles.bottomSheetLight, { paddingBottom: Math.max(insets.bottom, 20), position: "absolute", bottom: 0, left: 0, right: 0 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonPrimary,
            pressed ? styles.buttonPrimaryPressed : undefined,
          ]}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonTextPrimary}>Get Started</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonOutline,
            isDark ? styles.buttonOutlineDark : styles.buttonOutlineLight,
            pressed ? styles.buttonOutlinePressed : undefined,
          ]}
          onPress={() => router.push("/login")}
        >
          <Text style={[styles.buttonTextOutline, isDark ? styles.buttonOutlineTextDark : styles.buttonOutlineTextLight]}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 64,
    height: 64,
  },
  logoName: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 6,
    letterSpacing: -0.5,
  },
  somaliaDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  dividerLine: {
    width: 24,
    height: 1,
  },
  somaliaText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 3,
    paddingLeft: 3,
  },
  tagline: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0d6efd",
    marginTop: 8,
    textAlign: "center",
  },
  socialProofBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  socialProofText: {
    fontSize: 11,
    fontWeight: "500",
  },
  proofHighlight: {
    color: "#0d6efd",
    fontWeight: "800",
  },
  infoSection: {
    width: "100%",
    gap: 12,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  navigationControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  counterText: {
    fontSize: 11,
    fontWeight: "600",
  },
  counterCurrent: {
    color: "#0d6efd",
    fontWeight: "800",
  },
  arrowGroup: {
    flexDirection: "row",
    gap: 6,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  arrowBtnLight: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(13, 110, 253, 0.15)",
  },
  arrowBtnDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  arrowDisabled: {
    opacity: 0.4,
  },
  arrowPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  flatListContainer: {
    width: CARD_WIDTH,
    alignSelf: "center",
  },
  sliderCard: {
    width: CARD_WIDTH,
    minHeight: 230,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "space-between",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImageContainer: {
    width: "100%",
    height: 95,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardHeaderOverlayRow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  highlightPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highlightPillLight: {
    backgroundColor: "rgba(11, 31, 75, 0.05)",
  },
  highlightPillDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  highlightText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  footerLight: {
    backgroundColor: "rgba(13, 110, 253, 0.06)",
  },
  footerDark: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  footerText: {
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    height: 6,
    borderRadius: 3,
  },
  bottomSheet: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonPrimary: {
    backgroundColor: "#0d6efd",
  },
  buttonPrimaryPressed: {
    backgroundColor: "#0a58ca",
  },
  buttonOutline: {
    borderWidth: 1.5,
  },
  buttonOutlinePressed: {
    backgroundColor: "rgba(13, 110, 253, 0.08)",
  },
  buttonTextPrimary: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTextOutline: {
    fontSize: 16,
    fontWeight: "700",
  },

  // Color Scheme Specific Styling
  textLight: {
    color: "#0b1f4b",
  },
  textDark: {
    color: "#ffffff",
  },
  dividerLight: {
    backgroundColor: "rgba(11, 31, 75, 0.25)",
  },
  dividerDark: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  cardLight: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderColor: "rgba(13, 110, 253, 0.15)",
  },
  cardDark: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  descLight: {
    color: "#64748b",
  },
  descDark: {
    color: "#94a3b8",
  },
  bottomSheetLight: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  bottomSheetDark: {
    backgroundColor: "#0b1220",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },
  buttonOutlineLight: {
    borderColor: "#0d6efd",
    backgroundColor: "#ffffff",
  },
  buttonOutlineDark: {
    borderColor: "#0d6efd",
    backgroundColor: "#0b1220",
  },
  buttonOutlineTextLight: {
    color: "#0d6efd",
  },
  buttonOutlineTextDark: {
    color: "#0d6efd",
  },
});

