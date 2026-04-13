"use client"

import { useLanguage } from "@/contexts/language-context"

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/AlejandroBast",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alejandro-bast",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:nicohlas.personal@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  const navLinks = [
    { label: t("nav.home"), href: "#inicio" },
    { label: t("nav.about"), href: "#sobre-mi" },
    { label: t("nav.projects"), href: "#proyectos" },
    { label: t("nav.contact"), href: "#contacto" },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""))
    if (!el) return
    const start = window.scrollY
    const end = el.getBoundingClientRect().top + window.scrollY
    const duration = 900
    let startTime: number | null = null
    const ease = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    const step = (now: number) => {
      if (!startTime) startTime = now
      const p = Math.min((now - startTime) / duration, 1)
      window.scrollTo(0, start + (end - start) * ease(p))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <footer className="relative z-20 border-t border-white/[0.06] bg-black/60 backdrop-blur-sm">
      {/* Top glow line */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{ background: "linear-gradient(90deg, transparent, rgba(5,199,233,0.4), transparent)" }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Main row */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <p className="mb-1 text-lg font-bold text-white tracking-tight sm:text-xl">Alejandro Bast</p>
            <p className="mb-3 text-xs text-white/40 sm:mb-5 sm:text-sm">Full Stack Junior Developer</p>
            <p className="text-xs leading-5 text-white/35 sm:text-sm sm:leading-6 max-w-xs">
              {t("footer.desc")}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/30 sm:mb-5 sm:tracking-[0.3em]">{t("footer.nav")}</p>
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs text-white/45 transition-colors duration-200 hover:text-white/90 text-left sm:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/30 sm:mb-5 sm:tracking-[0.3em]">{t("footer.contact")}</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="mailto:nicohlas.personal@gmail.com" className="text-xs text-white/45 hover:text-white/90 transition-colors break-all sm:text-sm">
                  nicohlas.personal@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/AlejandroBast" target="_blank" rel="noopener noreferrer" className="text-xs text-white/45 hover:text-white/90 transition-colors sm:text-sm">
                  github.com/AlejandroBast
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/alejandro-bast" target="_blank" rel="noopener noreferrer" className="text-xs text-white/45 hover:text-white/90 transition-colors sm:text-sm">
                  linkedin.com/in/alejandro-bast
                </a>
              </li>
            </ul>
          </div>

          {/* Social icons */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/30 sm:mb-5 sm:tracking-[0.3em]">{t("footer.social")}</p>
            <div className="flex gap-2 sm:gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-icon-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/[0.06] pt-6 flex flex-col gap-2 sm:mt-14 sm:pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="text-xs text-white/20">
            © {year} Alejandro Bast — {t("footer.rights")}
          </p>
          <p className="text-xs text-white/18">
            {t("footer.madeWith")}{" "}
            <span className="text-white/35">{"<3"}</span>{" "}
            {t("footer.using")}
          </p>
        </div>
      </div>

      <style jsx>{`
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, color 0.25s, transform 0.2s;
        }
        @media (min-width: 640px) {
          .social-icon-btn {
            width: 40px;
            height: 40px;
          }
        }
        .social-icon-btn:hover {
          border-color: rgba(5,199,233,0.35);
          background: rgba(5,199,233,0.08);
          color: rgba(255,255,255,0.9);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  )
}
