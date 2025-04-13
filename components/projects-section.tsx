"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const projects = [
  {
    title: "RespireX – AI Health Platform",
    description:
      "Engineered a scalable web application using TensorFlow and MongoDB, leveraging distributed systems to reduce diagnostic time by 50% and improve accuracy by 20%. Designed fault-tolerant architecture to ensure reliability under high user loads.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["TensorFlow", "MongoDB", "Python", "React"],
    github: "https://github.com/rajbhoyar729/respirex",
    demo: "https://respirex.rajbhoyar.com",
  },
  {
    title: "Distributed Anomaly Detection Engine",
    description:
      "Developed a GCP-based system using Python and C++ to analyze 100K+ data points in real-time, achieving 20% faster anomaly detection. Optimized for cost-efficiency and scalability, integrating with distributed storage and query systems.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Python", "C++", "GCP", "Machine Learning"],
    github: "https://github.com/rajbhoyar729/anomaly-detection",
    demo: "https://anomaly.rajbhoyar.com",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background/80 to-background scroll-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden animated-border">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </Button>
                  <Button size="sm" className="flex items-center gap-2" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
