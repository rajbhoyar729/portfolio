"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Music } from "lucide-react"
import NowPlaying from "@/components/spotify/now-playing"
import TopTracks from "@/components/spotify/top-tracks"
import SpotifyLoginButton from "@/components/spotify/login-button"
import { getNowPlaying } from "@/lib/spotify"

export default function SpotifyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getNowPlaying();\
        =>{
    const checkAuth = async () => {
      try {
        const data = await getNowPlaying();
        
        // If we get data back (even if nothing is playing), we're authenticated
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading text-center mb-12">My Spotify Profile</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>
                {error === "state_mismatch"
                  ? "State verification failed. Please try again."
                  : error === "token_exchange"
                  ? "Failed to exchange authorization code for tokens."
                  : "An error occurred during authentication."}
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </CardContent>
            </Card>
          ) : !isAuthenticated ? (
            <Card>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <Music size={48} className="text-indigo-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Connect Your Spotify Account</h2>
                <p className="text-foreground/70 mb-6">
                  Connect your Spotify account to see your top tracks and currently playing song.
                </p>
                <SpotifyLoginButton />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Now Playing</h2>
                <NowPlaying />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">My Top Tracks</h2>
                <TopTracks />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
