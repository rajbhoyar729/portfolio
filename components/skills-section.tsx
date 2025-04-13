"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "C++"],
  },
  {
    title: "Web Frameworks",
    skills: ["React.js", "Next.js", "Node.js", "HTML", "CSS"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Google Cloud Platform (GCP)", "Docker", "Kubernetes", "CI/CD Pipelines"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    title: "Tools & Practices",
    skills: [
      "Agile Methodologies",
      "Test-Driven Development (TDD)",
      "Microservices Architecture",
      "Distributed Systems",
      "Scalability",
      "Fault Tolerance",
    ],
  },
  {
    title: "Soft Skills",
    skills: ["Cross-Disciplinary Collaboration", "Problem-Solving", "Verbal and Written Communication"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-background/80 scroll-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Technical Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-emerald-500 to-orange-500"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
