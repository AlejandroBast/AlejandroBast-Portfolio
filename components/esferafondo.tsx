"use client"

import { useEffect } from "react"

export function HeroSphere() {
  useEffect(() => {
    const earthInner = document.getElementById("earthInner")!
    const earthHover = document.getElementById("earthHover")!
    const cursorDot = document.getElementById("cursorDot")!
    const cursorRing = document.getElementById("cursorRing")!

    let SPHERE = 0
    let animationId = 0

    function buildLayout() {
      SPHERE = Math.min(window.innerWidth * 0.42, 700)

      earthInner.style.width = `${SPHERE}px`
      earthInner.style.height = `${SPHERE}px`
    }

    buildLayout()
    window.addEventListener("resize", buildLayout)

    let target = { x: -9999, y: -9999, r: 0 }
    let current = { x: -9999, y: -9999, r: 0 }

    function applyMask(x: number, y: number, r: number) {
      const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0%, black 80%)`
      earthHover.style.maskImage = mask
      earthHover.style.webkitMaskImage = mask
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function animateMask() {
      current.x = lerp(current.x, target.x, 0.1)
      current.y = lerp(current.y, target.y, 0.1)
      current.r = lerp(current.r, target.r, 0.09)

      applyMask(current.x, current.y, Math.max(0, current.r))
      animationId = requestAnimationFrame(animateMask)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = earthInner.getBoundingClientRect()

      target.x = e.clientX - rect.left
      target.y = e.clientY - rect.top
      target.r = Math.round(SPHERE * 0.37)

      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
      cursorRing.style.left = `${e.clientX}px`
      cursorRing.style.top = `${e.clientY}px`
    }

    const handleMouseLeave = () => {
      target.r = 0
      cursorDot.style.opacity = "0"
      cursorRing.style.opacity = "0"
    }

    const handleMouseEnter = () => {
      cursorDot.style.opacity = "1"
      cursorRing.style.opacity = "1"
    }

    animateMask()

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("resize", buildLayout)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      <div className="hero-sphere-wrap">
        <div className="hero-earth-inner" id="earthInner">
          <img
            className="hero-earth-bg"
            src="hero-item.png"
            alt=""
          />
          <img
            className="hero-earth-hover"
            id="earthHover"
            src="hero-item-hover.png"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}