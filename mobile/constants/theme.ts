export type ThemeName = "light" | "dark";

export type AppThemeColors = {
  background: string;
  hero: string;
  heroText: string;
  heroMuted: string;
  heroRule: string;
  sheet: string;
  text: string;
  muted: string;
  border: string;
  inputBg: string;
  primary: string;
  primaryText: string;
  outlineBg: string;
  outlinePressed: string;
  splashBg: string;
  progressTrack: string;
  statusBar: "light" | "dark";
  logoBlend: "lighten" | "darken" | "normal";
};

/** Matches CareerLink web tokens in career_web/app/globals.css */
export const AppColors: Record<ThemeName, AppThemeColors> = {
  light: {
    background: "#ffffff",
    hero: "#0d6efd",
    heroText: "#ffffff",
    heroMuted: "rgba(255,255,255,0.92)",
    heroRule: "rgba(255,255,255,0.75)",
    sheet: "#ffffff",
    text: "#0b1f4b",
    muted: "#64748b",
    border: "#e2e8f0",
    inputBg: "#f8fafc",
    primary: "#0d6efd",
    primaryText: "#ffffff",
    outlineBg: "#ffffff",
    outlinePressed: "#eff6ff",
    splashBg: "#eef5ff",
    progressTrack: "rgba(13, 110, 253, 0.18)",
    statusBar: "light",
    logoBlend: "lighten",
  },
  dark: {
    background: "#050a14",
    hero: "#050a14",
    heroText: "#f8fafc",
    heroMuted: "#94a3b8",
    heroRule: "rgba(148, 163, 184, 0.45)",
    sheet: "#0b1220",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "rgba(148, 163, 184, 0.15)",
    inputBg: "#050a14",
    primary: "#0d6efd",
    primaryText: "#ffffff",
    outlineBg: "transparent",
    outlinePressed: "rgba(13, 110, 253, 0.14)",
    splashBg: "#050a14",
    progressTrack: "rgba(96, 165, 250, 0.2)",
    statusBar: "light",
    logoBlend: "lighten",
  },
};
