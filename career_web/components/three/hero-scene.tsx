"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CareerNetwork } from "./career-network";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

export function HeroSceneFallback() {
  return (
    <div className="hero-bg absolute inset-0" aria-hidden>
      <div className="hero-bg__gradient" />
      <div className="hero-bg__shine" />
    </div>
  );
}

export function HeroScene() {
  const mobile = useIsMobile();
  const reduce = useReducedMotion();

  if (reduce) {
    return <HeroSceneFallback />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#050a14", 8, 18]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[5, 4, 4]} intensity={1.35} color="#60a5fa" />
          <pointLight position={[-5, -1, 3]} intensity={0.7} color="#0d6efd" />
          <spotLight
            position={[0, 6, 2]}
            angle={0.45}
            penumbra={0.7}
            intensity={0.55}
            color="#93c5fd"
          />
          <CareerNetwork mobile={mobile} reduceMotion={reduce} />
        </Suspense>
      </Canvas>
    </div>
  );
}
