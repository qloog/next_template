"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [userDesigns, setUserDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDesigns = async () => {
      if (!session) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/personalUserDesigns');
        if (!response.ok) {
          throw new Error('Failed to fetch designs');
        }
        const designs = await response.json();
        setUserDesigns(designs);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDesigns();
  }, [session]);

  // The rest of your Dashboard component...
}
