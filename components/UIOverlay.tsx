
import React from 'react';

const UIOverlay: React.FC = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center pointer-events-none z-10 select-none">
      
      {/* 1. HUD Layer: Top Right System Telemetry */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 font-mono text-cyan-400 text-[9px] tracking-widest opacity-60">
        <p className="border-b border-cyan-400/30 pb-1 font-bold uppercase">System Telemetry</p>
        <p>[UPTIME: 00.00.88]</p>
        <p>[NODE_COUNT: 4200]</p>
        <p>[NEURAL_LINK: ACTIVE]</p>
        
        {/* Fullscreen Toggle */}
        <button 
          onClick={toggleFullscreen}
          className="mt-4 pointer-events-auto bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-[8px] hover:bg-cyan-500/20 transition-all uppercase tracking-widest"
        >
          [ TOGGLE_FULLSCREEN ]
        </button>
      </div>

      {/* 2. HUD Layer: Top Left Branding */}
      <div className="absolute top-10 left-10 flex items-center gap-4 opacity-80">
        <div className="h-10 w-[2px] bg-cyan-500 shadow-[0_0_15px_#00f2ff] rounded-full" />
        <div>
          <h1 className="text-white font-black tracking-[0.4em] text-lg uppercase leading-none">NUV.YUVA</h1>
          <p className="text-cyan-400/40 text-[8px] uppercase tracking-[0.3em] mt-1">Navrachana University</p>
        </div>
      </div>

      {/* 3. Bottom Left Interface Panel */}
      <div className="absolute bottom-10 left-10 h-20 w-64 border border-white/5 bg-black/40 rounded-xl backdrop-blur-xl p-3 overflow-hidden">
        <div className="relative h-full flex flex-col justify-between">
            <div className="w-full h-0.5 bg-white/10 rounded overflow-hidden">
                <div className="h-full bg-cyan-500 w-1/4 animate-pulse" />
            </div>
            <p className="font-mono text-[8px] text-white/40 leading-relaxed uppercase tracking-[0.2em]">
                [QUANTUM_GATE: STABLE]<br/>
                [SYST_SYNC: 0.9997]<br/>
                <span className="text-cyan-400/60">[SCROLL_TO_INITIATE_DIVE]</span>
            </p>
        </div>
      </div>

      {/* Static Scanline Overlays for corners */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-white/10" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-white/10" />
    </div>
  );
};

export default UIOverlay;
