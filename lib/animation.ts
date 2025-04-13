"use client"

import type React from "react"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const useScrollAnimation = (sectionRef: React.RefObject<HTMLElement>, threshold = 0.2) => {
  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("visible")
          }
        })
      },
      { threshold },
    )

    observer.observe(section)

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [sectionRef, threshold])
}

export const useHeroAnimation = (elementRef: React.RefObject<HTMLElement>, delay = 0) => {
  useEffect(() => {
    if (!elementRef.current) return

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
      },
    )
  }, [elementRef, delay])
}

export const useParallaxEffect = (elementRef: React.RefObject<HTMLElement>, speed = 0.5) => {
  useEffect(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      y: `${speed * 100}px`,
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [elementRef, speed])
}
