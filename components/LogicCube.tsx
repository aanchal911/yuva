
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Edges, Text, Float, useCursor, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { LogicGateProps } from '../types';

interface ExtendedLogicGateProps extends LogicGateProps {
    onClick?: () => void;
}

const TechnicalIcon = ({ color }: { color: string }) => (
  <group scale={1.2}>
    <Box args={[0.6, 0.6, 0.15]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={8} transparent opacity={0.9} />
    </Box>
    <Box args={[0.3, 0.3, 0.17]}>
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
    </Box>
    {[...Array(3)].map((_, i) => (
      <React.Fragment key={i}>
        <Box args={[0.06, 0.15, 0.05]} position={[0.2 * (i - 1), 0.38, 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </Box>
        <Box args={[0.06, 0.15, 0.05]} position={[0.2 * (i - 1), -0.38, 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </Box>
        <Box args={[0.15, 0.06, 0.05]} position={[0.38, 0.2 * (i - 1), 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </Box>
        <Box args={[0.15, 0.06, 0.05]} position={[-0.38, 0.2 * (i - 1), 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
        </Box>
      </React.Fragment>
    ))}
  </group>
);

const CulturalIcon = ({ color }: { color: string }) => {
  const curve1 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.8, -0.4, 0),
    new THREE.Vector3(-0.4, 0.5, 0.2),
    new THREE.Vector3(0.4, -0.3, -0.2),
    new THREE.Vector3(0.8, 0.6, 0),
  ]), []);

  const curve2 = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.7, 0.3, -0.1),
    new THREE.Vector3(0, -0.6, 0.3),
    new THREE.Vector3(0.7, 0.2, -0.1),
  ]), []);

  return (
    <group scale={1.1}>
      <mesh position={[0, 0, 0.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, -0.3, 0.05]}>
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <tubeGeometry args={[curve1, 64, 0.08, 8, false]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={10} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <tubeGeometry args={[curve2, 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={10} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const SportsIcon = ({ color }: { color: string }) => (
  <group rotation={[0, 0, 0.2]} scale={1.2}>
    <mesh position={[0, 0.4, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={10} />
    </mesh>
    <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0.3]}>
      <boxGeometry args={[0.12, 0.4, 0.1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <mesh position={[0.2, 0.2, 0]} rotation={[0, 0, -1]}>
      <boxGeometry args={[0.06, 0.3, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, 1]}>
      <boxGeometry args={[0.06, 0.3, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <mesh position={[0.1, -0.3, 0]} rotation={[0, 0, 0.5]}>
      <boxGeometry args={[0.06, 0.4, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <mesh position={[-0.1, -0.25, 0]} rotation={[0, 0, -0.8]}>
      <boxGeometry args={[0.06, 0.35, 0.06]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
  </group>
);

const GamingIcon = ({ color }: { color: string }) => (
  <group scale={1.3}>
    <mesh position={[-0.3, -0.1, 0]} rotation={[0, 0, -0.4]}>
      <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <mesh position={[0.3, -0.1, 0]} rotation={[0, 0, 0.4]}>
      <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </mesh>
    <Box args={[0.6, 0.35, 0.2]} position={[0, 0.1, 0]}>
       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </Box>
    <Box args={[0.1, 0.1, 0.05]} position={[-0.2, 0.1, 0.12]}>
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
    </Box>
    <Sphere args={[0.05, 16, 16]} position={[0.2, 0.1, 0.12]}>
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
    </Sphere>
  </group>
);

const LogicCube: React.FC<ExtendedLogicGateProps> = ({ label, color, position, iconType, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const Icon = () => {
    switch (iconType) {
      case 'tech': return <TechnicalIcon color={color} />;
      case 'culture': return <CulturalIcon color={color} />;
      case 'sports': return <SportsIcon color={color} />;
      case 'gaming': return <GamingIcon color={color} />;
      default: return null;
    }
  };

  const particles = useMemo(() => {
    const temp = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 2.8;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 2.8;
    }
    return temp;
  }, []);

  const particleRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particleRef.current) {
      particleRef.current.rotation.y = t * 0.1;
      particleRef.current.rotation.z = t * 0.05;
    }
    if (meshRef.current) {
        meshRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.05 : 1, hovered ? 1.05 : 1, hovered ? 1.05 : 1), 0.1);
    }
  });

  return (
    <group position={position}>
      <group 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
      >
        <Box ref={meshRef} args={[3.2, 3.2, 3.2]}>
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.02} 
            metalness={1} 
            roughness={0} 
          />
          <Edges 
            threshold={15} 
            color={color} 
            scale={1}
          />
          <points ref={particleRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={400} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial 
              size={0.02} 
              color={color} 
              transparent 
              opacity={0.4} 
              sizeAttenuation 
              blending={THREE.AdditiveBlending} 
            />
          </points>
        </Box>

        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
          <Icon />
        </Float>

        {/* Improved Label Position: Moved inside the box base area to match reference */}
        <Text
          position={[0, -1.15, 0.2]}
          fontSize={0.3}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
        >
          {label}
        </Text>
      </group>
    </group>
  );
};

export default LogicCube;
