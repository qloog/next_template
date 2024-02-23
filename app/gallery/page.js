"use client"

import React, { useEffect, useState } from 'react';

export default function Gallery() {
    // State to store fetched images
    const [galleryImages, setGalleryImages] = useState([]);

    // Fetch images from the JSON file on component mount
    useEffect(() => {
        fetch('/galleryImages.json')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the JSON structure is an array of objects with id, url, and alt properties
                setGalleryImages(data);
            })
            .catch((error) => {
                console.error("Failed to load gallery images:", error);
            });
    }, []);

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#F5F5F5', // Light gray background
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333', // Slightly darker text for better contrast
            }}>Gallery</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                justifyContent: 'center',
            }}>
                {galleryImages.map((image) => (
                    <div key={image.id} style={{
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}>
                        <img src={image.url} alt={image.alt} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
}









  /*
export default function Gallery() {
    
    const galleryImages = [
      { id: 1, url: '/media/tiger.webp', alt: 'Tattoo Design 1' },
      { id: 2, url: '/media/lion.JPG', alt: 'Tattoo Design 2' },
      // Add more images as needed
      { id: 3, url: '/media/IMG_5581.WEBP', alt: 'Tattoo Design 2' },
      { id: 4, url: '/media/IMG_5583.WEBP', alt: 'Tattoo Design 2' },
      { id: 5, url: '/media/IMG_5586.WEBP', alt: 'Tattoo Design 2' },
      { id: 6, url: '/media/IMG_5587.WEBP', alt: 'Tattoo Design 2' },
      { id: 7, url: '/media/IMG_5612.WEBP', alt: 'Tattoo Design 2' },
      { id: 8, url: '/media/IMG_5688.WEBP', alt: 'Tattoo Design 2' },
      { id: 9, url: '/media/IMG_5684.WEBP', alt: 'Tattoo Design 2' },
      { id: 10, url: '/media/IMG_6041.PNG', alt: 'Tattoo Design 2' },
      { id: 11, url: '/media/IMG_5723.WEBP', alt: 'Tattoo Design 2' },
      { id: 12, url: '/media/IMG_5579.WEBP', alt: 'Tattoo Design 2' },
      { id: 13, url: '/media/IMG_5683.WEBP', alt: 'Tattoo Design 2' },
      { id: 14, url: '/media/IMG_5412 Small.png', alt: 'Tattoo Design 2' },
      { id: 15, url: '/media/Khalsa Small.jpeg', alt: 'Tattoo Design 2' },
    ];
  
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#F5F5F5', // Light gray background
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333', // Slightly darker text for better contrast
        }}>Gallery</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
        }}>
          {galleryImages.map((image) => (
            <div key={image.id} style={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <img src={image.url} alt={image.alt} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} />
            </div>
          ))}
        </div>
      </div>
    );
  }


  */
  