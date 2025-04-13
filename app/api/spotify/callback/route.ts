import { type NextRequest, NextResponse } from "next/server"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/spotify/callback"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    // Verify state to prevent CSRF attacks
    const storedState = request.cookies.get("spotify_auth_state")?.value

    if (!state || state !== storedState) {
      return NextResponse.redirect(new URL("/spotify?error=state_mismatch", request.url))
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: REDIRECT_URI,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error("Token exchange error:", error)
      return NextResponse.redirect(new URL("/spotify?error=token_exchange", request.url))
    }

    const tokenData = await tokenResponse.json()

    // Set tokens in cookies
    const response = NextResponse.redirect(new URL("/spotify", request.url))

    // Set cookies with tokens
    response.cookies.set("spotify_access_token", tokenData.access_token, {
      maxAge: tokenData.expires_in,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    return response
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.redirect(new URL("/spotify?error=server_error", request.url))
  }
}
