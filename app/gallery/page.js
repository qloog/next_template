"use client"

import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data } = await supabaseAdmin.from('images').select('*').order('id');
  return {
    props: {
      images: data,
    },
  };
}

// Helper function for concatenating class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Gallery({ images }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
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
  