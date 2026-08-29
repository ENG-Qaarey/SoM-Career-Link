"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

type AuthSectionOneProps = {
  mode?: "login" | "register";
};

const termsText = (
  <>
    By creating an account, you agree to our{" "}
    <Link
      href={routes.terms}
      className="font-medium text-[#0d6efd] underline underline-offset-2 dark:text-[#3b82f6]"
    >
      Terms and Services
    </Link>{" "}
    and{" "}
    <Link
      href={routes.privacy}
      className="font-medium text-[#0d6efd] underline underline-offset-2 dark:text-[#3b82f6]"
    >
      Privacy Policy
    </Link>
  </>
);

export default function AuthSectionOne({
  mode = "register",
}: AuthSectionOneProps) {
  const isRegister = mode === "register";

  const formFields = isRegister
    ? [
        {
          label: "First Name",
          placeholder: "Enter your First name",
          type: "text",
        },
        {
          label: "Last Name",
          placeholder: "Enter your Last name",
          type: "text",
        },
      ]
    : [];

  return (
    <section className="w-full bg-transparent text-black antialiased [font-synthesis:none] dark:text-white">
      <div className="grid min-h-0 gap-6 min-[900px]:grid-cols-2">
        {/* Left — form */}
        <div className="flex min-h-[440px] w-full min-w-0 flex-col items-start rounded-2xl border border-[#0d6efd]/25 bg-white px-6 py-7 shadow-[0_18px_48px_rgba(13,110,253,0.12)] dark:border-cl-border dark:bg-[#0b1220] dark:shadow-[0_18px_48px_rgba(0,0,0,0.45)] sm:px-8 lg:px-12 lg:py-10">
          <Link
            href={routes.home}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div>
            <h1 className="text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.1] tracking-tight [overflow-wrap:break-word]">
              {isRegister ? "Create an account" : "Sign in"}
            </h1>
            <p className="mt-2 text-base text-black/60 dark:text-white/55 sm:text-lg">
              Brainstorm in chat, build in cowork
            </p>
          </div>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
            <SocialButton icon={<GoogleIcon />} label="Sign up with Google" />
            <SocialButton icon={<AppleIcon />} label="Sign up with Apple" />
          </div>

          <div className="my-6 w-full text-center text-sm font-medium text-black/50 dark:text-white/45">
            or
          </div>

          <form className="w-full space-y-4">
            {isRegister && (
              <div className="grid gap-4 min-[600px]:grid-cols-2">
                {formFields.map((field) => (
                  <FieldBox
                    key={field.label}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                ))}
              </div>
            )}

            <FieldBox
              label="Email"
              placeholder="Enter your Email"
              type="email"
            />
            <FieldBox
              label="Password"
              placeholder="Password"
              type="password"
            />

            {isRegister ? (
              <div className="space-y-3 pt-1 text-sm leading-5 text-black/50 dark:text-white/45">
                <CheckboxLine>
                  I don&apos;t want to receive emails about solaceui feature
                  updates
                </CheckboxLine>
                <CheckboxLine>{termsText}</CheckboxLine>
              </div>
            ) : (
              <div className="space-y-3 pt-1 text-sm leading-5 text-black/50 dark:text-white/45">
                <CheckboxLine>Remember me on this device</CheckboxLine>
              </div>
            )}

            <button
              type="button"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-[#0d6efd] bg-[#0d6efd] text-lg font-medium text-white transition-colors hover:bg-[#0b5ed7] dark:border-[#3b82f6] dark:bg-[#3b82f6] dark:text-white dark:hover:bg-[#2563eb]"
            >
              Submit
            </button>
          </form>

          <p className="mt-5 w-full text-center text-sm text-black/55 dark:text-white/45">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Link
                  href={routes.login}
                  className="font-semibold text-black dark:text-white"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href={routes.register}
                  className="font-semibold text-black dark:text-white"
                >
                  Create account
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Right — promo */}
        <div className="relative flex min-h-[440px] w-full min-w-0 items-stretch overflow-hidden rounded-2xl bg-black p-8 sm:p-10 lg:min-h-0">
          <GrainGradient
            speed={1}
            scale={1}
            rotation={0}
            offsetX={0}
            offsetY={0}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="corners"
            frame={2854.5}
            colors={["#FFFFFF", "#3B82F6", "#2563EB", "#FFFFFF"]}
            colorBack="#00000000"
            className="absolute inset-0 bg-black"
          />

          <div className="relative z-10 flex h-full w-full flex-col">
            <h2 className="max-w-[620px] text-[clamp(2.5rem,5vw,6rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Think fast,
              <br />
              Build faster
            </h2>

            <a
              href="#"
              className="mt-auto inline-flex h-12 w-fit items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-5 text-base font-medium text-white/90 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/10 xl:text-lg"
            >
              <WindowsIcon className="size-5 shrink-0" />
              <span className="whitespace-nowrap">Download the Windows app</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#0d6efd]/25 bg-white px-3 text-sm leading-none text-black transition-colors hover:bg-[#0d6efd]/5 dark:border-cl-border dark:bg-white/5 dark:text-white dark:hover:bg-white/10 xl:text-[15px]"
    >
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function FieldBox({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="flex h-14 items-center justify-between gap-3 rounded-xl border border-[#0d6efd]/25 bg-white px-4 text-base dark:border-cl-border dark:bg-white/5">
      <input
        type={inputType}
        defaultValue=""
        placeholder={placeholder ?? `Enter your ${label}`}
        aria-label={label}
        className="min-w-0 w-full flex-1 bg-transparent text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="shrink-0 text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </label>
  );
}

function CheckboxLine({ children }: { children: ReactNode }) {
  return (
    <label className="flex items-start gap-3">
      <span className="relative mt-0.5 size-4 shrink-0">
        <input
          type="checkbox"
          className="peer size-full appearance-none rounded-[5px] border border-[#0d6efd]/40 bg-white checked:border-[#0d6efd] checked:bg-[#0d6efd] dark:border-cl-border dark:bg-white/5 dark:checked:border-[#3b82f6] dark:checked:bg-[#3b82f6]"
        />
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute inset-0 hidden size-full p-0.5 text-white peer-checked:block dark:text-white"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6.2 5 8.1 9 3.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-5">{children}</span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        fill="#EB4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.54c-.03-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.58 1.1-.95 0-2.42-1.07-3.98-1.04-2.05.03-3.94 1.19-4.99 3.02-2.13 3.69-.54 9.16 1.53 12.15 1.01 1.46 2.22 3.1 3.81 3.04 1.53-.06 2.11-.99 3.96-.99s2.37.99 3.99.96c1.65-.03 2.69-1.49 3.69-2.96 1.16-1.69 1.64-3.33 1.66-3.41-.04-.02-3.2-1.23-3.24-4.87ZM14.03 3.66c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.83-.78.9-1.46 2.34-1.28 3.72 1.35.1 2.73-.69 3.58-1.71Z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 4.7 10.7 3.6v7.7H3V4.7Zm8.8-1.25L21 2.1v9.2h-9.2V3.45ZM3 12.7h7.7v7.7L3 19.3v-6.6Zm8.8 0H21v9.2l-9.2-1.3v-7.9Z" />
    </svg>
  );
}
