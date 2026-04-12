import { HeroOrbits } from "@/components/hero-orbits"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <HeroOrbits />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            Software Engineer
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Diseño y desarrollo
            <br />
            experiencias web
            <br />
            con impacto
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg">
            Creo interfaces modernas, elegantes e interactivas con enfoque en
            diseño, rendimiento y experiencia de usuario.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Ver proyectos
            </a>

            <a
              href="#contacto"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-105"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}