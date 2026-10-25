import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * YoungSapling — Hero focal point sapling
 * Sprouts smoothly from the soil on initial mount (plays once).
 * Features a slender curved stem, two vibrant cotyledon leaves, and a tender bud.
 */
export default function YoungSapling({ position = [0, 0.16, 0.65], targetScale = 0.9 }) {
  const saplingRef = useRef();
  const leafLeftRef = useRef();
  const leafRightRef = useRef();

  // Growth animation progression from 0 to 1
  const growthProgress = useRef(0.001);
  const [hasFinishedGrowth, setHasFinishedGrowth] = useState(false);

  useFrame((state, delta) => {
    if (!saplingRef.current) return;

    // 1. Sprout upward on entrance (plays once over ~1.6s)
    if (!hasFinishedGrowth) {
      growthProgress.current += delta * 0.95;
      if (growthProgress.current >= 1) {
        growthProgress.current = 1;
        setHasFinishedGrowth(true);
      }

      // Elastic ease-out curve for natural plant spring
      const t = growthProgress.current;
      const easeOutElastic = 1 - Math.pow(1 - t, 3);
      const currentScale = targetScale * easeOutElastic;

      saplingRef.current.scale.set(currentScale, currentScale, currentScale);

      // Leaves unfold outward as it emerges
      if (leafLeftRef.current && leafRightRef.current) {
        leafLeftRef.current.rotation.z = 0.35 + 0.5 * easeOutElastic;
        leafRightRef.current.rotation.z = -0.35 - 0.5 * easeOutElastic;
      }
    } else {
      // 2. Subtle idle breathing movement after growing
      const idleTime = state.clock.elapsedTime;
      saplingRef.current.rotation.y = Math.sin(idleTime * 0.8) * 0.03;
      if (leafLeftRef.current && leafRightRef.current) {
        leafLeftRef.current.rotation.x = Math.sin(idleTime * 1.5) * 0.04;
        leafRightRef.current.rotation.x = Math.cos(idleTime * 1.5) * 0.04;
      }
    }
  });

  return (
    <group ref={saplingRef} position={position} scale={[0.001, 0.001, 0.001]}>
      {/* Soil mound rim around root */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.06, 12]} />
        <meshStandardMaterial color="#4A3427" roughness={0.95} />
      </mesh>

      {/* Slender green stem */}
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 0.44, 8]} />
        <meshStandardMaterial color="#3B724D" roughness={0.7} />
      </mesh>

      {/* Tender Top Bud */}
      <mesh position={[0, 0.47, 0]} castShadow>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#D8F3DC" roughness={0.6} />
      </mesh>

      {/* Left Cotyledon Leaf */}
      <group ref={leafLeftRef} position={[-0.02, 0.42, 0]} rotation={[0, 0, 0.4]}>
        <mesh position={[-0.12, 0.06, 0]} rotation={[0, 0, -0.2]} scale={[0.16, 0.03, 0.1]} castShadow>
          <sphereGeometry args={[1, 14, 10]} />
          <meshStandardMaterial color="#52B788" roughness={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Right Cotyledon Leaf */}
      <group ref={leafRightRef} position={[0.02, 0.38, 0]} rotation={[0, 0, -0.4]}>
        <mesh position={[0.13, 0.06, 0]} rotation={[0, 0, 0.2]} scale={[0.18, 0.03, 0.11]} castShadow>
          <sphereGeometry args={[1, 14, 10]} />
          <meshStandardMaterial color="#74C69D" roughness={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
