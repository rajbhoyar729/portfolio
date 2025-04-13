import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("spotify_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated with Spotify" }, { status: 401 })
    }

    // Get the device ID from the request body if provided
    const { deviceId, uri } = await request.json()

    let endpoint = "https://api.spotify.com/v1/me/player/play"
    if (deviceId) {
      endpoint += `?device_id=${deviceId}`
    }

    const body = uri ? JSON.stringify({ uris: [uri] }) : undefined

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body,
    })

    if (response.status === 204) {
      return NextResponse.json({ success: true })
    }

    if (response.status === 401) {
      // Token expired, redirect to refresh
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    if (!response.ok) {
      const error = await response.text()
      console.error("Spotify API error:", error)
      return NextResponse.json({ error: "Failed to start playback" }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Play error:", error)
    return NextResponse.json({ error: "Server error starting playback" }, { status: 500 })
  }
}
