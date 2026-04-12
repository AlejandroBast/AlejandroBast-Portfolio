"use client"

import { useEffect } from "react"

export function HeroSphere() {
  useEffect(() => {
    const scene = document.getElementById("scene")!
    const earthInner = document.getElementById("earthInner")!
    const earthHover = document.getElementById("earthHover")!
    const cursorDot = document.getElementById("cursorDot")!
    const cursorRing = document.getElementById("cursorRing")!

    const orbits = [
      document.getElementById("orbit1")!,
      document.getElementById("orbit2")!,
    ]

    let SPHERE = 0
    const ORBIT_SCALES = [1.18, 1.52]

    function buildLayout() {
      SPHERE = Math.min(window.innerWidth * 0.65, 860)
      const maxOrbit = SPHERE * ORBIT_SCALES[ORBIT_SCALES.length - 1]

      scene.style.width = `${maxOrbit}px`
      scene.style.height = `${maxOrbit}px`

      earthInner.style.width = `${SPHERE}px`
      earthInner.style.height = `${SPHERE}px`

      orbits.forEach((orbit, i) => {
        const size = `${SPHERE * ORBIT_SCALES[i]}px`
        orbit.style.width = size
        orbit.style.height = size
      })
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
      requestAnimationFrame(animateMask)
    }

    animateMask()

    document.addEventListener("mousemove", (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2

      target.x = e.clientX - (cx - SPHERE / 2)
      target.y = e.clientY - (cy - SPHERE / 2)
      target.r = Math.round(SPHERE * 0.37)

      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
      cursorRing.style.left = `${e.clientX}px`
      cursorRing.style.top = `${e.clientY}px`
    })

    document.addEventListener("mouseleave", () => {
      target.r = 0
      cursorDot.style.opacity = "0"
      cursorRing.style.opacity = "0"
    })

    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1"
      cursorRing.style.opacity = "1"
    })

    return () => {
      window.removeEventListener("resize", buildLayout)
    }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-earth-wrap">
          <div className="scene" id="scene">
            {/* ORBIT 1 */}
            <div className="orbit-layer orbit-1" id="orbit1">
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
            </div>

            {/* ORBIT 2 */}
            <div className="orbit-layer orbit-2" id="orbit2">
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
              <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
            </div>

            {/* ESFERA */}
            <div className="hero-earth-inner" id="earthInner">
              <img
                className="hero-earth-bg"
                src="hero-item.png"
                alt="item de abajo"
              />
              <img
                className="hero-earth-hover"
                id="earthHover"
                src="hero-item-hover.png"
                alt="item hover"
              />
            </div>
          </div>
        </div>

        <div className="hero-gradient"></div>
      </section>
    </>
  )
}