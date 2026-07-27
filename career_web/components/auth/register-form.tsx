"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/routes";

const ROLES = [
  { value: "student", label: "Student / Graduate" },
  { value: "employer", label: "Employer" },
  { value: "university", label: "University" },
] as const;

export function RegisterForm() {
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
    <div className="auth-card cl-card w-full max-w-lg p-6 sm:p-8">
      <div className="text-center">
        <h1 className="cl-heading text-2xl sm:text-3xl">Create your account</h1>
        <p className="cl-subtext mt-2 text-sm sm:text-base">
          Join CareerLink Somalia to discover opportunities, connect with
          employers and grow your career.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="cl-field">
            <label className="cl-label" htmlFor="register-first">
              First name
            </label>
            <input
              id="register-first"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="cl-input"
              placeholder="Amina"
            />
          </div>
          <div className="cl-field">
            <label className="cl-label" htmlFor="register-last">
              Last name
            </label>
            <input
              id="register-last"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className="cl-input"
              placeholder="Hassan"
            />
          </div>
        </div>

        <div className="cl-field">
          <label className="cl-label" htmlFor="register-email">
            Email address
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="cl-input"
            placeholder="you@example.com"
          />
        </div>

        <fieldset className="cl-field">
          <legend className="cl-label mb-2">I am joining as</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {ROLES.map((role) => (
              <label
                key={role.value}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-cl-border bg-cl-main/50 px-3 py-3 text-center text-sm font-medium text-cl-text transition has-[:checked]:border-cl-blue has-[:checked]:bg-cl-blue-light has-[:checked]:text-cl-blue"
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  defaultChecked={role.value === "student"}
                  className="sr-only"
                  required
                />
                {role.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="cl-field">
            <label className="cl-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="cl-input"
              placeholder="At least 8 characters"
            />
          </div>
          <div className="cl-field">
            <label className="cl-label" htmlFor="register-confirm">
              Confirm password
            </label>
            <input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="cl-input"
              placeholder="Repeat password"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-cl-muted">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-cl-border text-cl-blue focus:ring-cl-blue/30"
          />
          <span>
            I agree to CareerLink Somalia&apos;s{" "}
            <Link href={routes.terms} className="text-cl-blue hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={routes.privacy}
              className="text-cl-blue hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {submitted && (
          <p className="rounded-lg border border-cl-blue/30 bg-cl-blue-light/40 px-4 py-3 text-sm text-cl-text">
            Registration will open fully once accounts are enabled. We&apos;re
            glad you&apos;re joining CareerLink Somalia.
          </p>
        )}

        <button type="submit" className="cl-btn cl-btn-primary w-full">
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-cl-muted">
        Already have an account?{" "}
        <Link
          href={routes.login}
          className="font-semibold text-cl-blue hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
