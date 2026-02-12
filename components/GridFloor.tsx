import React from 'react';
import { Grid, MeshReflectorMaterial } from '@react-three/drei';

const GridFloor: React.FC = () => {
  return (
    <group position={[0, -4.5, 0]}>
      {/* 
          Grid component for high-fidelity white lines. 
          By using light colors against the dark background, we get that 'clean' motion graphics look.
      */}
      <Grid
        infiniteGrid
        fadeDistance={60}
        fadeStrength={15}
        cellSize={0.4}
        sectionSize={2.0}
        sectionThickness={1.2}
        // Bright white for the major sections, light grey for cells to keep it from being overwhelming
        sectionColor="#ffffff"
        cellColor="#444444"
      />
      
      {/* 
          Reflector Plane: 
          Set to pure black color so it doesn't look like a 'grey box', 
          acting only as a mirror for the glowing elements above it.
      */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#000000" // Pure black base to remove the "grey box" look
          metalness={0.5}
          mirror={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default GridFloor;