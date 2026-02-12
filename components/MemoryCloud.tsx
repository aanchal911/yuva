
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';

const MemoryCloud: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate 6000 raw values for 2000 points in a sphere
  const sphere = useMemo(() => {
    const positions = new Float32Array(6000);
    // radius: 5.0 for a more immersive "galaxy" feel compared to the snippet's 1.5
    random.inSphere(positions, { radius: 8 });
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Rotation for the sentient/alive feel
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    // As the user scrolls deep into the archive, the cloud pulses and reacts
    const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    const scrollEffect = 1 + scrollOffset * 0.5;
    ref.current.scale.setScalar(pulse * scrollEffect);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.7}
        />
      </Points>
    </group>
  );
};

export default MemoryCloud;
