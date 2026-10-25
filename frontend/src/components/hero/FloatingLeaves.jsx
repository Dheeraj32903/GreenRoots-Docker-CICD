import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingLeaves — Subtle 3D leaves drifting along smooth orbital paths
 * Adds air and life to the miniature scene while keeping the foreground clean.
 */
export default function FloatingLeaves({ count = 7 }) {
  const leavesRef = useRef([]);

  // Generate deterministic leaf configs to prevent re-calculations
  const leavesData = useMemo(() => {
    const palette = ['#4F8A55', '#64A36B', '#74C69D', '#95D5B2', '#DDE9D7'];
    const data = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.45;
      data.push({
        baseX: Math.cos(angle) * radius,
        baseY: 0.8 + (i % 4) * 0.45,
        baseZ: Math.sin(angle) * radius,
        speed: 0.5 + (i % 3) * 0.25,
        swaySpeed: 1.1 + (i % 2) * 0.4,
        scale: 0.08 + (i % 3) * 0.025,
        color: palette[i % palette.length],
        phase: i * 1.3
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    leavesRef.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const data = leavesData[idx];

      // Smooth circular / Lissajous drift
      const currentAngle = data.phase + time * data.speed * 0.35;
      mesh.position.x = Math.cos(currentAngle) * (2.2 + Math.sin(time * 0.4 + data.phase) * 0.3);
      mesh.position.z = Math.sin(currentAngle) * (2.2 + Math.cos(time * 0.4 + data.phase) * 0.3);

      // Gentle floating bob
      mesh.position.y = data.baseY + Math.sin(time * data.swaySpeed + data.phase) * 0.25;

      // Organic tumbling flutter
      mesh.rotation.x = Math.sin(time * data.swaySpeed + data.phase) * 0.5;
      mesh.rotation.y += 0.012;
      mesh.rotation.z = Math.cos(time * data.swaySpeed * 0.7 + data.phase) * 0.4;
    });
  });

  return (
    <group>
      {leavesData.map((leaf, i) => (
        <mesh
          key={i}
          ref={(el) => (leavesRef.current[i] = el)}
          position={[leaf.baseX, leaf.baseY, leaf.baseZ]}
          scale={[leaf.scale * 1.4, leaf.scale * 0.25, leaf.scale]}
        >
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial
            color={leaf.color}
            roughness={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
