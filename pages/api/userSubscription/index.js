// /api/userSubscription.js
import User from '@/models/User';// Adjust the path as necessary

export default async function handler(req, res) {
  // Assuming user ID is stored in the session or similar
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { hasAccess, planType, imageCount } = user;
    res.status(200).json({ hasAccess, planType, imageCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
