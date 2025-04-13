import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("spotify_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Spotify" }, { status: 401 })
    }

    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false })
    }

    if (response.status === 401) {
      // Token expired, redirect to refresh
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    if (!response.ok) {
      const error = await response.text()
      console.error("Spotify API error:", error)
      return NextResponse.json({ error: "Failed to fetch currently playing" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Now playing error:", error)
    return NextResponse.json({ error: "Server error fetching now playing" }, { status: 500 })
  }
}
