
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const PHOTOS = [
  { label: "CULTURAL_NIGHT", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200", year: "2025" },
  { label: "GAMING_ARENA", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200", year: "2025" },
  { label: "TECH_EXPO", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", year: "2024" },
  { label: "SPORTS_MEET", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200", year: "2024" },
  { label: "WORKSHOPS", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200", year: "2023" },
  { label: "ART_FEST", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200", year: "2023" },
];

const PhotoPortal: React.FC<{ data: any; angle: number; radius: number }> = ({ data, angle, radius }) => {
  const meshRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      
      const distToCenter = Math.abs(worldPos.x);
      const isFront = worldPos.z > 0;
      
      // Much more aggressive scaling for that "full screen" cinematic feel
      let targetScale = 1.0;
      if (isFront) {
        // As it approaches center (x=0), scale up to fill screen
        const proximity = Math.max(0, 1 - distToCenter / 15);
        targetScale = 1.2 + (proximity * 4.8); 
      }
      
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08));
      
      // Smoothly look at camera
      meshRef.current.lookAt(state.camera.position);
    }
  });

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  return (
    <group ref={meshRef} position={[x, 0, z]}>
      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.1}>
        <group>
            {/* Glass Frame with subtle edge glow */}
            <mesh>
                <planeGeometry args={[4, 2.5]} />
                <meshBasicMaterial color="#000" transparent opacity={0.6} side={THREE.DoubleSide} />
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[4.1, 2.6]} />
                    <meshBasicMaterial color="#00f2ff" transparent opacity={0.2} />
                </mesh>
            </mesh>

            <Image 
                url={data.img} 
                scale={[3.8, 2.3]} 
                position={[0, 0, 0.01]}
                transparent
                opacity={0.95}
                toneMapped={false}
            />

            <Text
                position={[0, -1.6, 0.1]}
                fontSize={0.25}
                color="white"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                fontWeight="900"
                letterSpacing={0.15}
            >
                {data.label}
            </Text>
            <Text
                position={[0, -1.85, 0.1]}
                fontSize={0.09}
                color="#00f2ff"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                fillOpacity={0.7}
            >
                {`LATENT_INDEX // ${data.year} // SYSTEM_READY`}
            </Text>
        </group>
      </Float>
    </group>
  );
};

const GlobeGallery: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationRef = useRef(0);
  const radius = 22; // Slightly wider orbit to allow larger images

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smooth auto-rotation
    const baseAutoSpeed = -delta * 0.12;
    
    // User interaction speed
    const scrollModifier = -scrollOffset * 3.5;
    
    rotationRef.current += baseAutoSpeed;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationRef.current + scrollModifier, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {PHOTOS.map((photo, i) => (
        <PhotoPortal 
            key={i} 
            data={photo} 
            angle={(i * Math.PI * 2) / PHOTOS.length} 
            radius={radius} 
        />
      ))}
    </group>
  );
};

export default GlobeGallery;
