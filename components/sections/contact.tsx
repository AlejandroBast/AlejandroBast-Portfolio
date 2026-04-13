"use client"

import { useEffect, useRef, useState } from "react"

const socials = [
  {
    name: "GitHub",
    handle: "@AlejandroBast",
    href: "https://github.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Alejandro Bast",
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "alejandro@email.com",
    href: "mailto:alejandro@email.com",
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
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("sent")
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center py-32 px-6"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(5,199,233,0.07) 0%, transparent 70%)" }}
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
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">03 — Contacto</p>
          <h2 className="text-5xl font-bold text-white md:text-6xl">Hablemos</h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* left: copy + socials */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            <p className="mb-4 text-lg leading-8 text-white/65">
              ¿Tienes un proyecto en mente, una propuesta de trabajo o simplemente quieres
              ponerte en contacto?
            </p>
            <p className="mb-12 text-lg leading-8 text-white/65">
              Estoy disponible para roles freelance y posiciones full-time.
              No dudes en escribirme.
            </p>

            <div className="space-y-4">
              {socials.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease ${0.4 + i * 0.1}s, transform 0.6s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <span className="text-white/50">{s.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs text-white/40">{s.handle}</p>
                  </div>
                  <svg
                    className="ml-auto text-white/25"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* right: form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            {status === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white">¡Mensaje enviado!</p>
                <p className="text-sm text-white/50">Me pondré en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-white/35">Nombre</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-white/35">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-white/35">Mensaje</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="contact-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="submit-btn"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* footer line */}
        <div
          className="mt-32 flex flex-col items-center gap-2 text-center text-xs text-white/20"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          <div className="mb-4 h-px w-24 bg-white/10" />
          <p>© 2024 Alejandro Bast — Diseñado y desarrollado con pasión.</p>
        </div>
      </div>

      <style jsx>{`
        .social-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .social-link:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.14);
          transform: translateX(4px);
        }
        .contact-input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 12px 16px;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          font-family: inherit;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .contact-input:focus {
          border-color: rgba(5,199,233,0.4);
          background: rgba(5,199,233,0.04);
        }
        .submit-btn {
          width: 100%;
          border-radius: 10px;
          background: white;
          color: black;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 14px;
          border: none;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.25s;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: scale(1.01);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  )
}
