import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreenView } from "@/components/splash-screen";
import { AppProvider } from "@/context/app-provider";

SplashScreen.preventAutoHideAsync();

const SPLASH_MIN_MS = 2200;

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepare() {
      await SplashScreen.hideAsync();
      await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_MS));
      if (!cancelled) setAppReady(true);
    }

    prepare();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!appReady) {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SplashScreenView durationMs={SPLASH_MIN_MS} />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="opportunity/[id]" />
            <Stack.Screen name="chat/[id]" />
            <Stack.Screen name="notifications" />
          </Stack>
        </AppProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
