// /api/userSubscription.js
import User from "@/models/User";

export default async function handler(req, res) {
  // Debug: Log the session info
  console.log('Session:', req.session);

  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { hasAccess, planType, imageCount } = user;
    res.status(200).json({ hasAccess, planType, imageCount });
  } catch (error) {
    console.error('Error in userSubscription API:', error);
    res.status(500).json({ error: error.message });
  }
}
