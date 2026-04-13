"use client"

import { useEffect, useState, useCallback, memo } from "react"
import Image from "next/image"

export const HeroSphere = memo(function HeroSphere() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const earthInner = document.getElementById("earthInner")!
    const earthHover = document.getElementById("earthHover")!
    const cursorDot = document.getElementById("cursorDot")!
    const cursorRing = document.getElementById("cursorRing")!

    let SPHERE = 0
    let animationId = 0

    function buildLayout() {
      // Smaller sphere on mobile
      const multiplier = window.innerWidth < 768 ? 0.85 : 1
      SPHERE = Math.min(window.innerWidth * multiplier, 1000)

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

      // Use transform instead of left/top to avoid layout reflows (GPU-accelerated)
      if (cursorDot && cursorRing) {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
        cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const handleMouseLeave = () => {
      target.r = 0
      if (cursorDot && cursorRing) {
        cursorDot.style.opacity = "0"
        cursorRing.style.opacity = "0"
      }
    }

    const handleMouseEnter = () => {
      if (cursorDot && cursorRing) {
        cursorDot.style.opacity = "1"
        cursorRing.style.opacity = "1"
      }
    }

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = earthInner.getBoundingClientRect()
        target.x = touch.clientX - rect.left
        target.y = touch.clientY - rect.top
        target.r = Math.round(SPHERE * 0.37)
      }
    }

    const handleTouchEnd = () => {
      target.r = 0
    }

    animateMask()

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", buildLayout)
      window.removeEventListener("resize", checkMobile)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {!isMobile && (
        <>
          <div className="cursor-dot" id="cursorDot"></div>
          <div className="cursor-ring" id="cursorRing"></div>
        </>
      )}

      <div className="hero-sphere-wrap">
        <div className="hero-earth-inner" id="earthInner">
          <Image
            className="hero-earth-bg"
            src="/hero-item.webp"
            alt="Hero sphere background"
            width={1400}
            height={1400}
            priority
            quality={85}
            sizes="(max-width: 768px) 85vw, 100vw"
          />
          <Image
            className="hero-earth-hover"
            id="earthHover"
            src="/hero-item-hover.webp"
            alt="Hero sphere hover effect"
            width={1400}
            height={1400}
            priority
            quality={85}
            sizes="(max-width: 768px) 85vw, 100vw"
          />
        </div>
      </div>
    </div>
  )
})
