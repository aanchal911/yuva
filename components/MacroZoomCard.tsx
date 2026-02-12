
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface MacroZoomCardProps {
  label: string;
  onClose: () => void;
}

const HologramTrophy = () => {
    return (
        <group>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0.4, 0]}>
                    <cylinderGeometry args={[0.5, 0.3, 0.9, 32]} />
                    <meshStandardMaterial color="#00f2ff" wireframe emissive="#00f2ff" emissiveIntensity={2} transparent opacity={0.6} />
                </mesh>
                <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, 0.2]}>
                    <torusGeometry args={[0.3, 0.03, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={2} />
                </mesh>
                <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, -0.2]}>
                    <torusGeometry args={[0.3, 0.03, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={2} />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <boxGeometry args={[0.6, 0.3, 0.6]} />
                    <meshStandardMaterial color="#00f2ff" wireframe emissive="#00f2ff" emissiveIntensity={2} />
                </mesh>
            </Float>
            <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={2.4} far={2} />
        </group>
    );
};

const MacroZoomCard: React.FC<MacroZoomCardProps> = ({ label, onClose }) => {
  const [timeLeft, setTimeLeft] = useState('00:59:45');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const s = String(59 - now.getSeconds()).padStart(2, '0');
      const ms = String(99 - Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimeLeft(`00:${s}:${ms}`);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[95vw] md:w-[90vw] max-w-4xl h-[85vh] md:h-[70vh] bg-[#0a0a0a]/98 border-[2px] border-cyan-400 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,242,255,0.4)] pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-cyan-500/10 bg-black/60">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-cyan-300/80 uppercase">
          <span className="hidden sm:inline">NUVYUVA_2026</span>
          <span className="hidden sm:inline text-cyan-900">/</span>
          <span>EVENTS</span>
          <span className="text-cyan-900">/</span>
          <span className="text-cyan-400 font-bold">{label}</span>
        </div>
        
        {/* CROSS BUTTON (Close Button) */}
        <button 
          onClick={onClose} 
          className="group w-10 h-10 flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-900/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 active:scale-90"
          aria-label="Close modal"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-cyan-400 group-hover:text-red-400 group-hover:rotate-90 transition-all duration-300"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 overflow-hidden">
        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none uppercase">{label}_PROTOCOL</h2>
            <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-xl sm:text-2xl">// PHASE_01</span>
                <div className="flex-1 h-[1px] bg-white/10" />
            </div>
          </div>

          <div className="flex-1 bg-black/60 border border-white/5 rounded-xl p-6 font-mono text-xs flex gap-5 overflow-hidden">
            <div className="text-white/20 select-none text-right w-6 border-r border-white/10 pr-4 flex flex-col gap-1.5">
               {Array.from({length: 10}).map((_, i) => <div key={i}>{String(i+1).padStart(2, '0')}</div>)}
            </div>
            <div className="flex-1 text-white/80 space-y-4">
              <div className="text-cyan-400 font-bold uppercase tracking-widest text-[9px]">Mission_Briefing:</div>
              <p className="leading-relaxed">
                Subject: Establishing neural handshake with the {label} gate.<br/><br/>
                Requirement: 100% data fidelity.<br/>
                Target: {label === 'TECHNICAL' ? 'Algorithm optimization and system architecture' : 'Cultural decentralization and community synergy'}.
              </p>
              <div className="h-0.5 w-full bg-white/5">
                <div className="h-full bg-cyan-400 w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 h-48 md:h-full relative rounded-2xl border border-white/5 bg-black/40">
           <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
              <Suspense fallback={null}>
                  <HologramTrophy />
                  <OrbitControls enableZoom={false} autoRotate />
              </Suspense>
           </Canvas>
           <div className="absolute bottom-6 left-0 w-full text-center">
             <div className="text-[9px] text-cyan-400/60 font-mono tracking-widest uppercase mb-1">Gate_Expiry:</div>
             <div className="text-2xl md:text-3xl font-mono font-black text-green-400 tracking-tighter italic">{timeLeft}</div>
           </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8 flex items-center justify-center">
        <button className="w-full md:w-auto px-12 py-4 border-[2px] border-cyan-400 bg-cyan-900/10 text-cyan-100 font-bold tracking-[0.3em] rounded-lg hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_30px_rgba(0,242,255,0.1)] uppercase text-sm md:text-base">
          Access Logic_Gate
        </button>
      </div>

      {/* Scratches/Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-30 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default MacroZoomCard;
