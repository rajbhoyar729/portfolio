"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section id="education" ref={sectionRef} className="py-20 scroll-section">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Education</h2>

        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-orange-500"></div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center">
                  <GraduationCap size={24} className="mr-3 text-emerald-500" />
                  <div>
                    <h3 className="text-xl font-semibold">B.Tech in Computer Engineering</h3>
                    <p className="text-lg text-foreground/80">Bapurao Deshmukh College of Engineering, Wardha</p>
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <Calendar size={16} className="mr-2 text-emerald-400" />
                  <span className="text-foreground/70">May 2024</span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {["Data Structures", "Algorithms", "Distributed Systems", "Cloud Computing", "Machine Learning"].map(
                    (course, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                        {course}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
