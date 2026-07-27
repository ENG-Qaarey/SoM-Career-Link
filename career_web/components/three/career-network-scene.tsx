"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CareerNetwork } from "./career-network";
import { HeroSceneFallback } from "./hero-scene";

export function CareerNetworkScene() {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReady(true);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (!ready) return <HeroSceneFallback />;
  if (reduce) return <HeroSceneFallback />;

  return (
    <div className="h-[340px] w-full overflow-hidden rounded-2xl border border-cl-border bg-cl-elevated shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:h-[420px]">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 42 }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#050a14"]} />
          <fog attach="fog" args={["#050a14", 7, 16]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 4, 4]} intensity={1.2} color="#60a5fa" />
          <pointLight position={[-3, -2, 2]} intensity={0.6} color="#0d6efd" />
          <CareerNetwork mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
