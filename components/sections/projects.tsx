"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: {
    id: string
    title: string
    description: string
    tags: string[]
    link: string
    year: string
    color: string
    glow: string
  }
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const { t } = useLanguage()

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
        <div className="flex items-start justify-between mb-3 sm:mb-4">
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

        <h3 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl">{project.title}</h3>
        <p className="mb-4 text-xs leading-6 text-white/55 sm:mb-6 sm:text-sm">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60 sm:px-3 sm:py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50 transition-all duration-300 sm:mt-6"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)" }}
        >
          {t("projects.view")}
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
  const { t } = useLanguage()

  const projects = [
    {
      id: "01",
      title: t("project.1.title"),
      description: t("project.1.desc"),
      tags: ["Next.js", "TypeScript", "Chart.js", "PostgreSQL"],
      // TODO: Reemplaza con el link real de tu proyecto o repositorio GitHub
      link: "https://github.com/AlejandroBast",
      year: "2024",
      color: "rgba(5, 199, 233, 0.12)",
      glow: "rgba(5, 199, 233, 0.25)",
    },
    {
      id: "02",
      title: t("project.2.title"),
      description: t("project.2.desc"),
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      // TODO: Reemplaza con el link real de tu proyecto o repositorio GitHub
      link: "https://github.com/AlejandroBast",
      year: "2024",
      color: "rgba(120, 115, 245, 0.12)",
      glow: "rgba(120, 115, 245, 0.25)",
    },
    {
      id: "03",
      title: t("project.3.title"),
      description: t("project.3.desc"),
      tags: ["React", "Socket.io", "Express", "Tailwind"],
      // TODO: Reemplaza con el link real de tu proyecto o repositorio GitHub
      link: "https://github.com/AlejandroBast",
      year: "2023",
      color: "rgba(255, 110, 196, 0.12)",
      glow: "rgba(255, 110, 196, 0.25)",
    },
    {
      id: "04",
      title: t("project.4.title"),
      description: t("project.4.desc"),
      tags: ["Node.js", "Express", "Docker", "Swagger"],
      // TODO: Reemplaza con el link real de tu proyecto o repositorio GitHub
      link: "https://github.com/AlejandroBast",
      year: "2023",
      color: "rgba(255, 180, 50, 0.12)",
      glow: "rgba(255, 180, 50, 0.2)",
    },
  ]

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
      className="relative z-20 min-h-screen flex items-center justify-center py-20 px-4 sm:py-32 sm:px-6"
    >
      {/* Transparent background overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)",
          backdropFilter: "blur(1px)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <div
          className="mb-12 sm:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40 sm:mb-3 sm:tracking-[0.35em]">{t("projects.section")}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">{t("projects.title")}</h2>
            <a
              href="#"
              className="text-sm text-white/40 underline underline-offset-4 transition hover:text-white/80"
            >
              {t("projects.viewAll")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          display: block;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 20px;
          text-decoration: none;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, transform 0.3s ease;
          cursor: pointer;
          height: 100%;
        }
        @media (min-width: 640px) {
          .project-card {
            border-radius: 16px;
            padding: 28px;
          }
        }
        .project-card:hover {
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  )
}
