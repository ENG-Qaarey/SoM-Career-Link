import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, Platform } from "react-native";

const ACTIVE_TINT = "#0d6efd";

type IconName = keyof typeof Feather.glyphMap;

function TabIcon({
  focused,
  name,
  color,
  size,
}: {
  focused: boolean;
  name: IconName;
  color: string;
  size: number;
}) {
  return (
    <View style={styles.iconWrapper}>
      <Feather name={name} size={size} color={focused ? ACTIVE_TINT : color} />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const bottomPadding = Math.max(16, insets.bottom);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_TINT,
        tabBarInactiveTintColor: "#64748b",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
          elevation: 8,
          paddingTop: 2,
          position: "fixed",
          paddingBottom: bottomPadding,
          paddingHorizontal: 8,
          height: 64 + bottomPadding,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 3,
          fontFamily: Platform.select({
            ios: "SF Pro Text",
            android: "Roboto",
            default: "System",
          }),
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          title: "Applications",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} name="message-square" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused} name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});