"use client";

import dynamic from "next/dynamic";
import { LandingContent } from "./landing-content";

const ScrollScene = dynamic(
  () => import("./scroll-scene").then((m) => m.ScrollScene),
  { ssr: false },
);

export function LandingPage() {
  return (
    <div className="landing-root relative min-h-screen text-cl-navy">
      <ScrollScene />
      <div className="landing-content relative z-[1]">
        <LandingContent />
      </div>
    </div>
  );
}
