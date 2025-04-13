export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
  external_urls: {
    spotify: string
  }
  uri: string
}

export interface NowPlayingResponse {
  is_playing: boolean
  item?: SpotifyTrack
  progress_ms?: number
}

export interface TopTracksResponse {
  items: SpotifyTrack[]
}

export async function getTopTracks(): Promise<SpotifyTrack[]> {
  const res = await fetch("/api/spotify/top-tracks", {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    if (res.status === 401) {
      // Try to refresh the token
      await refreshToken()
      // Retry the request
      const retryRes = await fetch("/api/spotify/top-tracks")
      if (retryRes.ok) {
        const data = await retryRes.json()
        return data.items || []
      }
    }
    return []
  }

  const data = await res.json()
  return data.items || []
}

export async function getNowPlaying(): Promise<NowPlayingResponse | null> {
  const res = await fetch("/api/spotify/now-playing", {
    next: { revalidate: 30 }, // Revalidate every 30 seconds
  })

  if (!res.ok) {
    if (res.status === 401) {
      // Try to refresh the token
      await refreshToken()
      // Retry the request
      const retryRes = await fetch("/api/spotify/now-playing")
      if (retryRes.ok) {
        return await retryRes.json()
      }
    }
    return null
  }

  return await res.json()
}

export async function playTrack(uri?: string, deviceId?: string): Promise<boolean> {
  const res = await fetch("/api/spotify/playback/play", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uri, deviceId }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      // Try to refresh the token
      await refreshToken()
      // Retry the request
      const retryRes = await fetch("/api/spotify/playback/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uri, deviceId }),
      })
      return retryRes.ok
    }
    return false
  }

  return true
}

export async function pausePlayback(deviceId?: string): Promise<boolean> {
  const res = await fetch("/api/spotify/playback/pause", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      // Try to refresh the token
      await refreshToken()
      // Retry the request
      const retryRes = await fetch("/api/spotify/playback/pause", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceId }),
      })
      return retryRes.ok
    }
    return false
  }

  return true
}

async function refreshToken(): Promise<boolean> {
  const res = await fetch("/api/spotify/refresh")
  return res.ok
}

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
