"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ScrollSceneProps = {
  className?: string;
};

/**
 * Fixed WebGL atmosphere for the CareerLink landing page.
 * Scroll progress drives camera, particles, rings, and soft light orbs.
 */
export function ScrollScene({ className = "" }: ScrollSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      mount.classList.add("scroll-scene--static");
      return;
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Soft ambient group ---
    const root = new THREE.Group();
    scene.add(root);

    // Particle field
    const COUNT = 520;
    const positions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x0d6efd,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    root.add(particles);

    // Network lines between nearby particles (subset)
    const linePositions: number[] = [];
    const linkCount = 90;
    for (let i = 0; i < linkCount; i++) {
      const a = Math.floor(Math.random() * COUNT);
      let b = Math.floor(Math.random() * COUNT);
      if (a === b) b = (b + 1) % COUNT;
      linePositions.push(
        positions[a * 3],
        positions[a * 3 + 1],
        positions[a * 3 + 2],
        positions[b * 3],
        positions[b * 3 + 1],
        positions[b * 3 + 2],
      );
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b8aff,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    root.add(lines);

    // Glowing orbs
    const orbGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const makeOrb = (color: number, x: number, y: number, z: number, s: number) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(orbGeo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(s);
      root.add(mesh);
      return { mesh, mat };
    };
    const orbA = makeOrb(0x0d6efd, -3.2, 1.4, -1, 2.4);
    const orbB = makeOrb(0x60a5fa, 3.6, -1.2, -2, 3.1);
    const orbC = makeOrb(0x93c5fd, 0.4, 2.6, -3, 1.8);

    // Scroll rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0d6efd,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.02, 16, 120), ringMat);
    ringA.rotation.x = Math.PI / 2.4;
    root.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.015, 16, 140),
      new THREE.MeshBasicMaterial({
        color: 0x1e66f5,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    ringB.rotation.x = Math.PI / 3;
    ringB.rotation.y = 0.4;
    root.add(ringB);

    // Soft star accents (small octahedrons)
    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
    });
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i++) {
      const star = new THREE.Mesh(starGeo, starMat.clone());
      star.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 8,
      );
      root.add(star);
      stars.push(star);
    }

    let scrollProgress = 0;
    let targetProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let frameId = 0;
    let start = performance.now();

    const updateScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      targetProgress = window.scrollY / max;
    };

    const onPointer = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      const t = (now - start) / 1000;

      scrollProgress += (targetProgress - scrollProgress) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const p = scrollProgress;

      // Camera travels gently through the scene
      camera.position.x = mouseX * 0.45 + Math.sin(p * Math.PI * 2) * 0.35;
      camera.position.y = -mouseY * 0.3 + p * 1.8 - 0.2;
      camera.position.z = 8 - p * 2.4;
      camera.lookAt(0, p * 0.8, 0);

      root.rotation.y = t * 0.05 + p * 1.1;
      root.rotation.x = Math.sin(t * 0.2) * 0.05 + p * 0.25;

      // Particle drift
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3 + 1;
        const base = positions[ix];
        pos.array[ix] =
          base + Math.sin(t * 0.7 + phases[i] + p * 4) * 0.12;
      }
      pos.needsUpdate = true;

      particleMat.opacity = 0.35 + p * 0.35;
      lineMat.opacity = 0.08 + p * 0.14;

      ringA.rotation.z = t * 0.25 + p * 2.2;
      ringB.rotation.z = -t * 0.18 - p * 1.6;
      ringA.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.15);
      ringB.scale.setScalar(1 + p * 0.2);

      orbA.mesh.position.y = 1.4 + Math.sin(t * 0.6 + p) * 0.35;
      orbB.mesh.position.y = -1.2 + Math.cos(t * 0.5 + p * 2) * 0.4;
      orbC.mesh.position.x = 0.4 + Math.sin(t * 0.4) * 0.5;
      orbA.mat.opacity = 0.12 + p * 0.12;
      orbB.mat.opacity = 0.1 + (1 - p) * 0.12;

      stars.forEach((star, i) => {
        star.rotation.x = t * 0.4 + i;
        star.rotation.y = t * 0.6 + i * 0.2;
        const mat = star.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.25 + ((Math.sin(t + i) + 1) / 2) * 0.45;
      });

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);

      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      orbGeo.dispose();
      starGeo.dispose();
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      (ringA.material as THREE.Material).dispose();
      (ringB.material as THREE.Material).dispose();
      stars.forEach((s) => (s.material as THREE.Material).dispose());
      [orbA, orbB, orbC].forEach((o) => o.mat.dispose());

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`scroll-scene ${className}`.trim()}
      aria-hidden
    />
  );
}
