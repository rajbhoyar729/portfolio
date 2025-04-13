"use client"

import { useRef } from "react"
import { useScrollAnimation } from "@/lib/animation"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Code, Trophy } from "lucide-react"

const achievements = [
  {
    title: "HackBDCE 2K22 Winner",
    description: "Led an AI project to achieve 90% accuracy, outperforming 20+ teams.",
    icon: Trophy,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    title: "Open Source Contributor",
    description: "Merged 10+ pull requests, impacting 10K+ users.",
    icon: Code,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  {
    title: "LeetCode Ranking",
    description: "Top 10% globally, demonstrating strong problem-solving skills.",
    icon: Award,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
]

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-background/90 scroll-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${achievement.bgColor} flex items-center justify-center mb-4`}>
                  <achievement.icon size={32} className={achievement.color} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-foreground/70">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
