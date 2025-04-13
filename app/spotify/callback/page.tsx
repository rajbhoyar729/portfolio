"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SpotifyCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // The callback is handled by the API route, which sets cookies and redirects
    // This page is just a fallback in case the redirect doesn't happen
    router.push("/spotify")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  )
}
