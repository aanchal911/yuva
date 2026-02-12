
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const RobotGuide: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  
  // Appear range: 0.1 to 0.35
  const visibility = THREE.MathUtils.smoothstep(scrollOffset, 0.05, 0.2) * (1 - THREE.MathUtils.smoothstep(scrollOffset, 0.3, 0.45));

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Position/Rotation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    
    // Head looks at mouse
    const targetRotation = new THREE.Euler(
      (state.mouse.y * Math.PI) / 10,
      (state.mouse.x * Math.PI) / 10,
      0
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotation.x, 0.1);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotation.y, 0.1);

    // Scale based on visibility
    groupRef.current.scale.setScalar(visibility);
    groupRef.current.visible = visibility > 0.01;
  });

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Head Core */}
        <mesh ref={headRef}>
          <sphereGeometry args={[0.6, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.2}
            chromaticAberration={0.05}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#00f2ff"
            transmission={1}
            roughness={0.1}
          />
          {/* Internal Glowing Eye */}
          <Sphere args={[0.15, 32, 32]} position={[0, 0, 0.4]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={10} />
          </Sphere>
        </mesh>

        {/* Outer Floating Rings */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <Torus args={[1.2, 0.02, 16, 100]}>
            <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
          </Torus>
          <Torus args={[0.9, 0.01, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
          </Torus>
        </group>

        {/* Small Satellite Drones */}
        {[0, 1, 2].map((i) => (
           <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
              <mesh position={[2, Math.sin(i) * 0.5, 0]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
              </mesh>
           </group>
        ))}
      </Float>
    </group>
  );
};

export default RobotGuide;
