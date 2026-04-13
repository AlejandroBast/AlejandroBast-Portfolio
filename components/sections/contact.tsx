"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const socials = [
  {
    name: "GitHub",
    handle: "@AlejandroBast",
    href: "https://github.com/AlejandroBast",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Alejandro Bast",
    href: "https://www.linkedin.com/in/alejandro-bast",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "nicohlas.personal@gmail.com",
    href: "mailto:nicohlas.personal@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

type FormState = { name: string; email: string; message: string }
type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const response = await fetch("https://formsubmit.co/ajax/nicohlas.personal@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New message from ${form.name} - Portfolio Contact`,
        })
      })

      const data = await response.json()
      
      if (data.success === "true" || data.success === true) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
        setErrorMsg(t("contact.error"))
      }
    } catch {
      setStatus("error")
      setErrorMsg(t("contact.error"))
    }
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center py-20 px-4 sm:py-32 sm:px-6 overflow-hidden"
    >
      {/* Transparent background overlay for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-20 sm:w-96 sm:h-96"
          style={{
            background: "radial-gradient(circle, rgba(5,199,233,0.15) 0%, transparent 70%)",
            top: "10%",
            left: "-5%",
            animation: "float1 8s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-48 h-48 rounded-full opacity-15 sm:w-72 sm:h-72"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
            bottom: "15%",
            right: "-3%",
            animation: "float2 10s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-32 h-32 rounded-full opacity-10 sm:w-48 sm:h-48"
          style={{
            background: "radial-gradient(circle, rgba(5,199,233,0.2) 0%, transparent 70%)",
            top: "50%",
            right: "20%",
            animation: "float3 6s ease-in-out infinite",
          }}
        />

        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Animated line decorations */}
        <svg className="absolute top-20 left-10 w-32 h-32 opacity-10 sm:w-48 sm:h-48" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="40" 
            fill="none" 
            stroke="rgba(5,199,233,0.5)" 
            strokeWidth="0.5"
            strokeDasharray="4 4"
            style={{ animation: "rotate 30s linear infinite" }}
          />
          <circle 
            cx="50" cy="50" r="30" 
            fill="none" 
            stroke="rgba(56,189,248,0.3)" 
            strokeWidth="0.5"
            strokeDasharray="2 6"
            style={{ animation: "rotateReverse 25s linear infinite" }}
          />
        </svg>

        <svg className="absolute bottom-32 right-16 w-24 h-24 opacity-10 sm:w-40 sm:h-40" viewBox="0 0 100 100">
          <rect 
            x="20" y="20" width="60" height="60" 
            fill="none" 
            stroke="rgba(5,199,233,0.4)" 
            strokeWidth="0.5"
            style={{ animation: "rotateSlow 40s linear infinite", transformOrigin: "center" }}
          />
          <rect 
            x="30" y="30" width="40" height="40" 
            fill="none" 
            stroke="rgba(56,189,248,0.3)" 
            strokeWidth="0.5"
            style={{ animation: "rotateReverse 35s linear infinite", transformOrigin: "center" }}
          />
        </svg>

        {/* Sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animation: `sparkle ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full sm:h-96 sm:w-96"
        style={{ background: "radial-gradient(circle, rgba(5,199,233,0.07) 0%, transparent 70%)" }}
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
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40 sm:mb-3 sm:tracking-[0.35em]">{t("contact.section")}</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">{t("contact.title")}</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            <p className="mb-3 text-base leading-7 text-white/65 sm:mb-4 sm:text-lg sm:leading-8">
              {t("contact.intro1")}
            </p>
            <p className="mb-8 text-base leading-7 text-white/65 sm:mb-12 sm:text-lg sm:leading-8">
              {t("contact.intro2")}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {socials.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease ${0.4 + i * 0.1}s, transform 0.6s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <span className="text-white/50 transition-colors group-hover:text-cyan-400">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs text-white/40 truncate">{s.handle}</p>
                  </div>
                  <svg className="ml-auto text-white/25 flex-shrink-0 transition-all group-hover:text-cyan-400 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
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
            {status === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-8 text-center sm:p-10 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 sm:h-14 sm:w-14 animate-pulse-subtle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-white sm:text-xl">{t("contact.sent.title")}</p>
                <p className="text-sm text-white/50">{t("contact.sent.desc")}</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative">
                {/* Form glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="input-group">
                    <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/35 sm:mb-2">{t("contact.name")}</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder={t("contact.placeholder.name")} className="contact-input" />
                  </div>
                  <div className="input-group">
                    <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/35 sm:mb-2">{t("contact.email")}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("contact.placeholder.email")} className="contact-input" />
                  </div>
                </div>
                <div className="input-group">
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/35 sm:mb-2">{t("contact.message")}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t("contact.placeholder.message")} className="contact-input resize-none sm:rows-6" />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" disabled={status === "sending"} className="submit-btn group">
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {t("contact.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t("contact.send")}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(1.08); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        @media (min-width: 640px) {
          .social-link {
            gap: 14px;
            padding: 14px 18px;
          }
        }
        .social-link:hover {
          background: rgba(5,199,233,0.05);
          border-color: rgba(5,199,233,0.2);
          transform: translateX(4px);
          box-shadow: 0 0 20px rgba(5,199,233,0.1);
        }
        .input-group {
          position: relative;
        }
        .contact-input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 10px 14px;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          font-family: inherit;
        }
        @media (min-width: 640px) {
          .contact-input {
            padding: 12px 16px;
          }
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .contact-input:focus {
          border-color: rgba(5,199,233,0.5);
          background: rgba(5,199,233,0.05);
          box-shadow: 0 0 0 3px rgba(5,199,233,0.1), 0 0 20px rgba(5,199,233,0.1);
        }
        .submit-btn {
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(135deg, #05C7E9 0%, #38bdf8 100%);
          color: black;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 12px;
          border: none;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before {
          left: 100%;
        }
        @media (min-width: 640px) {
          .submit-btn {
            padding: 14px;
          }
        }
        .submit-btn:hover:not(:disabled) { 
          opacity: 0.95; 
          transform: scale(1.01); 
          box-shadow: 0 0 30px rgba(5,199,233,0.3);
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </section>
  )
}
