"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loader = useRef(null);
  const page = useRef(1);
  const lastSearchTerm = useRef('');

  const loadImages = useCallback(async () => {
    if (searchTerm === lastSearchTerm.current) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/galleryDisplay?page=${page.current}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        setGalleryImages((prevImages) => {
          // Combine the new images with the previously loaded images
          const allImages = [...prevImages, ...images];
          // Sort images by createdAt in descending order
          allImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          return allImages;
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
        setIsLoading(false);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && searchTerm === lastSearchTerm.current) {
        page.current += 1;
        loadImages();
      }
    }, { threshold: 0.1 });

    loader.current && observer.observe(loader.current);

    return () => observer.disconnect();
  }, [loadImages, isLoading]);

  useEffect(() => {
    if (searchTerm !== lastSearchTerm.current) {
      lastSearchTerm.current = searchTerm;
      page.current = 1;
      setGalleryImages([]);
    }
    const delayDebounce = setTimeout(() => {
      setDisplayedImages(
        galleryImages.filter((image) =>
          image.labels.some((label) =>
            label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, galleryImages]);

  return (
    <>
      <div className="gallery">
        <h1>Gallery</h1>
        <input
          type="text"
          placeholder="Search by label..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {error && <div className="error">Error: {error}</div>}
        <div className="grid">
          {displayedImages.map((image) => (
            <div key={image._id} className="image-container">
              <img src={image.data} alt="Gallery item" />
              <div className="labels">{image.labels.join(', ')}</div>
            </div>
          ))}
        </div>
        {isLoading && <div className="loader">Loading...</div>}
        <div ref={loader} className="loading-indicator" />
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
  .search-bar {
    margin-bottom: 20px;
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ccc;
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
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: calc(10px + 0.5vw); /* Responsive font size */
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
  .loading-indicator {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`}</style>

    </>
  );
}




/*

"use client"
import { useEffect, useState } from 'react';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/galleryDisplay');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        // Sort images by createdAt in descending order
        images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setGalleryImages(images);
        setFilteredImages(images);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const filtered = galleryImages.filter(image =>
      image.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredImages(filtered);
  }, [searchTerm, galleryImages]);

  return (
    <>
      <div className="gallery">
        <h1>Gallery</h1>
        <input
          type="text"
          placeholder="Search by label..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <div className="grid">
            {filteredImages.map((image) => (
              <div key={image._id} className="image-container">
                <img src={image.data} alt="Gallery item" />
                <div className="labels">{image.labels.join(', ')}</div>
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

        .search-bar {
          margin-bottom: 20px;
          padding: 10px;
          width: 300px;
          border-radius: 5px;
          border: 1px solid #ccc;
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
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px;
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: calc(10px + 0.5vw); /* Responsive font size */
//}

/*.loader,
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
