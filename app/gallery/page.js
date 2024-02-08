import React from 'react';

// Dummy data for gallery images
const galleryImages = [
  { id: 1, url: '/media/tiger.webp', alt: 'Tattoo Design 1' },
  { id: 2, url: '/media/lion.JPG', alt: 'Tattoo Design 2' },
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

const page = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Latest Design Renders</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        alignItems: 'stretch',
      }}>
        {galleryImages.map((image) => (
          <div key={image.id} style={{ overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <img src={image.url} alt={image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
