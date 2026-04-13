"use client"

import { useEffect, useState } from "react"
import { HeroOrbits } from "@/components/hero-orbits"
import { useLanguage } from "@/contexts/language-context"
import { useTransition } from "@/contexts/transition-context"

export function HeroSection() {
  const { t } = useLanguage()
  const { triggerTransition } = useTransition()
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
    triggerTransition(() => {
      const target = document.getElementById(targetId)
      if (!target) return
      target.scrollIntoView({ behavior: "instant", block: "start" })
    })
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Transparent background overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <HeroOrbits />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
            {t("hero.subtitle")}
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
            <br />
            {t("hero.title3")}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:mt-6 sm:text-base md:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <button
              onClick={() => smoothScrollToSection("proyectos")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105 sm:px-6 sm:py-3"
            >
              {t("hero.projects")}
            </button>

            <button
              onClick={() => smoothScrollToSection("contacto")}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-105 sm:px-6 sm:py-3"
            >
              {t("hero.contact")}
            </button>
          </div>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Ir a la siguiente sección"
        className={`hero-scroll-curve hidden md:flex ${hideScrollArc ? "hero-scroll-curve--hidden" : ""}`}
        onClick={(e) => {
          e.preventDefault()
          smoothScrollToSection("sobre-mi")
        }}
      >
        <span className="hero-scroll-line"></span>
        <span className="hero-scroll-text">{t("hero.scroll")}</span>
      </a>

      {/* Mobile scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden transition-opacity duration-300 ${
          hideScrollArc ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-white/50">{t("hero.scroll")}</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
