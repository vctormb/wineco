import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInService, SignUpPayload } from '@/lib/api'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials: SignUpPayload): Promise<unknown> {
        const user = await signInService(credentials)

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // it runs only on initial login
        return {
          ...token,
          // seconds to milliseconds to compare with Date.now which is in ms
          expiresAt: user.expiresAt * 1000,
        }
      }

      if (Date.now() < token.expiresAt) {
        // If the token has not expired yet, return it
        return token
      }

      return {
        ...token,
        // error attribute to handle on the FE side
        error: 'InvalidTokenError' as const,
      }
    },
    async session({ session, token }) {
      session.user.email = token.email
      session.error = token.error
      return session
    },
  },
}

export default NextAuth(authOptions)
