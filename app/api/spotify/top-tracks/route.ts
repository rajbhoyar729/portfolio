import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("spotify_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Spotify" }, { status: 401 })
    }

    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      // Token expired, redirect to refresh
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    if (!response.ok) {
      const error = await response.text()
      console.error("Spotify API error:", error)
      return NextResponse.json({ error: "Failed to fetch top tracks" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Top tracks error:", error)
    return NextResponse.json({ error: "Server error fetching top tracks" }, { status: 500 })
  }
}
