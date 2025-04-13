import { type NextRequest, NextResponse } from "next/server"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

export async function GET(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("spotify_refresh_token")?.value

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 })
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Token refresh error:", error)
      return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status })
    }

    const data = await response.json()

    // Update the access token cookie
    const nextResponse = NextResponse.json({ success: true })
    nextResponse.cookies.set("spotify_access_token", data.access_token, {
      maxAge: data.expires_in,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    // Update refresh token if provided
    if (data.refresh_token) {
      nextResponse.cookies.set("spotify_refresh_token", data.refresh_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }

    return nextResponse
  } catch (error) {
    console.error("Refresh token error:", error)
    return NextResponse.json({ error: "Server error during token refresh" }, { status: 500 })
  }
}
