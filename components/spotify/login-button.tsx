"use client"

import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"

export default function SpotifyLoginButton() {
  const handleLogin = () => {
    window.location.href = "/api/spotify/auth"
  }

  return (
    <Button onClick={handleLogin} className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
      <Music className="mr-2 h-4 w-4" />
      Connect with Spotify
    </Button>
  )
}
