import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  // Token will exits if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl
  
  // Allow the requests if the following is true
  // 1. Its a request for next-auth session & provider detching
  // 2. The token exixts

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect to login page if the user does not have a token and are requesting protected routes
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login') 
  }

}