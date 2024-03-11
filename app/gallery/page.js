"use client";

import { useEffect, useState } from 'react';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

export const runtime = "edge"

console.log('S3 Region:', process.env.NEXT_PUBLIC_S3_REGION);

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  },
});

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const command = new ListObjectsCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        });
        const response = await s3Client.send(command);
        const images = response.Contents.map((object) => ({
          id: object.Key,
          url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${object.Key}?t=${Date.now()}`,
        }));
        setGalleryImages(images);
      } catch (err) {
        setError('Failed to fetch images from S3');
        console.error(err);
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
              <div key={image.id} className="image-container">
                <img src={image.url} alt="Tattoo Design" />
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
          height: 100%;
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

/* 
"use client";

import { useEffect, useState } from 'react';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';

export const runtime = "edge"

console.log('S3 Region:', process.env.NEXT_PUBLIC_S3_REGION);

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  },
});

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const command = new ListObjectsCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        });
        const response = await s3Client.send(command);
        const images = response.Contents.map((object) => ({
          id: object.Key,
          url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${object.Key}?t=${Date.now()}`,
        }));
        setGalleryImages(images);
      } catch (err) {
        setError('Failed to fetch images from S3');
        console.error(err);
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
              <div key={image.id} className="image-container">
                <img src={image.url} alt="Tattoo Design" />
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
          height: 100%;
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
