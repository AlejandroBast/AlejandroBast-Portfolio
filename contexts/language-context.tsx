"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    "hero.subtitle": "Alejandro Bast",
    "hero.title1": "SOFTWARE",
    "hero.title2": "ENGINEER",
    "hero.title3": "& DEVELOPER",
    "hero.description": "Creo interfaces modernas, elegantes e interactivas con enfoque en diseño, rendimiento y experiencia de usuario.",
    "hero.projects": "Ver proyectos",
    "hero.contact": "Contacto",
    "hero.scroll": "Scroll Down",

    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    "about.section": "01 — Sobre mí",
    "about.title": "Quién soy",
    "about.bio1": "Soy <strong>Alejandro Bast</strong>, desarrollador web <span>Full Stack Junior</span> con pasión por construir productos digitales modernos, funcionales y bien diseñados.",
    "about.bio2": "Actualmente curso el tercer año de <span>Ingeniería de Software</span> e Ingeniería en Software Comercial. Trabajo con un stack amplio que abarca desde frontend y backend hasta bases de datos, DevOps y diseño UI.",
    "about.bio3": "Más allá del código, me interesa el desarrollo de videojuegos con Unreal Engine 5, la manipulación de hardware y mantenerme en constante aprendizaje de nuevas tecnologías.",
    "about.education": "Educación",
    "about.interests": "Intereses",
    "about.download": "Descargar CV",
    "about.stack": "Stack tecnológico",
    "about.year": "año de carrera",
    "about.fullstack": "Stack Junior Dev",
    "about.tech": "tecnologías",

    "skill.languages": "Lenguajes",
    "skill.frameworks": "Frameworks & Librerías",
    "skill.databases": "Bases de Datos",
    "skill.backend": "Backend & DevOps",
    "skill.tools": "Herramientas",

    "edu.software": "Ingeniería de Software",
    "edu.commercial": "Ingeniería en Software Comercial",
    "edu.year": "3rd año en curso",

    "interest.music": "Música",
    "interest.outdoor": "Aire libre",
    "interest.games": "Desarrollo de videojuegos",
    "interest.hardware": "Hardware & Componentes",

    "projects.section": "02 — Proyectos",
    "projects.title": "Mi trabajo",
    "projects.viewAll": "Ver todos →",
    "projects.view": "Ver proyecto",
    "projects.code": "Código",
    "projects.demo": "Demo en vivo",

    "project.1.title": "Inmobiliary Data",
    "project.1.desc": "API y plataforma para recolectar, organizar y consultar publicaciones inmobiliarias —precio, ubicación, características e imágenes— como apoyo a procesos de análisis y avalúos.",
    "project.2.title": "BarrioLife",
    "project.2.desc": "Juego indie narrativo: la historia de Elián, un joven que tras años de lucha y pérdidas busca salir adelante a través de lo que más ama, la música.",
    "project.3.title": "SpotiFee · Reproductor de Música",
    "project.3.desc": "Reproductor de música con la API de Audius para buscar y reproducir canciones en streaming, con búsqueda y controles de reproducción.",

    "contact.section": "03 — Contacto",
    "contact.title": "Hablemos",
    "contact.intro1": "¿Tienes un proyecto en mente, una propuesta de trabajo o simplemente quieres ponerte en contacto?",
    "contact.intro2": "Estoy disponible para roles freelance y posiciones full-time. No dudes en escribirme.",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.placeholder.name": "Tu nombre",
    "contact.placeholder.email": "tu@email.com",
    "contact.placeholder.message": "Cuéntame sobre tu proyecto...",
    "contact.send": "Enviar mensaje",
    "contact.sending": "Enviando...",
    "contact.sent.title": "¡Mensaje enviado!",
    "contact.sent.desc": "Me pondré en contacto contigo pronto.",
    "contact.sendAnother": "Enviar otro mensaje",
    "contact.error": "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",

    "footer.nav": "Navegación",
    "footer.contact": "Contacto",
    "footer.social": "Redes",
    "footer.desc": "Construyendo productos digitales modernos con pasión por el código limpio, el diseño cuidado y la experiencia de usuario.",
    "footer.rights": "Todos los derechos reservados.",
    "footer.madeWith": "Diseñado y desarrollado con",
    "footer.using": "usando Next.js & Tailwind CSS",
  },
  en: {

    "hero.subtitle": "Alejandro Bast",
    "hero.title1": "SOFTWARE",
    "hero.title2": "ENGINEER",
    "hero.title3": "& DEVELOPER",
    "hero.description": "I create modern, elegant, and interactive interfaces focused on design, performance, and user experience.",
    "hero.projects": "View projects",
    "hero.contact": "Contact",
    "hero.scroll": "Scroll Down",

  
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "about.section": "01 — About me",
    "about.title": "Who I am",
    "about.bio1": "I am <strong>Alejandro Bast</strong>, a <span>Full Stack Junior</span> web developer with a passion for building modern, functional, and well-designed digital products.",
    "about.bio2": "I am currently in my third year of <span>Software Engineering</span> and Commercial Software Engineering. I work with a broad stack spanning frontend and backend to databases, DevOps, and UI design.",
    "about.bio3": "Beyond code, I am interested in game development with Unreal Engine 5, hardware manipulation, and constantly learning new technologies.",
    "about.education": "Education",
    "about.interests": "Interests",
    "about.download": "Download CV",
    "about.stack": "Tech Stack",
    "about.year": "year of career",
    "about.fullstack": "Stack Junior Dev",
    "about.tech": "technologies",

    "skill.languages": "Languages",
    "skill.frameworks": "Frameworks & Libraries",
    "skill.databases": "Databases",
    "skill.backend": "Backend & DevOps",
    "skill.tools": "Tools",

    "edu.software": "Software Engineering",
    "edu.commercial": "Commercial Software Engineering",
    "edu.year": "3rd year in progress",

    "interest.music": "Music",
    "interest.outdoor": "Outdoors",
    "interest.games": "Game Development",
    "interest.hardware": "Hardware & Components",

    "projects.section": "02 — Projects",
    "projects.title": "My work",
    "projects.viewAll": "View all →",
    "projects.view": "View project",
    "projects.code": "Code",
    "projects.demo": "Live demo",

    "project.1.title": "Inmobiliary Data",
    "project.1.desc": "API and platform to collect, organize, and query real-estate listings —price, location, features, and images— to support analysis and appraisal workflows.",
    "project.2.title": "BarrioLife",
    "project.2.desc": "Narrative indie game following Elián, a young man who, after years of struggle and loss, moves forward through the thing he loves most: music.",
    "project.3.title": "SpotiFee · Music Player",
    "project.3.desc": "Music player integrating the Audius API to search and stream songs, with live search and playback controls.",

    "contact.section": "03 — Contact",
    "contact.title": "Let's talk",
    "contact.intro1": "Do you have a project in mind, a job proposal, or simply want to get in touch?",
    "contact.intro2": "I am available for freelance roles and full-time positions. Feel free to reach out.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.placeholder.name": "Your name",
    "contact.placeholder.email": "you@email.com",
    "contact.placeholder.message": "Tell me about your project...",
    "contact.send": "Send message",
    "contact.sending": "Sending...",
    "contact.sent.title": "Message sent!",
    "contact.sent.desc": "I will get back to you soon.",
    "contact.sendAnother": "Send another message",
    "contact.error": "There was an error sending the message. Please try again.",

    "footer.nav": "Navigation",
    "footer.contact": "Contact",
    "footer.social": "Social",
    "footer.desc": "Building modern digital products with passion for clean code, thoughtful design, and user experience.",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Designed and developed with",
    "footer.using": "using Next.js & Tailwind CSS",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null
    if (saved && (saved === "es" || saved === "en")) {
      setLang(saved)
    }
  }, [])

  const toggleLang = () => {
    const newLang = lang === "es" ? "en" : "es"
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
