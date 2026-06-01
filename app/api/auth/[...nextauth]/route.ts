import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
import { withErrorHandler } from "@/lib/with-error-handler"
import { UserService } from "@/services/user/user-service"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      const userData = { ...user } as {
        id: string
        name: string
        email: string
        image: string
      }
      const accessToken = account?.access_token
      const refreshToken = account?.refresh_token

      withErrorHandler(async () => {
        const userService = UserService.getInstance()
        await userService.createUser({ ...userData, accessToken, refreshToken })
      })

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session }) {
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
