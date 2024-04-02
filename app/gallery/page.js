"use client";
import { useEffect, useState } from 'react';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to load images
  const loadImages = async (pageNum) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/galleryDisplay?page=${pageNum}&limit=30`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError('Failed to load images: ' + error.message);
      console.error('Failed to load images:', error);
      return []; // Return empty array on error to prevent further state update
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadImages(1).then(images => {
      setGalleryImages(images);
      setHasMore(images.length === 30);
    });
  }, []);

  // Load images for the new page
  const handlePageChange = async (newPage) => {
    const newImages = await loadImages(newPage);
    setGalleryImages(newImages);
    setPage(newPage);
    setHasMore(newImages.length === 30);
  };

  return (
    <>
      <div className="gallery">
        <h1>Gallery</h1>
        {isLoading && (
          <div className="loader">Loading...</div>
        )}
        {error && (
          <div className="error">{error}</div>
        )}
        <div className="grid">
          {galleryImages.map((image) => (
            <div key={image._id} className="image-container">
              <img src={image.data} alt="Gallery item" />
              <div className="labels">{image.labels.join(', ')}</div>
            </div>
          ))}
        </div>
        <div className="page-controls">
          <button 
            disabled={page <= 1 || isLoading} 
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <button 
            disabled={!hasMore || isLoading} 
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <style jsx>{`
        // ... your CSS styles ...
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
