import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

const refreshAccessToken = async (token) => {
  try {

    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setAccessToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log("Refreshed token is ", refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpire: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from Spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Replace token if a new one comes back else keep the old refresh token
    }

  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks : {
    async jwt({ token, account, user }) {

      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpire: account.expires_at * 1000, // Convert expiration time to milliseconds
        }
      }

      // Return previous token if access token has not expired
      if (Date.now() < token.accessTokenExpire) {
        console.log("Existing token is still valid")
        return token
      }

      // Refresh token if access token has expired
      console.log("Access token has expired, refreshing...")
      return refreshAccessToken(token)

    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
