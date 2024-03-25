"use client"

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
                const response = await fetch('/api/personalUserDesigns', { method: 'POST' });
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
                                <img src={design.data} alt="Gallery item" />
                                {/* Add a delete button or functionality here */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven&apos;t uploaded any public designs yet.</p>
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

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                }

                p {
                    text-align: center;
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </main>
    );
}
