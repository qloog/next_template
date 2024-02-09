"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import config from "@/config";


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
        {/* Header with logo and app name */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2 shrink-0" title={`${config.appName} homepage`}>
            <Image src={logo} alt={`${config.appName} logo`} className="w-8" placeholder="blur" priority={true} width={32} height={32} />
            <div>
              {/* Inline style for the animated text */}
              <style jsx>{`
                @keyframes animatedgradient {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .animated-text {
                  font-size: 24px;
                  font-weight: bold;
                  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
                  background-size: 300% 300%;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: animatedgradient 6s ease infinite alternate;
                }
              `}</style>
              <span className="font-extrabold text-lg">
                <span className="animated-text">{config.appName}</span>
              </span>
            </div>
          </Link>
        </div>
  
        {/* Gallery content below */}
        <h1 style={{ color: 'black', fontFamily: "'Poppins', sans-serif", textAlign: 'center', marginBottom: '20px' }}>Latest Design Renders</h1>
        {/* Rest of your gallery page content */}
      </div>
    );
  };
  
  export default page;