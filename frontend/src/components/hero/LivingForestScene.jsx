import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import ForestTerrain from './ForestTerrain';
import ForestTree from './ForestTree';
import YoungSapling from './YoungSapling';
import FloatingLeaves from './FloatingLeaves';
import SeedlingAnimation from '../SeedlingAnimation';

/**
 * ForestDiorama — Inner 3D group with parallax response
 */
function ForestDiorama({ isReducedMotion }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!isReducedMotion) {
      // Smooth pointer parallax with tight angular clamp
      const targetRotationY = state.pointer.x * 0.22;
      const targetRotationX = -state.pointer.y * 0.12;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Terrain Base & Winding Path */}
      <ForestTerrain />

      {/* Hero Focal Point: Growing Young Sapling */}
      <YoungSapling position={[0.05, 0.14, 0.72]} targetScale={0.88} />

      {/* Forest Trees with varying heights, species, and sway phases */}
      {/* 1. Tall Coniferous Pine (Rear West) */}
      <ForestTree
        position={[-1.35, 0.28, -0.65]}
        scale={1.22}
        variant="pine"
        phase={0.2}
        swaySpeed={1.1}
        foliageColor="#1B4332"
      />

      {/* 2. Slender Mountain Pine (North / Rear Edge) */}
      <ForestTree
        position={[0.55, 0.22, -1.05]}
        scale={1.05}
        variant="pine"
        phase={1.4}
        swaySpeed={1.3}
        foliageColor="#2D6A4F"
      />

      {/* 3. Deep Green Pine (North-West) */}
      <ForestTree
        position={[-0.45, 0.24, -1.15]}
        scale={0.92}
        variant="pine"
        phase={2.8}
        swaySpeed={1.2}
        foliageColor="#214D32"
      />

      {/* 4. Lush Broadleaf Deciduous Tree (East Hill) */}
      <ForestTree
        position={[1.25, 0.22, 0.15]}
        scale={1.15}
        variant="broadleaf"
        phase={0.8}
        swaySpeed={1.0}
        foliageColor="#2D6A4F"
      />

      {/* 5. Medium Broadleaf Canopy (West Path Edge) */}
      <ForestTree
        position={[-1.15, 0.16, 0.55]}
        scale={0.88}
        variant="broadleaf"
        phase={2.1}
        swaySpeed={1.25}
        foliageColor="#40916C"
      />

      {/* 6. Accent Bush 1 (Front Left Clearing) */}
      <ForestTree
        position={[-0.6, 0.14, 1.25]}
        scale={0.85}
        variant="bush"
        phase={1.8}
        swaySpeed={1.5}
        foliageColor="#52B788"
      />

      {/* 7. Accent Bush 2 (East Path Rim) */}
      <ForestTree
        position={[0.95, 0.14, 0.95]}
        scale={0.78}
        variant="bush"
        phase={3.1}
        swaySpeed={1.4}
        foliageColor="#64A36B"
      />

      {/* Drifting 3D Leaves */}
      {!isReducedMotion && <FloatingLeaves count={7} />}
    </group>
  );
}

/**
 * LivingForestScene — Main 3D Canvas wrapper
 * Handles lighting, float physics, soft contact shadows, WebGL error fallback,
 * and responsive sizing.
 */
export default function LivingForestScene() {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // WebGL error boundary fallback
  if (hasWebGLError) {
    return (
      <div className="living-forest-fallback d-flex flex-column align-items-center justify-content-center">
        <SeedlingAnimation size={64} />
        <p className="mt-3 text-forest small font-heading fw-bold">
          GreenRoots Botanical Ecosystem
        </p>
      </div>
    );
  }

  return (
    <div className="living-forest-canvas-container" aria-label="Interactive 3D Living Forest Miniature">
      <Canvas
        camera={{ position: [4.4, 3.8, 5.8], fov: 38 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        onError={() => setHasWebGLError(true)}
      >
        {/* Soft Ambient / Hemisphere Lighting */}
        <hemisphereLight
          color="#F2F8F2"
          groundColor="#3D271D"
          intensity={0.8}
        />

        {/* Directional Key Light with Soft Shadows */}
        <directionalLight
          position={[5.5, 8.5, 4.5]}
          intensity={1.35}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.5}
          shadow-camera-far={18}
          shadow-camera-left={-3.5}
          shadow-camera-right={3.5}
          shadow-camera-top={3.5}
          shadow-camera-bottom={-3.5}
          shadow-bias={-0.0004}
        />

        {/* Subtle Cool Fill Light */}
        <directionalLight
          position={[-4.5, 3.2, -2.5]}
          intensity={0.35}
          color="#D8F3DC"
        />

        <Suspense fallback={null}>
          {/* Subtle floating motion for weightless diorama feel */}
          <Float
            speed={isReducedMotion ? 0 : 1.4}
            rotationIntensity={isReducedMotion ? 0 : 0.08}
            floatIntensity={isReducedMotion ? 0 : 0.18}
            floatingRange={[-0.04, 0.04]}
          >
            <ForestDiorama isReducedMotion={isReducedMotion} />
          </Float>

          {/* Soft grounding contact shadow calculated once to avoid per-frame shadow rebaking */}
          <ContactShadows
            frames={1}
            position={[0, -1.25, 0]}
            opacity={0.38}
            scale={6.5}
            blur={2.4}
            far={3.2}
            color="#0B221A"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
