"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/routes";

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="auth-card cl-card w-full max-w-md p-6 sm:p-8">
      <div className="text-center">
        <h1 className="cl-heading text-2xl sm:text-3xl">Welcome back</h1>
        <p className="cl-subtext mt-2 text-sm sm:text-base">
          Sign in to manage applications, saved opportunities and your profile.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="cl-field">
          <label className="cl-label" htmlFor="login-email">
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="cl-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="cl-field">
          <div className="flex items-center justify-between gap-2">
            <label className="cl-label" htmlFor="login-password">
              Password
            </label>
            <Link
              href="mailto:hello@careerlink.so?subject=Password%20reset%20request"
              className="text-xs font-medium text-cl-blue hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="cl-input"
            placeholder="••••••••"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-cl-muted">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-cl-border text-cl-blue focus:ring-cl-blue/30"
          />
          Remember me on this device
        </label>

        {submitted && (
          <p className="rounded-lg border border-cl-blue/30 bg-cl-blue-light/40 px-4 py-3 text-sm text-cl-text">
            Sign-in will connect to your account once authentication is live.
            Thank you for trying CareerLink Somalia.
          </p>
        )}

        <button type="submit" className="cl-btn cl-btn-primary w-full">
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-cl-muted">
        Don&apos;t have an account?{" "}
        <Link
          href={routes.register}
          className="font-semibold text-cl-blue hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
