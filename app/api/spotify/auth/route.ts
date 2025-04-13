import { NextResponse } from "next/server"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/spotify/callback"
const SCOPES = [
  "user-read-currently-playing",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
].join("%20")

export async function GET() {
  try {
    // Generate a random string for state verification
    const state = Math.random().toString(36).substring(2, 15)

    // Create the authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&state=${state}`

    // Store the state in a cookie for verification later
    const response = NextResponse.redirect(authUrl)
    response.cookies.set("spotify_auth_state", state, {
      maxAge: 60 * 5, // 5 minutes
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    return response
  } catch (error) {
    console.error("Spotify auth error:", error)
    return NextResponse.json({ error: "Failed to initiate Spotify authentication" }, { status: 500 })
  }
}
