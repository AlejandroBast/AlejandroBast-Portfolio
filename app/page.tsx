import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <>
      <HeroSection />



      <section
        id="sobre-mi"
        className="relative z-20 flex min-h-screen items-center justify-center"
      >
        <h2 className="text-5xl font-bold text-white">Sobre mí</h2>
      </section>

      <section
        id="proyectos"
        className="relative z-20 flex min-h-screen items-center justify-center"
      >
        <h2 className="text-5xl font-bold text-white">Proyectos</h2>
      </section>

      <section
        id="contacto"
        className="relative z-20 flex min-h-screen items-center justify-center"
      >
        <h2 className="text-5xl font-bold text-white">Contacto</h2>
      </section>
    </>
  )
}