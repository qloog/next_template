import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth";

export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token }) {
        token.userRole = "user"
        return token
      },
    },
  })
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
