
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, MeshTransmissionMaterial, Text, Float, ContactShadows, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import GridFloor from './GridFloor';
import LogicCube from './LogicCube';
import MemoryCloud from './MemoryCloud';
import GlobeGallery from './GlobeGallery';
import RobotGuide from './RobotGuide';

interface SceneProps {
  onSelectGate: (label: string) => void;
}

function SentientSphere({ scrollOffset }: { scrollOffset: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.08;
    mesh.current.position.y = Math.sin(t * 0.4) * 0.1;
    
    const scale = 1.3 + scrollOffset * 15; // Faster growth
    mesh.current.scale.set(scale, scale, scale);
    
    const opacity = 0.5 * (1 - THREE.MathUtils.smoothstep(scrollOffset, 0.0, 0.08));
    if (mesh.current.material) {
        (mesh.current.material as any).opacity = opacity;
    }
    mesh.current.visible = opacity > 0.001;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1.5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={10}
        thickness={0.1}
        chromaticAberration={0.02}
        anisotropy={0.1}
        distortion={0.3}
        distortionScale={0.3}
        color="#00a2ff"
        transmission={1}
        roughness={0.1}
        transparent
      />
    </mesh>
  );
}

function LiquidBranding({ scrollOffset }: { scrollOffset: number }) {
  const textRef = useRef<any>(null!);
  
  useFrame((state) => {
    const opacity = 1 - THREE.MathUtils.smoothstep(scrollOffset, 0.0, 0.08);
    if (textRef.current) {
        textRef.current.fillOpacity = opacity;
        textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
        textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
        // Scale up hero text for more impact
        const scale = 1 + scrollOffset * 2;
        textRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.2}>
      <group>
        <Text
            ref={textRef}
            fontSize={1.2} // Larger base size
            position={[0, 0.1, 1.5]} 
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            fontStyle="italic"
            fontWeight="900"
            letterSpacing={-0.04}
        >
            NUVYUVA 6.0
            <MeshTransmissionMaterial
                backside
                samples={16}
                thickness={4.0}
                chromaticAberration={0.9}
                anisotropy={1.2}
                distortion={1.1}
                distortionScale={0.7}
                temporalDistortion={0.2}
                color="#c2f5ff"
                transmission={1}
                roughness={0.01}
                metalness={0.05}
                ior={1.48} 
                clearcoat={1}
                clearcoatRoughness={0}
                transparent
            />
        </Text>
      </group>
    </Float>
  );
}

const Scene: React.FC<SceneProps> = ({ onSelectGate }) => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null!);
  const gridGroupRef = useRef<THREE.Group>(null!);
  const archiveGroupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const offset = scroll.offset; 
    
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 150, 0.05);
      
      let targetZ = 5;
      if (offset < 0.2) {
        targetZ = THREE.MathUtils.lerp(5, 25, offset / 0.2); // Faster zoom in
      } else if (offset < 0.6) {
        targetZ = 28; // Closer for "Full Screen" effect
      } else {
        targetZ = THREE.MathUtils.lerp(28, 22, (offset - 0.6) / 0.4);
      }
      
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(0, 2, offset);
    }

    if (archiveGroupRef.current) {
        const entry = scroll.range(0.12, 0.18); 
        const exit = scroll.range(0.58, 0.08); 
        const visible = entry * (1 - exit);
        
        archiveGroupRef.current.visible = visible > 0.001;
        archiveGroupRef.current.position.y = THREE.MathUtils.lerp(-12, 0, visible);
        archiveGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1, visible));
    }

    if (gridGroupRef.current) {
        const entry = scroll.range(0.68, 0.1); 
        const exit = scroll.range(0.95, 0.05); 
        const visibleAmount = entry * (1 - exit);
        
        gridGroupRef.current.visible = visibleAmount > 0.001;
        gridGroupRef.current.position.y = THREE.MathUtils.lerp(-10, 1, visibleAmount);
        gridGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.1, 1, visibleAmount));
        gridGroupRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, visibleAmount);
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 20, -10]} intensity={6} color="#00f2ff" />
      <pointLight position={[20, -10, -30]} intensity={3} color="#ff00ff" />
      <ambientLight intensity={0.3} color="#1a0033" />

      {/* Hero Section */}
      <group position={[0, 0, 0]}>
        <SentientSphere scrollOffset={scroll.offset} />
        <LiquidBranding scrollOffset={scroll.offset} />
      </group>

      {/* AI GUIDE (The Robot) */}
      <RobotGuide scrollOffset={scroll.offset} />

      {/* ARCHIVE SECTION: GLOBE GALLERY */}
      <group ref={archiveGroupRef} visible={false}>
         <GlobeGallery scrollOffset={scroll.offset} />
         <MemoryCloud scrollOffset={scroll.offset} />
         
         <Text
          position={[0, 18, -50]}
          fontSize={15} // Enormous backdrop text
          color="#00f2ff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          fillOpacity={0.03}
          fontWeight="black"
          anchorY="middle"
        >
          NEURAL_ARCHIVE
        </Text>
      </group>

      {/* LOGIC GATES SECTION */}
      <group ref={gridGroupRef} visible={false}>
        <Text
          position={[0, 10, 0]}
          fontSize={2} // Larger title
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          letterSpacing={0.3}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
        >
          LOGIC_GATES
          <meshBasicMaterial color={[20, 20, 20]} toneMapped={false} />
        </Text>

        <LogicCube label="TECHNICAL" color="#00f2ff" position={[-6, 4, 0]} iconType="tech" onClick={() => onSelectGate("TECHNICAL")} />
        <LogicCube label="CULTURAL" color="#ff00ff" position={[6, 4, 0]} iconType="culture" onClick={() => onSelectGate("CULTURAL")} />
        <LogicCube label="SPORTS" color="#ff4500" position={[-6, -4, 0]} iconType="sports" onClick={() => onSelectGate("SPORTS")} />
        <LogicCube label="GAME" color="#00ffcc" position={[6, -4, 0]} iconType="gaming" onClick={() => onSelectGate("GAME")} />
      </group>

      <GridFloor />
      <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={100} blur={2.5} far={15} />
      
      <Stars 
        radius={300} 
        depth={100} 
        count={25000} 
        factor={2} 
        saturation={0.5} 
        fade 
        speed={1.5} 
      />
      
      <fog attach="fog" args={['#000000', 20, 150]} />
    </group>
  );
};

export default Scene;
