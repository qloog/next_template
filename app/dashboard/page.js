"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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

    return (
        <main className="bg-white text-black min-h-screen p-8 pb-24">
            <section className="max-w-xl mx-auto space-y-8" id="about">
                <h1 className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Our mission is to usher in a new era of human creativity through artificial intelligence.
                </h1>
            </section>
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
                                {/* Add a delete button or functionality here */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't uploaded any public designs yet.</p>
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

