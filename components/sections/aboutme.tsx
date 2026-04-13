"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function AboutMe() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const skillGroups = [
    {
      category: t("skill.languages"),
      color: "rgba(5,199,233,0.35)",
      items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "HTML", "CSS"],
    },
    {
      category: t("skill.frameworks"),
      color: "rgba(120,115,245,0.35)",
      items: ["React", "Next.js", "Vue", "Angular", "Django", "Spring", "Bootstrap", "Node.js"],
    },
    {
      category: t("skill.databases"),
      color: "rgba(255,110,196,0.35)",
      items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "SQL"],
    },
    {
      category: t("skill.backend"),
      color: "rgba(255,180,50,0.35)",
      items: ["Java", "Python", "Node.js", "Spring", "C++", "Docker", "Nginx", "AWS"],
    },
    {
      category: t("skill.tools"),
      color: "rgba(100,220,120,0.35)",
      items: ["Figma", "Git", "GitLab", "Unreal Engine 5", "Blueprints", "Hardware"],
    },
  ]

  const education = [
    {
      degree: t("edu.software"),
      year: t("edu.year"),
      icon: "graduation",
    },
    {
      degree: t("edu.commercial"),
      year: t("edu.year"),
      icon: "briefcase",
    },
  ]

  const interests = [
    { label: t("interest.music"), icon: "music" },
    { label: t("interest.outdoor"), icon: "leaf" },
    { label: t("interest.games"), icon: "gamepad" },
    { label: t("interest.hardware"), icon: "cpu" },
  ]

  const stats = [
    { value: "3" + (lang === "es" ? "er" : "rd"), label: t("about.year") },
    { value: "Full", label: t("about.fullstack") },
    { value: "10+", label: t("about.tech") },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const getIcon = (name: string) => {
    switch (name) {
      case "graduation":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        )
      case "briefcase":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        )
      case "music":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
        )
      case "leaf":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
          </svg>
        )
      case "gamepad":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82 47.646 47.646 0 00-4.163.3.64.64 0 01-.657-.643v0z" />
          </svg>
        )
      case "cpu":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3M21 8.25h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3M21 15.75h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center py-20 px-4 sm:py-32 sm:px-6"
    >
      {/* Transparent background overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
          backdropFilter: "blur(1px)",
        }}
      />
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
          className="mb-10 sm:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40 sm:mb-3 sm:tracking-[0.35em]">{t("about.section")}</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">{t("about.title")}</h2>
        </div>

        {/* Top: photo + bio */}
        <div className="mb-16 grid grid-cols-1 gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-[280px_1fr]">

          {/* Photo – TODO: reemplaza el placeholder con tu foto real */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
          >
            <div className="photo-frame mx-auto lg:mx-0">
              <div className="photo-inner">
                {/*
                  ✅ PARA AGREGAR TU FOTO:
                  1. Copia tu foto a /public/foto-perfil.webp (recomendado) o .jpg
                  2. Agrega al inicio del archivo: import Image from "next/image"
                  3. Reemplaza el <div className="photo-placeholder"> con:
                  <Image
                    src="/foto-perfil.webp"
                    alt="Alejandro Bast"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 220px, 280px"
                    priority
                  />
                */}
                <div className="photo-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" className="text-white/20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="mt-3 text-xs text-cyan-400/50 text-center leading-5 font-mono px-4">
                    {lang === "es" ? "→ /public/foto-perfil.webp" : "→ /public/profile-photo.webp"}
                    <br/><span className="text-white/20 text-[10px]">{lang === "es" ? "ver comentario en código" : "see code comment"}</span>
                  </p>
                </div>
              </div>
              <div className="photo-glow" />
            </div>

            {/* Stats below photo */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.6s ease ${0.5 + i * 0.1}s`,
                  }}
                >
                  <p className="text-xl font-bold text-white sm:text-2xl">{s.value}</p>
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
            <p className="mb-4 text-base leading-7 text-white/70 sm:mb-5 sm:text-lg sm:leading-8">
              {lang === "es" ? (
                <>Soy <span className="text-white font-semibold">Alejandro Bast</span>, desarrollador web <span className="text-white/90">Full Stack Junior</span> con pasión por construir productos digitales modernos, funcionales y bien diseñados.</>
              ) : (
                <>I am <span className="text-white font-semibold">Alejandro Bast</span>, a <span className="text-white/90">Full Stack Junior</span> web developer with a passion for building modern, functional, and well-designed digital products.</>
              )}
            </p>
            <p className="mb-4 text-base leading-7 text-white/70 sm:mb-5 sm:text-lg sm:leading-8">
              {lang === "es" ? (
                <>Actualmente curso el tercer año de <span className="text-white/90">Ingeniería de Software</span> e Ingeniería en Software Comercial. Trabajo con un stack amplio que abarca desde frontend y backend hasta bases de datos, DevOps y diseño UI.</>
              ) : (
                <>I am currently in my third year of <span className="text-white/90">Software Engineering</span> and Commercial Software Engineering. I work with a broad stack spanning frontend and backend to databases, DevOps, and UI design.</>
              )}
            </p>
            <p className="mb-6 text-base leading-7 text-white/70 sm:mb-8 sm:text-lg sm:leading-8">
              {lang === "es" ? (
                <>Más allá del código, me interesa el desarrollo de videojuegos con Unreal Engine 5, la manipulación de hardware y mantenerme en constante aprendizaje de nuevas tecnologías.</>
              ) : (
                <>Beyond code, I am interested in game development with Unreal Engine 5, hardware manipulation, and constantly learning new technologies.</>
              )}
            </p>

            {/* Education */}
            <div className="mb-6 sm:mb-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35 sm:mb-4 sm:tracking-[0.3em]">{t("about.education")}</p>
              <div className="space-y-2 sm:space-y-3">
                {education.map((e) => (
                  <div key={e.degree} className="edu-card">
                    {getIcon(e.icon)}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate">{e.degree}</p>
                      <p className="text-xs text-white/40">{e.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35 sm:mb-4 sm:tracking-[0.3em]">{t("about.interests")}</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span key={item.label} className="interest-pill">
                    {getIcon(item.icon)} {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* CV button */}
            <div className="mt-8 sm:mt-10">
              {/* TODO: Reemplaza "/cv-alejandro-bast.pdf" con la ruta real de tu CV (colócalo en /public/) */}
              <a
                href="/cv-alejandro-bast.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-105 sm:px-6 sm:py-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t("about.download")}
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
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40 sm:mb-6 sm:tracking-[0.35em]">{t("about.stack")}</p>

          {/* Tab buttons */}
          <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
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
          max-width: 220px;
        }
        @media (min-width: 640px) {
          .photo-frame {
            max-width: 280px;
          }
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
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          text-align: center;
        }
        @media (min-width: 640px) {
          .stat-card {
            padding: 12px 14px;
            text-align: left;
          }
        }
        .edu-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
        }
        @media (min-width: 640px) {
          .edu-card {
            gap: 12px;
            padding: 12px 16px;
          }
        }
        .interest-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.65);
        }
        @media (min-width: 640px) {
          .interest-pill {
            padding: 6px 14px;
            font-size: 0.8rem;
          }
        }
        .tab-btn {
          padding: 6px 12px;
          border-radius: 9999px;
          border: 1px solid;
          font-size: 0.7rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        @media (min-width: 640px) {
          .tab-btn {
            padding: 7px 16px;
            font-size: 0.78rem;
          }
        }
        .tab-btn:hover {
          color: rgba(255,255,255,0.85) !important;
        }
        .skill-pill {
          padding: 6px 12px;
          border-radius: 9999px;
          border: 1px solid;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.02em;
          transition: transform 0.2s ease, opacity 0.2s ease;
          cursor: default;
        }
        @media (min-width: 640px) {
          .skill-pill {
            padding: 7px 16px;
            font-size: 0.82rem;
          }
        }
        .skill-pill:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
