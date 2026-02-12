
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleProps } from '../types';

const Particles: React.FC<ParticleProps> = ({ count }) => {
  const meshRef = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      const distance = 2.5 + Math.random() * 2;
      temp[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      temp[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      temp[i * 3 + 2] = distance * Math.cos(theta);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.x = t * 0.02;
    
    // Subtle pulsing
    const s = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Particles;
