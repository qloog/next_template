import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth";
import GoogleProvider from "next-auth/providers/google";

providers: [
    GoogleProvider({
        // Follow the "Login with Google" tutorial to get your credentials
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        
      })
]
    
    // Follow the "Login with Email" tutorial to set up your email server
    // Requires a MongoDB database. Set MONOGODB_URI env variable.
   // ...(connectMongo
    //  ? [
    //      EmailProvider({
      //      server: process.env.EMAIL_SERVER,
     //       from: config.mailgun.fromNoReply,
      //    }),
     //  ]
    //  : []),
  

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
