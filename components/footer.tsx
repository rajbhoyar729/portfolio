import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-primary-900/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold gradient-text">
              Raj Bhoyar
            </Link>
            <p className="text-foreground/60 mt-2">Software Development Engineer</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/rajbhoyar729"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/raj-bhoyar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:rbhoyar729@gmail.com"
              className="p-2 rounded-full hover:bg-indigo-500/20 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-foreground/60 text-sm">
          <p>© {currentYear} Raj Bhoyar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
