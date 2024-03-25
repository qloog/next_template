// pages/api/userDesigns.js
import connectMongo from "@/libs/mongoose";
import { getSession } from "next-auth/react";

export async function POST(req) {
  if (req.method === 'GET') {
    try {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      await connectMongo();
      // Fetch user designs from the database
      // For example:
      // const userDesigns = await Design.find({ userId: session.user.id });
      // res.status(200).json(userDesigns);

      // Dummy response for demonstration
      res.status(200).json([{ _id: '1', data: 'https://example.com/design1.jpg', uploaderId: session.user.id }]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
