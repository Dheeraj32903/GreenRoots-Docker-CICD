import React from 'react';

/**
 * ForestTerrain — Miniature floating landscape diorama
 * Layered rolling green hills, earth-toned tapered soil cross-section,
 * curved limestone path, river pebbles, and natural terrain steps.
 */
export default function ForestTerrain() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* 1. Geological Sub-Base: Tapered earthy soil cross-section */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[2.75, 1.35, 1.1, 28]} />
        <meshStandardMaterial
          color="#38251B"
          roughness={0.95}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Layer of darker sub-soil strata */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <cylinderGeometry args={[2.88, 2.74, 0.2, 28]} />
        <meshStandardMaterial color="#4A3427" roughness={0.92} />
      </mesh>

      {/* 2. Primary Ground Terrace: Lush grassy plateau with soft bevel */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.92, 2.86, 0.28, 32]} />
        <meshStandardMaterial color="#285636" roughness={0.86} />
      </mesh>

      {/* 3. Layered Rolling Hillock (West / Rear) */}
      <mesh position={[-0.85, 0.24, -0.6]} scale={[1.45, 0.54, 1.35]} receiveShadow castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#1E472E" roughness={0.88} />
      </mesh>

      {/* 4. Layered Rolling Hillock (East / Mid) */}
      <mesh position={[0.95, 0.18, 0.35]} scale={[1.15, 0.44, 1.05]} receiveShadow castShadow>
        <sphereGeometry args={[1, 22, 16]} />
        <meshStandardMaterial color="#356E47" roughness={0.84} />
      </mesh>

      {/* 5. Meadow Crest (North-East) */}
      <mesh position={[0.2, 0.16, -0.9]} scale={[0.88, 0.34, 0.88]} receiveShadow castShadow>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#498457" roughness={0.82} />
      </mesh>

      {/* 6. Soft Grass Knoll (Foreground Right) */}
      <mesh position={[1.15, 0.08, 0.95]} scale={[0.65, 0.22, 0.65]} receiveShadow castShadow>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#3E7B4E" roughness={0.84} />
      </mesh>

      {/* 7. Curved Winding Path (Warm Limestone Stepping Stones) */}
      <group position={[0, 0.14, 0]}>
        <mesh position={[0.25, 0.02, 1.9]} scale={[0.34, 0.04, 0.24]} rotation={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#EAE2CE" roughness={0.78} />
        </mesh>

        <mesh position={[0.12, 0.025, 1.55]} scale={[0.32, 0.04, 0.25]} rotation={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#DFD4BC" roughness={0.8} />
        </mesh>

        <mesh position={[-0.05, 0.03, 1.2]} scale={[0.3, 0.04, 0.27]} rotation={[0, 0.3, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#EAE2CE" roughness={0.78} />
        </mesh>

        <mesh position={[-0.15, 0.035, 0.82]} scale={[0.32, 0.04, 0.26]} rotation={[0, 0.15, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#EDE3D5" roughness={0.76} />
        </mesh>

        <mesh position={[0.02, 0.04, 0.45]} scale={[0.36, 0.04, 0.31]} rotation={[0, -0.25, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#EAE2CE" roughness={0.78} />
        </mesh>

        <mesh position={[0.22, 0.04, 0.12]} scale={[0.28, 0.04, 0.24]} rotation={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#DFD4BC" roughness={0.8} />
        </mesh>
      </group>

      {/* 8. Organic Riverbed Rocks / Slate Accents */}
      <mesh position={[-1.35, 0.15, 0.65]} rotation={[0.2, 0.4, 0.1]} scale={[0.24, 0.16, 0.2]} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#64726B" roughness={0.75} />
      </mesh>

      <mesh position={[-1.15, 0.12, 0.85]} rotation={[0.4, 0.2, 0.5]} scale={[0.16, 0.12, 0.15]} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#84948B" roughness={0.8} />
      </mesh>

      <mesh position={[1.45, 0.12, -0.4]} rotation={[0.1, 0.8, 0.3]} scale={[0.28, 0.18, 0.24]} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#64726B" roughness={0.75} />
      </mesh>
    </group>
  );
}
