"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface TransitionContextType {
  isTransitioning: boolean
  triggerTransition: (callback?: () => void) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null)

  const triggerTransition = useCallback((callback?: () => void) => {
    setIsTransitioning(true)
    if (callback) {
      setPendingCallback(() => callback)
    }
  }, [])

  const onTransitionMidpoint = useCallback(() => {
    if (pendingCallback) {
      pendingCallback()
      setPendingCallback(null)
    }
  }, [pendingCallback])

  const onTransitionComplete = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}
      <PageTransitionOverlay 
        isActive={isTransitioning} 
        onMidpoint={onTransitionMidpoint}
        onComplete={onTransitionComplete}
      />
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider")
  }
  return context
}

function PageTransitionOverlay({ 
  isActive, 
  onMidpoint,
  onComplete 
}: { 
  isActive: boolean
  onMidpoint: () => void
  onComplete: () => void
}) {
  const [phase, setPhase] = useState<"idle" | "entering" | "leaving">("idle")

  // Handle transition phases
  if (isActive && phase === "idle") {
    setPhase("entering")
    // Midpoint - when curtain is fully down
    setTimeout(() => {
      onMidpoint()
      setPhase("leaving")
    }, 600)
    // Complete - curtain fully up
    setTimeout(() => {
      setPhase("idle")
      onComplete()
    }, 1200)
  }

  if (phase === "idle") return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Main curtain layer 1 */}
      <div
        className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: phase === "entering" ? "translateY(0)" : phase === "leaving" ? "translateY(-100%)" : "translateY(100%)",
          background: `linear-gradient(
            180deg,
            #000000 0%,
            #001a2c 15%,
            #003352 30%,
            #004d6e 45%,
            #0891b2 60%,
            #06b6d4 75%,
            #22d3ee 90%,
            #67e8f9 100%
          )`,
        }}
      />

      {/* Second layer - delayed */}
      <div
        className="absolute inset-0 transition-transform duration-[600ms] delay-[50ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: phase === "entering" ? "translateY(0)" : phase === "leaving" ? "translateY(-100%)" : "translateY(100%)",
          background: `linear-gradient(
            180deg,
            #000000 0%,
            #000814 25%,
            #001d3d 50%,
            #003566 75%,
            #004080 100%
          )`,
        }}
      />

      {/* Third layer - most delayed */}
      <div
        className="absolute inset-0 transition-transform duration-[600ms] delay-[100ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: phase === "entering" ? "translateY(0)" : phase === "leaving" ? "translateY(-100%)" : "translateY(100%)",
          background: "#000000",
        }}
      />

      {/* Shimmer line at edge */}
      <div
        className="absolute left-0 right-0 h-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          bottom: phase === "entering" ? "0" : "auto",
          top: phase === "leaving" ? "0" : "auto",
          transform: "translateY(0)",
          background: "linear-gradient(90deg, transparent, #22d3ee, #06b6d4, #22d3ee, transparent)",
          boxShadow: "0 0 20px 8px rgba(6, 182, 212, 0.4)",
        }}
      />

      {/* Center indicator */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: phase === "entering" ? 1 : 0 }}
      >
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-cyan-500/30 rounded-full scale-150" />
          <div className="relative w-12 h-12">
            <div 
              className="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping"
              style={{ animationDuration: "1s" }}
            />
            <div 
              className="absolute inset-2 border-2 border-cyan-300/70 rounded-full animate-ping"
              style={{ animationDuration: "1s", animationDelay: "0.15s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
