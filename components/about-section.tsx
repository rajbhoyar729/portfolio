"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Globe, Users } from "lucide-react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="py-20 scroll-section">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">About Me</h2>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-foreground/80 mb-6">
            Software Development Engineer with a B.Tech in Computer Engineering and expertise in designing, developing,
            and optimizing scalable software solutions in distributed computing environments. Proficient in Python,
            Java, JavaScript, and cloud technologies (AWS, GCP), with a proven track record of delivering innovative
            products using Agile methodologies.
          </p>
          <p className="text-lg text-foreground/80">
            Skilled in solving complex problems with fault-tolerant, low-cost systems, achieving 99.8% uptime and 40%
            faster response times in production environments. Adept at collaborating with cross-disciplinary teams,
            managing ambiguity, and driving high-quality software delivery in fast-paced settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animated-border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <Code size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Software Development</h3>
              <p className="text-foreground/70">
                Building scalable and efficient software solutions with modern technologies
              </p>
            </CardContent>
          </Card>

          <Card className="animated-border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Globe size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud & DevOps</h3>
              <p className="text-foreground/70">Expertise in AWS, GCP, Docker, and Kubernetes for robust deployments</p>
            </CardContent>
          </Card>

          <Card className="animated-border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <Cpu size={32} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distributed Systems</h3>
              <p className="text-foreground/70">
                Designing fault-tolerant and scalable distributed computing solutions
              </p>
            </CardContent>
          </Card>

          <Card className="animated-border">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <Users size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-foreground/70">
                Working effectively with cross-disciplinary teams in Agile environments
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
