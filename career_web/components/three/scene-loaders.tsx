"use client";

import dynamic from "next/dynamic";
import { HeroSceneFallback } from "./hero-scene";

export const HeroSceneDynamic = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <HeroSceneFallback /> },
);

export const CareerNetworkSceneDynamic = dynamic(
  () => import("./career-network-scene").then((m) => m.CareerNetworkScene),
  { ssr: false, loading: () => <HeroSceneFallback /> },
);
