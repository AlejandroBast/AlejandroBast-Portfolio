"use client"

import { useRef, useState, type ReactNode } from "react"

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  /** Color of the spotlight glow that follows the cursor */
  spotlightColor?: string
  style?: React.CSSProperties
}

/**
 * React Bits – SpotlightCard
 * A card with a soft radial highlight that follows the cursor.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(5, 199, 233, 0.18)",
  style,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`spotlight-card ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(circle 260px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
