import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth";

const options = {
  ...authOptions,
  session: {
    ...authOptions.session,
    url: "https://www.tattooswithai.com/api/auth/session",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
