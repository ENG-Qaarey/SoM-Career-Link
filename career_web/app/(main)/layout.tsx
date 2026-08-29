"use client";

import { FeedProvider } from "@/context/feed-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FeedProvider>{children}</FeedProvider>;
}