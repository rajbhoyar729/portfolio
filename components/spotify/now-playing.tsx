"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getNowPlaying, pausePlayback, playTrack, type NowPlayingResponse } from "@/lib/spotify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null)

  const fetchNowPlaying = async () => {
    try {
      setLoading(true)
      const data = await getNowPlaying()
      setNowPlaying(data)

      if (data?.is_playing && data.progress_ms && data.item) {
        setProgress(data.progress_ms)

        // Clear any existing interval
        if (progressInterval) {
          clearInterval(progressInterval)
        }

        // Set up a new interval to update progress
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + 1000 // Add 1 second
            if (data.item && newProgress >= data.item.duration_ms) {
              clearInterval(interval)
              // Refetch to get the next song
              fetchNowPlaying()
              return 0
            }
            return newProgress
          })
        }, 1000)

        setProgressInterval(interval)
      } else {
        // Clear interval if not playing
        if (progressInterval) {
          clearInterval(progressInterval)
          setProgressInterval(null)
        }
      }

      setError(null)
    } catch (err) {
      setError("Failed to fetch currently playing track")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()

    // Set up polling to refresh now playing data
    const interval = setInterval(fetchNowPlaying, 30000) // Every 30 seconds

    return () => {
      clearInterval(interval)
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [])

  const handlePlayPause = async () => {
    if (!nowPlaying) return

    try {
      if (nowPlaying.is_playing) {
        const success = await pausePlayback()
        if (success) {
          setNowPlaying({ ...nowPlaying, is_playing: false })
          if (progressInterval) {
            clearInterval(progressInterval)
            setProgressInterval(null)
          }
        }
      } else if (nowPlaying.item) {
        const success = await playTrack(nowPlaying.item.uri)
        if (success) {
          setNowPlaying({ ...nowPlaying, is_playing: true })
          fetchNowPlaying() // Refetch to get updated progress
        }
      }
    } catch (err) {
      console.error("Failed to control playback:", err)
    }
  }

  if (loading && !nowPlaying) {
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

  if (error && !nowPlaying) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!nowPlaying || !nowPlaying.item) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-foreground/70">Nothing playing right now</p>
        </CardContent>
      </Card>
    )
  }

  const { item, is_playing } = nowPlaying
  const progressPercent = (progress / item.duration_ms) * 100

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-48 h-48">
            <Image
              src={item.album.images[0]?.url || "/placeholder.svg?height=200&width=200"}
              alt={item.album.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-foreground/70 mb-2">{item.artists.map((artist) => artist.name).join(", ")}</p>
                <p className="text-sm text-foreground/60 mb-4">{item.album.name}</p>
              </div>
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-indigo-500/10 hover:bg-indigo-500/20"
                  onClick={handlePlayPause}
                >
                  {is_playing ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <span className="text-sm text-foreground/60">
                  {formatTime(progress)} / {formatTime(item.duration_ms)}
                </span>
              </div>
              <Progress value={progressPercent} className="h-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
