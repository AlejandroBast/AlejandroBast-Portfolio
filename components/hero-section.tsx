"use client"

import { useEffect, useState } from "react"
import { HeroOrbits } from "@/components/hero-orbits"

export function HeroSection() {
  const [hideScrollArc, setHideScrollArc] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHideScrollArc(window.scrollY > 60)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const smoothScrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (!target) return

    const start = window.scrollY
    const end = target.getBoundingClientRect().top + window.scrollY
    const duration = 1200
    let startTime: number | null = null

    const easeInOutCubic = (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      const nextPosition = start + (end - start) * easedProgress
      window.scrollTo(0, nextPosition)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <HeroOrbits />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl px-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            Alejandro Bast
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            SOFTWARE 
            <br />
            ENGINEER
            <br />
            & DEVELOPER
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg">
            Creo interfaces modernas, elegantes e interactivas con enfoque en
            diseño, rendimiento y experiencia de usuario.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Ver proyectos
            </a>

            <a
              href="#contacto"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-105"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Ir a la siguiente sección"
        className={`hero-scroll-curve ${hideScrollArc ? "hero-scroll-curve--hidden" : ""}`}
        onClick={(e) => {
          e.preventDefault()
          smoothScrollToSection("sobre-mi")
        }}
      >
        <span className="hero-scroll-line"></span>
        <span className="hero-scroll-text">Scroll Down</span>
      </a>
    </section>
  )
}