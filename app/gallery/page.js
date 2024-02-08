import React from 'react';

// Dummy data for gallery images
const galleryImages = [
  { id: 1, url: '/media/tiger.webp', alt: 'Tattoo Design 1' },
  { id: 2, url: '/media/lion.JPG', alt: 'Tattoo Design 2' },
  // Add more images as needed
];

const page = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Gallery</h1>
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
