"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Full Stack Developer (Freelance)",
    company: "Startup Khata",
    location: "Remote",
    period: "Jul 2022 – Present",
    responsibilities: [
      "Designed and developed Python-based RESTful APIs in a distributed computing environment, processing 50K+ daily transactions for 10K+ users, achieving 99.8% system uptime.",
      "Optimized PostgreSQL queries and implemented Node.js monitoring scripts, reducing response times by 40% and enhancing scalability.",
      "Collaborated with cross-functional teams to deliver innovative features using Agile practices, ensuring fault-tolerant and low-cost solutions.",
      "Managed ambiguous requirements, coded scalable solutions, and delivered high-quality software under tight deadlines with minimal supervision.",
    ],
  },
  {
    title: "Software Development Intern",
    company: "BlueKei Solutions",
    location: "Pune (Hybrid)",
    period: "Feb 2024 – May 2024",
    responsibilities: [
      "Built and deployed Python microservices on GCP, handling 10K+ concurrent requests with 60% reduced latency in a distributed system.",
      "Automated data pipelines using Pandas for 1K+ datasets/month, integrating CI/CD pipelines and testing frameworks to cut bugs by 15%.",
      "Designed fault-tolerant solutions for scalable applications, aligning with Agile development cycles to meet business needs.",
    ],
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section id="experience" ref={sectionRef} className="py-20 scroll-section">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Professional Experience</h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-lg text-foreground/80">{exp.company}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <Calendar size={16} className="mr-2 text-indigo-400" />
                    <span className="text-foreground/70">{exp.period}</span>
                  </div>
                </div>
                <p className="text-foreground/70 mb-4 flex items-center">
                  <Briefcase size={16} className="mr-2" />
                  {exp.location}
                </p>
                <ul className="space-y-2 list-disc list-inside text-foreground/80">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
