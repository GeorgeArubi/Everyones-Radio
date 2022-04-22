import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyAPI from '../lib/spotify'

const useSpotify = () => {
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      // If refresh access token attempts to fail, direct the user to the login page
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyAPI.setAccessToken(session.accessToken as string)
    }
  }, [session])

  return spotifyAPI
}

export default useSpotify
