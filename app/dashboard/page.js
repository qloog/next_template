"use client"


import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [userDesigns, setUserDesigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDesigns = async () => {
            if (status !== "authenticated") return;

            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/personalUserDesigns', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials for session cookie
                });
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
    }, [session, status]);

    const handleDelete = async (designId) => {
      try {
          const response = await fetch('/api/deleteDesign', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ designId }),
          });
          if (!response.ok) {
              throw new Error('Failed to delete design');
          }
          // Remove the design from the state
          setUserDesigns(userDesigns.filter((design) => design._id !== designId));
      } catch (err) {
          console.error(err);
          setError(err.message);
      }
  };
  

    return (
        <main className="bg-white text-black min-h-screen p-8 pb-24">
            <section>
                <h2 className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Your Uploaded Designs
                </h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userDesigns.length > 0 ? (
                    <div className="grid">
                        {userDesigns.map((design) => (
                            <div key={design._id} className="image-container">
                                <img src={design.data} alt="Uploaded Design" />
                                <button onClick={() => handleDelete(design._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven&apos;t uploaded any designs yet.</p>
                )}
            </section>
            <style jsx>{`
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    justify-content: center;
                }

                .image-container {
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .image-container:hover {
                    transform: scale(1.05);
                }

                .image-container img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }
            `}</style>
        </main>
    );
}
