import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import AuthSectionOne from "@/components/ui/auth-section-1";

export const metadata: Metadata = {
  title: "Create Account | CareerLink Somalia",
  description:
    "Create a free CareerLink Somalia account as a student, employer or university partner.",
};

export default function RegisterPage() {
  return (
    <AuthShell footer={false} navbar={false}>
      <AuthSectionOne mode="register" />
    </AuthShell>
  );
}
