
import React from 'react';
import { Float, Text, Image } from '@react-three/drei';
import * as THREE from 'three';

interface HighlightPortalProps {
  year: string;
  position: [number, number, number];
}

const HighlightPortal: React.FC<HighlightPortalProps> = ({ year, position }) => {
  // Use a unique placeholder image for each year to demo the visual need
  const mockImageUrl = `https://picsum.photos/seed/${year}/800/600`;

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      {/* Floating Memory Window Frame */}
      <group>
        <mesh>
          <planeGeometry args={[2.8, 1.8]} />
          <meshBasicMaterial 
            color="#000" 
            transparent 
            opacity={0.8} 
            side={THREE.DoubleSide}
          />
          {/* Border Glow */}
          <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[2.9, 1.9]} />
              <meshBasicMaterial color="#00f2ff" transparent opacity={0.3} />
          </mesh>
        </mesh>

        {/* Mock Memory Fragment Image */}
        <Image 
          url={mockImageUrl} 
          scale={[2.6, 1.6]} 
          position={[0, 0, 0.01]}
          transparent
          opacity={0.9}
        />
        
        {/* Scanning Line Effect overlay on image */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshBasicMaterial wireframe color="#00f2ff" transparent opacity={0.15} />
        </mesh>
      </group>

      <Text
        position={[0, -1.3, 0.05]}
        fontSize={0.25}
        color="white"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fontWeight="black"
        letterSpacing={0.1}
        anchorX="center"
        anchorY="middle"
      >
        {`YEAR_DATA // ${year}`}
      </Text>

      {/* Decorative Glitch Text */}
      <Text
        position={[0, 1.1, 0.1]}
        fontSize={0.08}
        color="#00f2ff"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        fillOpacity={0.4}
        maxWidth={2}
        textAlign="center"
      >
        {"RECOVERING_MEMORY_BLOCKS...\nPARSING_NEURAL_LATENT_VECTORS"}
      </Text>
    </Float>
  );
};

export default HighlightPortal;
