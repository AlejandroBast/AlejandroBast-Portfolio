"use client"

import { useEffect, useRef, useState } from "react"

const skillGroups = [
  {
    category: "Lenguajes",
    color: "rgba(5,199,233,0.35)",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Librerías",
    color: "rgba(120,115,245,0.35)",
    items: ["React", "Next.js", "Vue", "Angular", "Django", "Spring", "Bootstrap", "Node.js"],
  },
  {
    category: "Bases de Datos",
    color: "rgba(255,110,196,0.35)",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "SQL"],
  },
  {
    category: "Backend & DevOps",
    color: "rgba(255,180,50,0.35)",
    items: ["Java", "Python", "Node.js", "Spring", "C++", "Docker", "Nginx", "AWS"],
  },
  {
    category: "Herramientas",
    color: "rgba(100,220,120,0.35)",
    items: ["Figma", "Git", "GitLab", "Unreal Engine 5", "Blueprints", "Hardware"],
  },
]

const education = [
  {
    degree: "Ingeniería de Software",
    year: "3er año en curso",
    icon: "🎓",
  },
  {
    degree: "Ingeniería en Software Comercial",
    year: "3er año en curso",
    icon: "💼",
  },
]

const interests = [
  { label: "Música", icon: "🎵" },
  { label: "Aire libre", icon: "🌿" },
  { label: "Desarrollo de videojuegos", icon: "🎮" },
  { label: "Hardware & Componentes", icon: "🖥️" },
]

const stats = [
  { value: "3er", label: "año de carrera" },
  { value: "Full", label: "Stack Junior Dev" },
  { value: "10+", label: "tecnologías" },
]

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
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

        {/* Heading */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">01 — Sobre mí</p>
          <h2 className="text-5xl font-bold text-white md:text-6xl">Quién soy</h2>
        </div>

        {/* Top: photo + bio */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">

          {/* Photo placeholder */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
          >
            <div className="photo-frame">
              <div className="photo-inner">
                <div className="photo-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" className="text-white/20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="mt-3 text-xs text-white/25 text-center leading-5">Reemplaza esta sección<br/>con tu foto</p>
                </div>
              </div>
              <div className="photo-glow" />
            </div>

            {/* Stats below photo */}
            <div className="mt-6 grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.6s ease ${0.5 + i * 0.1}s`,
                  }}
                >
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/35 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}
          >
            <p className="mb-5 text-lg leading-8 text-white/70">
              Soy <span className="text-white font-semibold">Alejandro Bast</span>, desarrollador
              web <span className="text-white/90">Full Stack Junior</span> con pasión por construir productos
              digitales modernos, funcionales y bien diseñados.
            </p>
            <p className="mb-5 text-lg leading-8 text-white/70">
              Actualmente curso el tercer año de <span className="text-white/90">Ingeniería de Software</span> e
              Ingeniería en Software Comercial. Trabajo con un stack amplio que abarca desde
              frontend y backend hasta bases de datos, DevOps y diseño UI.
            </p>
            <p className="mb-8 text-lg leading-8 text-white/70">
              Más allá del código, me interesa el desarrollo de videojuegos con Unreal Engine 5,
              la manipulación de hardware y mantenerme en constante aprendizaje de nuevas tecnologías.
            </p>

            {/* Education */}
            <div className="mb-8">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">Educación</p>
              <div className="space-y-3">
                {education.map((e) => (
                  <div key={e.degree} className="edu-card">
                    <span className="text-2xl">{e.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-white/90">{e.degree}</p>
                      <p className="text-xs text-white/40">{e.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">Intereses</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span key={item.label} className="interest-pill">
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* CV button */}
            <div className="mt-10">
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

        {/* Skills tabs */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
          }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">Stack tecnológico</p>

          {/* Tab buttons */}
          <div className="mb-8 flex flex-wrap gap-2">
            {skillGroups.map((g, i) => (
              <button
                key={g.category}
                onClick={() => setActiveTab(i)}
                className="tab-btn"
                style={{
                  borderColor: activeTab === i ? g.color : "rgba(255,255,255,0.08)",
                  background: activeTab === i ? `${g.color.replace("0.35", "0.1")}` : "rgba(255,255,255,0.03)",
                  color: activeTab === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              >
                {g.category}
              </button>
            ))}
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 min-h-[60px]">
            {skillGroups[activeTab].items.map((skill, si) => (
              <span
                key={skill}
                className="skill-pill"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.85)",
                  transition: `opacity 0.4s ease ${si * 0.05}s, transform 0.4s ease ${si * 0.05}s`,
                  borderColor: skillGroups[activeTab].color.replace("0.35", "0.25"),
                  background: skillGroups[activeTab].color.replace("0.35", "0.07"),
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .photo-frame {
          position: relative;
          width: 100%;
          max-width: 280px;
        }
        .photo-inner {
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          position: relative;
          z-index: 1;
        }
        .photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .photo-glow {
          position: absolute;
          inset: -1px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(5,199,233,0.15), rgba(120,115,245,0.1), transparent 60%);
          z-index: 0;
          pointer-events: none;
        }
        .stat-card {
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
        }
        .edu-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
        }
        .interest-pill {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          font-size: 0.8rem;
          color: rgba(255,255,255,0.65);
        }
        .tab-btn {
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .tab-btn:hover {
          color: rgba(255,255,255,0.85) !important;
        }
        .skill-pill {
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.02em;
          transition: transform 0.2s ease, opacity 0.2s ease;
          cursor: default;
        }
        .skill-pill:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
