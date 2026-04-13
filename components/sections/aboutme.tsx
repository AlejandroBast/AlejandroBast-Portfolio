"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "REST APIs"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel"] },
]

const stats = [
  { value: "3+", label: "Años de experiencia" },
  { value: "20+", label: "Proyectos completados" },
  { value: "100%", label: "Compromiso con calidad" },
]

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center py-32 px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div
          className="mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">01 — Sobre mí</p>
          <h2 className="text-5xl font-bold text-white md:text-6xl">Quién soy</h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            <p className="mb-6 text-lg leading-8 text-white/70">
              Soy <span className="text-white font-medium">Alejandro Bast</span>, un
              desarrollador apasionado por construir productos digitales que combinen
              funcionalidad, rendimiento y experiencia de usuario cuidada al detalle.
            </p>
            <p className="mb-6 text-lg leading-8 text-white/70">
              Me especializo en desarrollo web fullstack, con especial interés en
              interfaces modernas e interactivas. Disfruto cada etapa del proceso:
              desde la arquitectura hasta la animación de un botón.
            </p>
            <p className="text-lg leading-8 text-white/70">
              Cuando no estoy programando, exploro diseño UI, tecnologías emergentes y
              nuevas formas de resolver problemas con código limpio y elegante.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ease ${0.4 + i * 0.1}s, transform 0.7s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs text-white/40 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            <div className="space-y-8">
              {skills.map((group, gi) => (
                <div key={group.category}>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <span
                        key={skill}
                        className="skill-pill"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "scale(1)" : "scale(0.85)",
                          transition: `opacity 0.5s ease ${0.5 + gi * 0.12 + si * 0.06}s, transform 0.5s ease ${0.5 + gi * 0.12 + si * 0.06}s`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-12"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.8s" }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skill-pill {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.02em;
          transition: border-color 0.25s, background 0.25s, color 0.25s;
          cursor: default;
        }
        .skill-pill:hover {
          border-color: rgba(5,199,233,0.4);
          background: rgba(5,199,233,0.08);
          color: rgba(255,255,255,0.95);
        }
      `}</style>
    </section>
  )
}
