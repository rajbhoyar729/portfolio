"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getTopTracks, playTrack, type SpotifyTrack, formatDuration } from "@/lib/spotify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"

export default function TopTracks() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        const data = await getTopTracks()
        setTracks(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch top tracks")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  const handlePlay = async (uri: string) => {
    try {
      await playTrack(uri)
    } catch (err) {
      console.error("Failed to play track:", err)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (tracks.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-foreground/70">No top tracks found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-indigo-500/5 transition-colors"
            >
              <div className="text-foreground/60 font-medium w-6 text-center">{index + 1}</div>
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={track.album.images[0]?.url || "/placeholder.svg?height=48&width=48"}
                  alt={track.album.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{track.name}</h4>
                <p className="text-sm text-foreground/70 truncate">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
              <div className="text-sm text-foreground/60 hidden sm:block">{formatDuration(track.duration_ms)}</div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-indigo-500/20"
                  onClick={() => handlePlay(track.uri)}
                >
                  <Play size={16} />
                </Button>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
