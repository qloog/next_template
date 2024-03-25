import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const authOptions = {
    // Other options...
    session: {
      // Specify the URL for fetching the session
      url: "https://www.tattooswithai.com/api/auth/session",
    },
    // Other options...
  };