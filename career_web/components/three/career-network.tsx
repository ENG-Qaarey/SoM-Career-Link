"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "./particle-field";

const NODES = [
  { label: "Student", pos: [2.2, 1.4, 0.2] as const },
  { label: "Graduate", pos: [-2.1, 1.5, -0.3] as const },
  { label: "Employer", pos: [2.4, -1.1, 0.4] as const },
  { label: "University", pos: [-2.3, -1.2, 0.2] as const },
  { label: "Internship", pos: [0.2, 2.2, -0.5] as const },
  { label: "Job", pos: [1.5, -2.0, -0.2] as const },
  { label: "Graduate Program", pos: [-1.4, -2.1, 0.3] as const },
  { label: "Career Event", pos: [-0.3, 0.1, 2.0] as const },
];

function NetworkNode({
  position,
  color = "#3b82f6",
  scale = 1,
}: {
  position: readonly [number, number, number];
  color?: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.08;
  });

  return (
    <mesh ref={ref} position={position as [number, number, number]} scale={scale}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        roughness={0.35}
        metalness={0.2}
      />
    </mesh>
  );
}

function Links({ mobile }: { mobile?: boolean }) {
  const geo = useMemo(() => {
    const positions: number[] = [];
    const center = [0, 0, 0];
    NODES.forEach((n) => {
      positions.push(center[0], center[1], center[2], n.pos[0], n.pos[1], n.pos[2]);
    });
    // a few peer links
    for (let i = 0; i < NODES.length - 1; i += 2) {
      const a = NODES[i].pos;
      const b = NODES[i + 1].pos;
      positions.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#2563eb"
        transparent
        opacity={mobile ? 0.18 : 0.28}
        depthWrite={false}
      />
    </lineSegments>
  );
}

type CareerNetworkProps = {
  mobile?: boolean;
  reduceMotion?: boolean;
};

export function CareerNetwork({ mobile = false, reduceMotion = false }: CareerNetworkProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current || reduceMotion) return;
    group.current.rotation.y = clock.elapsedTime * 0.08;
    if (!mobile) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.12,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -pointer.x * 0.08,
        0.04,
      );
    }
  });

  return (
    <group ref={group}>
      <NetworkNode position={[0, 0, 0]} color="#0d6efd" scale={1.7} />
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#0d6efd" transparent opacity={0.12} />
      </mesh>
      <Links mobile={mobile} />
      {NODES.map((n) => (
        <NetworkNode key={n.label} position={n.pos} />
      ))}
      <ParticleField count={mobile ? 60 : 160} mobile={mobile} />
    </group>
  );
}
