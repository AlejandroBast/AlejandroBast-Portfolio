"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: "01",
    title: "Dashboard Analytics",
    description:
      "Plataforma de análisis de datos en tiempo real con visualizaciones interactivas, filtros avanzados y exportación de reportes.",
    tags: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL"],
    link: "#",
    year: "2024",
    color: "rgba(5, 199, 233, 0.12)",
    glow: "rgba(5, 199, 233, 0.25)",
  },
  {
    id: "02",
    title: "E-Commerce Fullstack",
    description:
      "Tienda online completa con carrito de compras, pasarela de pago, panel de administración y sistema de inventario.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
    year: "2024",
    color: "rgba(120, 115, 245, 0.12)",
    glow: "rgba(120, 115, 245, 0.25)",
  },
  {
    id: "03",
    title: "App de Gestión de Tareas",
    description:
      "Herramienta de productividad con tableros Kanban, colaboración en tiempo real, notificaciones y sincronización offline.",
    tags: ["React", "Socket.io", "Express", "Tailwind"],
    link: "#",
    year: "2023",
    color: "rgba(255, 110, 196, 0.12)",
    glow: "rgba(255, 110, 196, 0.25)",
  },
  {
    id: "04",
    title: "API REST Escalable",
    description:
      "Backend robusto con autenticación JWT, rate limiting, documentación Swagger y despliegue con Docker y CI/CD.",
    tags: ["Node.js", "Express", "Docker", "Swagger"],
    link: "#",
    year: "2023",
    color: "rgba(255, 180, 50, 0.12)",
    glow: "rgba(255, 180, 50, 0.2)",
  },
]

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0]
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${0.1 + index * 0.12}s, transform 0.8s ease ${0.1 + index * 0.12}s`,
      }}
    >
      <a
        href={project.link}
        className="project-card"
        style={{
          background: hovered ? project.color : "rgba(255,255,255,0.025)",
          boxShadow: hovered ? `0 0 40px ${project.glow}` : "none",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-mono text-white/25 tracking-widest">{project.id}</span>
          <div
            className="flex items-center gap-1 text-xs text-white/40 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0.4 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {project.year}
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
        <p className="mb-6 text-sm leading-6 text-white/55">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="mt-6 flex items-center gap-2 text-xs font-medium text-white/50 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)" }}
        >
          Ver proyecto
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </a>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center py-32 px-6"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <div
          className="mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">02 — Proyectos</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-5xl font-bold text-white md:text-6xl">Mi trabajo</h2>
            <a
              href="#"
              className="text-sm text-white/40 underline underline-offset-4 transition hover:text-white/80"
            >
              Ver todos →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          display: block;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 28px;
          text-decoration: none;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, transform 0.3s ease;
          cursor: pointer;
          height: 100%;
        }
        .project-card:hover {
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  )
}
