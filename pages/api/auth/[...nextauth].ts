import NextAuth from 'next-auth'
import {JWT} from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyAPI, { LOGIN_URL } from '../../../lib/spotify'

// Reference: Refresh Token Rotation https://next-auth.js.org/tutorials/refresh-token-rotation
// Reference: TS defined = https://next-auth.js.org/getting-started/typescript

async function refreshAccessToken(token: JWT) {
  try {
    spotifyAPI.setAccessToken(token.accessToken as string)
    spotifyAPI.setRefreshToken(token.refreshToken as string)

    const { body: refreshedToken } = await spotifyAPI.refreshAccessToken()
    //console.log('refreshToken: ', refreshToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour from now = 3600 * 1000 ms return from spotify API.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // fallback to the old refresh token if the new one is not returned.
    }
  } catch (error) {
    //console.log(error)
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
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in.
      if (account && user)
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.expires_at! * 1000, // Handle in milliseconds
        }

      // Return previous token if the access token is still valid.
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Access Token expired. Refresh token.
      //console.log('Access Token expired. Refreshing token...')
      // @ts-ignore
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken // token.access token is HTTP only. Cannot be accessed by client. directly.
      session.refreshToken = token.refreshToken
      session.username = token.username

      return session
    },
  },
})