"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isSpotifyPage = pathname === "/spotify"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (href: string) => {
    setIsOpen(false)
    if (isSpotifyPage) {
      window.location.href = `/${href}`
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold gradient-text"
          onClick={(e) => {
            if (!isSpotifyPage) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          }}
        >
          Raj Bhoyar
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {!isSpotifyPage &&
            navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                onClick={() => handleScrollToSection(link.href)}
              >
                {link.name}
              </Button>
            ))}

          <Link href="/spotify" passHref>
            <Button
              variant="ghost"
              className={`hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors ${
                isSpotifyPage ? "bg-indigo-500/10 text-indigo-400" : ""
              }`}
            >
              <Music className="mr-2 h-4 w-4" />
              Spotify
            </Button>
          </Link>

          {isSpotifyPage && (
            <Link href="/" passHref>
              <Button variant="ghost" className="hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors">
                Back to Portfolio
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg py-4 border-t border-indigo-900/20">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {!isSpotifyPage &&
              navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="justify-start hover:bg-indigo-500/10 hover:text-indigo-400"
                  onClick={() => handleScrollToSection(link.href)}
                >
                  {link.name}
                </Button>
              ))}

            <Link href="/spotify" passHref>
              <Button
                variant="ghost"
                className={`justify-start hover:bg-indigo-500/10 hover:text-indigo-400 ${
                  isSpotifyPage ? "bg-indigo-500/10 text-indigo-400" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Music className="mr-2 h-4 w-4" />
                Spotify
              </Button>
            </Link>

            {isSpotifyPage && (
              <Link href="/" passHref>
                <Button
                  variant="ghost"
                  className="justify-start hover:bg-indigo-500/10 hover:text-indigo-400"
                  onClick={() => setIsOpen(false)}
                >
                  Back to Portfolio
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
