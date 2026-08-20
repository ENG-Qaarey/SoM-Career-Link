import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreenView } from "@/components/splash-screen";

SplashScreen.preventAutoHideAsync();

const SPLASH_MIN_MS = 2800;

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepare() {
      await SplashScreen.hideAsync();
      await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_MS));
      if (!cancelled) {
        setAppReady(true);
      }
    }

    prepare();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!appReady) {
    return (
      <SafeAreaProvider>
        <SplashScreenView durationMs={SPLASH_MIN_MS} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
