import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import AuthSectionOne from "@/components/ui/auth-section-1";

export const metadata: Metadata = {
  title: "Login | CareerLink Somalia",
  description: "Sign in to CareerLink Somalia to manage your profile, applications and saved opportunities.",
};

export default function LoginPage() {
  return (
    <AuthShell footer={false} navbar={false}>
      <AuthSectionOne mode="login" />
    </AuthShell>
  );
}
