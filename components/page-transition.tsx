"use client";

import { useEffect, useState } from "react";

export function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 100);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          background: `linear-gradient(
            180deg,
            #000000 0%,
            #001a2c 20%,
            #003352 40%,
            #0891b2 60%,
            #06b6d4 75%,
            #22d3ee 90%,
            #67e8f9 100%
          )`,
        }}
      />

      {/* Second layer - delayed for depth effect */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          background: `linear-gradient(
            180deg,
            #000000 0%,
            #000814 30%,
            #001d3d 60%,
            #003566 100%
          )`,
        }}
      />

      {/* Third layer - most delayed */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 delay-200 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          background: "#000000",
        }}
      />

      {/* Loading indicator in center */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-cyan-500/30 rounded-full scale-150" />
          
          {/* Animated rings */}
          <div className="relative w-16 h-16">
            <div 
              className="absolute inset-0 border-2 border-cyan-400/40 rounded-full animate-ping"
              style={{ animationDuration: "1.5s" }}
            />
            <div 
              className="absolute inset-2 border-2 border-cyan-300/60 rounded-full animate-ping"
              style={{ animationDuration: "1.5s", animationDelay: "0.2s" }}
            />
            <div 
              className="absolute inset-4 border-2 border-cyan-200/80 rounded-full animate-ping"
              style={{ animationDuration: "1.5s", animationDelay: "0.4s" }}
            />
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer effect on the curtain edge */}
      <div
        className={`absolute left-0 right-0 h-1 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-[100vh]" : "translate-y-0"
        }`}
        style={{
          bottom: 0,
          background: "linear-gradient(90deg, transparent, #22d3ee, #06b6d4, #22d3ee, transparent)",
          boxShadow: "0 0 30px 10px rgba(6, 182, 212, 0.5)",
        }}
      />
    </div>
  );
}
