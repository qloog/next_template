"use client";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async (retryCount = 0) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/imageUpload');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        setGalleryImages(images);
      } catch (err) {
        setError(err.message);
        console.error(err);
        if (retryCount < 3) { // Retry up to 3 times
          fetchImages(retryCount + 1);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImages();
  }, []);
  
/* new */
  return (
    <>
      <div className="gallery">
        <h1>Gallery</h1>
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <div className="grid">
            {galleryImages.map((image) => (
              <div key={image._id} className="image-container">
                <img
                  src={image.data}
                  alt="Gallery item"
                />
                {image.labels && image.labels.length > 0 && (
                  <div className="labels">
                    {image.labels.map((label, index) => (
                      <span key={index} className="label">{label}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .gallery {
          padding: 20px;
          background-color: #f5f5f5;
          text-align: center;
        }

        .gallery h1 {
          margin-bottom: 20px;
          color: #333;
        }

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
        }

        .image-container:hover {
          transform: scale(1.05);
        }

        .image-container img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .labels {
          margin-top: 10px;
        }

        .label {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 5px 10px;
          border-radius: 20px;
          margin: 2px;
          font-size: 12px;
        }

        .loader,
        .error {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 18px;
          font-weight: bold;
        }

        .loader {
          color: #007bff;
        }

        .error {
          color: #dc3545;
        }
      `}</style>
    </>
  );
}





/* 
"use client";

import { useEffect, useState } from 'react';

export const maxDuration = 120;
export const dynamic = 'force-dynamic'

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async (retryCount = 0) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/imageUpload');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        setGalleryImages(images);
      } catch (err) {
        setError(err.message);
        console.error(err);
        if (retryCount < 3) { // Retry up to 3 times
          fetchImages(retryCount + 1);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImages();
  }, []);
  

  return (
    <>
      <div className="gallery">
        <h1>Gallery</h1>
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <div className="grid">
            {galleryImages.map((image) => (
              <div key={image._id} className="image-container">
                <img
                  src={image.data}
                  alt="Gallery item"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .gallery {
          padding: 20px;
          background-color: #f5f5f5;
          text-align: center;
        }

        .gallery h1 {
          margin-bottom: 20px;
          color: #333;
        }

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
        }

        .image-container:hover {
          transform: scale(1.05);
        }

        .image-container img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .loader,
        .error {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 18px;
          font-weight: bold;
        }

        .loader {
          color: #007bff;
        }

        .error {
          color: #dc3545;
        }
      `}</style>
    </>
  );
}

*/