import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
      Providers.Email({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
      // ... other providers ...
    ],
    // ... other configuration options ...
  });
  

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
