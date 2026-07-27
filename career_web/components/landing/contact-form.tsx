"use client";

import { useState } from "react";

const SUBJECTS = [
  "General inquiry",
  "Account support",
  "Employer partnership",
  "University partnership",
  "Technical issue",
  "Other",
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="cl-card p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-cl-text">Send us a message</h3>
      <p className="mt-2 text-sm text-cl-muted">
        Fill out the form below and we&apos;ll respond as soon as we can.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="cl-field">
            <label className="cl-label" htmlFor="contact-name">
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="cl-input"
              placeholder="Your name"
            />
          </div>
          <div className="cl-field">
            <label className="cl-label" htmlFor="contact-email">
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="cl-input"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="cl-field">
          <label className="cl-label" htmlFor="contact-subject">
            Subject
          </label>
          <select id="contact-subject" name="subject" required className="cl-input cl-select">
            <option value="">Select a topic</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="cl-field">
          <label className="cl-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="cl-input cl-textarea"
            placeholder="How can we help you?"
          />
        </div>

        {submitted && (
          <p className="rounded-lg border border-cl-blue/30 bg-cl-blue-light/40 px-4 py-3 text-sm text-cl-text">
            Thank you for reaching out. Our team will review your message and get back to you
            at the email address you provided.
          </p>
        )}

        <button type="submit" className="cl-btn cl-btn-primary w-full sm:w-auto">
          Send message
        </button>
      </form>
    </div>
  );
}
