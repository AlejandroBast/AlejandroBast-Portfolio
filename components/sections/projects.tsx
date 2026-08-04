"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import BlurText from "@/components/reactbits/BlurText"
import SpotlightCard from "@/components/reactbits/SpotlightCard"

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
    demo?: string
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
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${0.1 + index * 0.12}s, transform 0.8s ease ${0.1 + index * 0.12}s`,
      }}
    >
      <SpotlightCard
        className="project-card flex h-full flex-col"
        spotlightColor={project.glow}
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

        {/* Links: code + optional live demo */}
        <div className="mt-5 flex items-center gap-4 pt-4 border-t border-white/[0.06] sm:mt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t("projects.code")}
          </a>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400/80 transition-colors hover:text-cyan-300"
            >
              {t("projects.demo")}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </div>
      </SpotlightCard>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const { t, lang } = useLanguage()

  const projects = [
    {
      id: "01",
      title: t("project.1.title"),
      description: t("project.1.desc"),
      tags: ["Next.js", "Python", "Playwright", "MySQL"],
      link: "https://github.com/AlejandroBast/inmobiliary-data",
      demo: "",
      year: "2026",
      color: "rgba(5, 199, 233, 0.12)",
      glow: "rgba(5, 199, 233, 0.25)",
    },
    {
      id: "02",
      title: t("project.2.title"),
      description: t("project.2.desc"),
      tags: ["Godot", "GDScript", "Game Design"],
      link: "https://github.com/AlejandroBast/BarrioLife",
      demo: "",
      year: "2026",
      color: "rgba(120, 115, 245, 0.12)",
      glow: "rgba(120, 115, 245, 0.25)",
    },
    {
      id: "03",
      title: t("project.3.title"),
      description: t("project.3.desc"),
      tags: ["TypeScript", "Audius API", "HTML", "CSS"],
      link: "https://github.com/AlejandroBast/Reproductor-SpotiFeev2",
      demo: "https://alejandrobast.github.io/Reproductor-SpotiFeev2/",
      year: "2025",
      color: "rgba(255, 110, 196, 0.12)",
      glow: "rgba(255, 110, 196, 0.25)",
    },
    {
      id: "04",
      title: t("project.4.title"),
      description: t("project.4.desc"),
      tags: ["Python", "FastAPI", "Next.js", "TypeScript"],
      link: "https://github.com/AlejandroBast/Minecraft-Server-Manager",
      demo: "",
      year: "2026",
      color: "rgba(100, 220, 120, 0.12)",
      glow: "rgba(100, 220, 120, 0.25)",
    },
    {
      id: "05",
      title: t("project.5.title"),
      description: t("project.5.desc"),
      tags: ["TypeScript", "Node.js", "SQLite", "WhatsApp API"],
      link: "https://github.com/AlejandroBast/NotyWhats",
      demo: "",
      year: "2026",
      color: "rgba(37, 211, 102, 0.12)",
      glow: "rgba(37, 211, 102, 0.25)",
    },
    {
      id: "06",
      title: t("project.6.title"),
      description: t("project.6.desc"),
      tags: ["Python", "Django", "QR", "Dashboards"],
      link: "https://github.com/AlejandroBast/Eventix",
      demo: "",
      year: "2026",
      color: "rgba(255, 180, 50, 0.12)",
      glow: "rgba(255, 180, 50, 0.25)",
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
            <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              <BlurText key={`projects-${lang}`} text={t("projects.title")} />
            </h2>
            <a
              href="https://github.com/AlejandroBast"
              target="_blank"
              rel="noopener noreferrer"
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
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 20px;
          text-decoration: none;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, transform 0.3s ease;
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
