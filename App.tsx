
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { Environment, ScrollControls, Scroll } from '@react-three/drei';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import MacroZoomCard from './components/MacroZoomCard';

const App: React.FC = () => {
  const [activeGate, setActiveGate] = useState<string | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          stencil: false,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]} // High DPI support for sharp stars
        className="fixed inset-0 z-0"
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25}>
            <Scene onSelectGate={(label) => setActiveGate(label)} />
            
            <Scroll html>
              <div className="w-screen">
                {/* Section 1: Hero Splash */}
                <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none">
                  <div className="absolute bottom-10 animate-bounce opacity-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="m7 13 5 5 5-5M7 6l5 5 5-5"/></svg>
                  </div>
                </section>

                {/* Section 2: ARCHIVE */}
                <section className="h-[200vh] w-full flex flex-col items-start justify-start pt-32 px-10 md:px-20 pointer-events-none">
                   <div className="relative mb-16">
                      <h2 className="text-white font-black text-6xl md:text-9xl tracking-tighter opacity-10 uppercase select-none">Archive</h2>
                      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2">
                        <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase bg-cyan-950/20 px-3 py-1 border-l-2 border-cyan-500">
                          DECRYPTING_PAST_SEQUENCES...
                        </p>
                        <h4 className="text-white/80 font-bold text-lg tracking-widest uppercase ml-1 italic">
                          "The Neural Latent Space"
                        </h4>
                      </div>
                   </div>
                   
                   <div className="mt-10 w-full max-w-lg">
                      <div className="p-8 border border-cyan-500/10 bg-black/60 backdrop-blur-md rounded-2xl relative overflow-hidden group">
                         <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                               <span className="text-[10px] text-cyan-400 font-mono tracking-[0.4em] uppercase">High_Dim_Sync</span>
                               <span className="text-[10px] text-white/40 font-mono">LATENT_VECTOR_FIELD_42.0</span>
                            </div>
                            <p className="text-sm text-white/70 font-mono leading-relaxed mb-8">
                               Every "star" in this galaxy is a Memory Fragment. Scroll to "fly" through the liquid cloud of past highlights.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-cyan-500 w-3/4 animate-pulse" />
                                </div>
                                <span className="text-[8px] font-mono text-cyan-400">99.7%_FIDELITY</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </section>

                {/* Section 3: Logic Gates */}
                <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center opacity-80">
                    <h2 className="text-xs font-mono tracking-[0.8em] text-cyan-400 mb-2 uppercase">Neural_Nodes</h2>
                    <h3 className="text-4xl font-black tracking-[0.4em] text-white/90 uppercase">Logic_Gates</h3>
                    <div className="mt-4 w-64 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  </div>
                </section>

                {/* Section 4: Exit */}
                <section className="h-screen w-full flex flex-col items-center justify-end pb-20 pointer-events-none">
                   <p className="font-mono text-[9px] text-cyan-500/40 uppercase tracking-[0.5em]">[ END_OF_TRANSMISSION ]</p>
                </section>
              </div>
            </Scroll>
          </ScrollControls>

          <Environment preset="city" />
          
          {/* Fix: Removed JSX comment and potential whitespace text nodes within EffectComposer children */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
            <Noise opacity={0.02} />
            <Vignette darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <UIOverlay />

      {activeGate && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in zoom-in duration-500">
          <MacroZoomCard label={activeGate} onClose={() => setActiveGate(null)} />
        </div>
      )}

      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none z-5 opacity-60" />
    </div>
  );
};

export default App;
