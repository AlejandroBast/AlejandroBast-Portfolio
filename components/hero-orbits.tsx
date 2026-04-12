"use client"

import { useEffect, useState } from "react"

export function HeroOrbits() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const scene = document.getElementById("heroOrbitsScene")!
    const orbit1 = document.getElementById("heroOrbit1")!
    const orbit2 = document.getElementById("heroOrbit2")!

    let SPHERE = 0
    const ORBIT_SCALES = [1.18, 1.52]

    function buildLayout() {
      SPHERE = Math.min(window.innerWidth * 0.42, 700)
      const maxOrbit = SPHERE * ORBIT_SCALES[ORBIT_SCALES.length - 1]

      scene.style.width = `${maxOrbit}px`
      scene.style.height = `${maxOrbit}px`

      orbit1.style.width = `${SPHERE * ORBIT_SCALES[0]}px`
      orbit1.style.height = `${SPHERE * ORBIT_SCALES[0]}px`

      orbit2.style.width = `${SPHERE * ORBIT_SCALES[1]}px`
      orbit2.style.height = `${SPHERE * ORBIT_SCALES[1]}px`
    }

    function handleScroll() {
      setHidden(window.scrollY > 120)
    }

    buildLayout()
    handleScroll()

    window.addEventListener("resize", buildLayout)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", buildLayout)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="scene" id="heroOrbitsScene">
        <div className="orbit-layer orbit-1" id="heroOrbit1">
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
        </div>

        <div className="orbit-layer orbit-2" id="heroOrbit2">
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
          <div className="orbit-dot-wrap"><span className="orbit-dot"></span></div>
        </div>
      </div>
    </div>
  )
}