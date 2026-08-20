import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const iconSource = isDark
    ? require("@/assets/images/icon1.png")
    : require("@/assets/images/icon.png");

  const handleSubmit = () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.replace("/home");
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header bar */}
      <View style={[styles.header, { paddingTop: insets.top, minHeight: 52 + insets.top }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            isDark ? styles.backButtonDark : styles.backButtonLight,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Feather name="chevron-left" size={20} color={isDark ? "#ffffff" : "#0b1f4b"} />
        </Pressable>

        <View style={styles.headerLogoContainer}>
          <Image source={iconSource} style={styles.headerLogo} contentFit="contain" />
          <Text style={[styles.headerTitle, isDark ? styles.textDark : styles.textLight]}>
            CareerLink
          </Text>
        </View>

        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 20) + 16, justifyContent: "center" }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Heading */}
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, isDark ? styles.descDark : styles.descLight]}>
              Sign in to access job applications &amp; opportunities.
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Feather name="alert-circle" size={15} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>
                Email Address
              </Text>
              <View style={[styles.inputWrapper, isDark ? styles.inputDark : styles.inputLight]}>
                <Feather name="mail" size={16} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, isDark ? styles.inputTextDark : styles.inputTextLight]}
                  placeholder="name@example.com"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <View style={styles.passwordHeader}>
                <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>
                  Password
                </Text>
                <Pressable onPress={() => {}}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>
              <View style={[styles.inputWrapper, isDark ? styles.inputDark : styles.inputLight]}>
                <Feather name="lock" size={16} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, isDark ? styles.inputTextDark : styles.inputTextLight]}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconBtn}>
                  <Feather name={showPassword ? "eye-off" : "eye"} size={16} color="#94a3b8" />
                </Pressable>
              </View>
            </View>

            {/* Remember Me */}
            <View style={styles.rememberRow}>
              <Text style={[styles.rememberText, isDark ? styles.descDark : styles.descLight]}>
                Remember me on this device
              </Text>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: isDark ? "#334155" : "#e2e8f0", true: "#93c5fd" }}
                thumbColor={rememberMe ? "#0d6efd" : "#f4f3f4"}
                disabled={isLoading}
                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
              />
            </View>

            {/* Primary Submit Button */}
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                isLoading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Sign In</Text>
              )}
            </Pressable>
          </View>

          {/* Social Sign In Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, isDark ? styles.dividerDark : styles.dividerLight]} />
            <Text style={[styles.dividerText, isDark ? styles.descDark : styles.descLight]}>
              Or continue with
            </Text>
            <View style={[styles.dividerLine, isDark ? styles.dividerDark : styles.dividerLight]} />
          </View>

          {/* Google Sign In */}
          <Pressable
            style={({ pressed }) => [
              styles.googleBtn,
              isDark ? styles.googleBtnDark : styles.googleBtnLight,
              pressed && styles.googleBtnPressed,
            ]}
            onPress={() => handleSubmit()}
          >
            <GoogleIcon size={19} />
            <Text style={[styles.googleBtnText, isDark ? styles.textDark : styles.textLight]}>
              Continue with Google
            </Text>
          </Pressable>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDark ? styles.descDark : styles.descLight]}>
              Don&apos;t have an account?{" "}
              <Text
                style={styles.toggleLink}
                onPress={() => router.replace("/register")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "#ffffff",
  },
  containerDark: {
    backgroundColor: "#0b1220",
  },
  header: {
    paddingHorizontal: 16,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonLight: {
    backgroundColor: "#f8fafc",
  },
  backButtonDark: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  headerLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerLogo: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  titleWrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 4,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fca5a5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    gap: 6,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    gap: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#0d6efd",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    height: 45,
  },
  inputLight: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
  },
  inputDark: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
  },
  inputTextLight: {
    color: "#0b1f4b",
  },
  inputTextDark: {
    color: "#ffffff",
  },
  eyeIconBtn: {
    padding: 4,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  rememberText: {
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#0d6efd",
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#0d6efd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonPressed: {
    backgroundColor: "#0a58ca",
  },
  submitButtonDisabled: {
    backgroundColor: "#93c5fd",
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLight: {
    backgroundColor: "#e2e8f0",
  },
  dividerDark: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dividerText: {
    fontSize: 11.5,
    fontWeight: "600",
  },
  googleBtn: {
    width: "100%",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  googleBtnLight: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
  },
  googleBtnDark: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  googleBtnPressed: {
    opacity: 0.8,
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
  },
  toggleLink: {
    color: "#0d6efd",
    fontWeight: "800",
  },

  // Common Color Styles
  textLight: {
    color: "#0b1f4b",
  },
  textDark: {
    color: "#ffffff",
  },
  descLight: {
    color: "#64748b",
  },
  descDark: {
    color: "#94a3b8",
  },
  cardLight: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
  },
  cardDark: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
});
