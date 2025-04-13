"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"
import { useHeroAnimation } from "@/lib/animation"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useHeroAnimation(titleRef, 0)
  useHeroAnimation(subtitleRef, 0.3)
  useHeroAnimation(ctaRef, 0.6)
  useHeroAnimation(socialsRef, 0.9)

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-10">
      <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 to-transparent opacity-30"></div>
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Hi, I'm <span className="gradient-text">Raj Bhoyar</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-foreground/80 max-w-3xl mb-10">
          Software Development Engineer with expertise in designing, developing, and optimizing scalable software
          solutions in distributed computing environments.
        </p>
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            onClick={() => {
              const contactSection = document.querySelector("#contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get In Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-500 text-indigo-500 hover:bg-indigo-500/10"
            onClick={() => {
              const projectsSection = document.querySelector("#projects")
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            View Projects
          </Button>
        </div>
        <div ref={socialsRef} className="flex gap-4 justify-center mb-16">
          <a
            href="https://github.com/rajbhoyar729"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-background/50 border border-foreground/10 hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <GitHub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/raj-bhoyar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-background/50 border border-foreground/10 hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:rbhoyar729@gmail.com"
            className="p-2 rounded-full bg-background/50 border border-foreground/10 hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
        <div className="animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleScrollToAbout}
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </Button>
        </div>
      </div>
    </section>
  )
}
