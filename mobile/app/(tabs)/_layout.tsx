import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/app-provider";

const ACTIVE = "#2563eb";
const INACTIVE = "#94a3b8";

type IoniconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  focused,
  active,
  inactive,
}: {
  focused: boolean;
  active: IoniconName;
  inactive: IoniconName;
}) {
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={focused ? active : inactive} size={22} color={focused ? ACTIVE : INACTIVE} />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { unreadMessages } = useApp();
  const bottom = Math.max(insets.bottom, 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          height: 62 + bottom,
          paddingTop: 8,
          paddingBottom: bottom,
          shadowColor: "#0b1f4b",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
          elevation: 16,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="home" inactive="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="search" inactive="search-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: "Posts",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="newspaper" inactive="newspaper-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarBadge: unreadMessages > 0 ? unreadMessages : undefined,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="chatbubble" inactive="chatbubble-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} active="person" inactive="person-outline" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
