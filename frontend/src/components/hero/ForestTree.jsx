import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * ForestTree — Stylized procedural 3D tree component
 * Supports pine (conifer), broadleaf (deciduous), and bush variants.
 * Features gentle organic sway animated via useFrame refs, varied organic materials,
 * and realistic botanical depth.
 */
export default function ForestTree({
  position = [0, 0, 0],
  scale = 1,
  variant = 'pine',
  phase = 0,
  swaySpeed = 1.2,
  swayAmount = 0.04,
  foliageColor = '#2D6A4F'
}) {
  const foliageRef = useRef();

  // Subtle organic sway: foliage oscillates around X and Z axes with phase offset
  useFrame((state) => {
    if (foliageRef.current) {
      const t = state.clock.elapsedTime * swaySpeed + phase;
      foliageRef.current.rotation.z = Math.sin(t) * swayAmount;
      foliageRef.current.rotation.x = Math.cos(t * 0.85) * (swayAmount * 0.7);
    }
  });

  if (variant === 'broadleaf') {
    return (
      <group position={position} scale={scale}>
        {/* Branching Trunk */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.13, 0.9, 8]} />
          <meshStandardMaterial color="#422D1E" roughness={0.92} />
        </mesh>

        {/* Small angled branch */}
        <mesh position={[0.12, 0.65, 0.05]} rotation={[0, 0, -0.6]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.05, 0.35, 6]} />
          <meshStandardMaterial color="#422D1E" roughness={0.92} />
        </mesh>

        {/* Foliage Canopy (Clustered organic lobes with varied shades) */}
        <group ref={foliageRef} position={[0, 0.95, 0]}>
          {/* Central main crown */}
          <mesh position={[0, 0.38, 0]} scale={[0.68, 0.62, 0.68]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={foliageColor} roughness={0.78} />
          </mesh>

          {/* Crown lobe West */}
          <mesh position={[-0.34, 0.24, 0.12]} scale={[0.44, 0.38, 0.44]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#357A54" roughness={0.82} />
          </mesh>

          {/* Crown lobe East */}
          <mesh position={[0.32, 0.28, -0.1]} scale={[0.48, 0.42, 0.46]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#4E9F6E" roughness={0.8} />
          </mesh>

          {/* Crown lobe Back/Top */}
          <mesh position={[0.06, 0.62, -0.16]} scale={[0.4, 0.36, 0.4]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#70B888" roughness={0.75} />
          </mesh>

          {/* Canopy Sun Highlight */}
          <mesh position={[-0.1, 0.52, 0.28]} scale={[0.26, 0.24, 0.26]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#94D2A5" roughness={0.72} />
          </mesh>
        </group>
      </group>
    );
  }

  if (variant === 'bush') {
    return (
      <group position={position} scale={scale}>
        <group ref={foliageRef} position={[0, 0.18, 0]}>
          {/* Main Bush Mound */}
          <mesh scale={[0.4, 0.28, 0.38]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={foliageColor} roughness={0.85} />
          </mesh>

          {/* Accent secondary cluster */}
          <mesh position={[0.2, -0.04, 0.1]} scale={[0.28, 0.22, 0.26]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#5E9E6D" roughness={0.82} />
          </mesh>

          {/* Tiny Wildflower Blossom 1 */}
          <mesh position={[0.12, 0.18, 0.16]} scale={[0.04, 0.04, 0.04]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#F4E8C1" roughness={0.6} />
          </mesh>

          {/* Tiny Wildflower Blossom 2 */}
          <mesh position={[-0.16, 0.15, 0.14]} scale={[0.035, 0.035, 0.035]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFF9E6" roughness={0.6} />
          </mesh>
        </group>
      </group>
    );
  }

  // Default: Coniferous Evergreen Pine (4-tier layered cones for richer silhouette)
  return (
    <group position={position} scale={scale}>
      {/* Wood Trunk with gentle taper */}
      <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.055, 0.11, 0.72, 8]} />
        <meshStandardMaterial color="#352219" roughness={0.92} />
      </mesh>

      {/* Tiered Foliage Cones */}
      <group ref={foliageRef} position={[0, 0.62, 0]}>
        {/* Tier 1 (Bottom, deepest forest shade) */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.66, 0.68, 7]} />
          <meshStandardMaterial color={foliageColor} roughness={0.86} />
        </mesh>

        {/* Tier 2 (Lower middle) */}
        <mesh position={[0, 0.42, 0]} rotation={[0, 0.35, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.52, 0.6, 7]} />
          <meshStandardMaterial color="#2E6C4C" roughness={0.84} />
        </mesh>

        {/* Tier 3 (Upper middle) */}
        <mesh position={[0, 0.74, 0]} rotation={[0, -0.2, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.38, 0.5, 7]} />
          <meshStandardMaterial color="#428B62" roughness={0.8} />
        </mesh>

        {/* Tier 4 (Top Apex, freshest spring sprout) */}
        <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.22, 0.36, 7]} />
          <meshStandardMaterial color="#64AC7F" roughness={0.76} />
        </mesh>
      </group>
    </group>
  );
}
