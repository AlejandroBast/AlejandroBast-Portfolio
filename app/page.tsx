import { HeroSection } from "@/components/hero-section"
import { AboutMe } from "@/components/sections/aboutme"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
