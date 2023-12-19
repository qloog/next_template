import React, { useState } from 'react';

const TattooGenerator = () => {
    const [text, setText] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [tattooImage, setTattooImage] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        setUploadedImage(null); // Reset uploaded image if text is entered
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
            setText(''); // Reset text if image is uploaded
        }
    };

    const renderNewIdea = () => {
        // Implement logic to generate a tattoo based on text or uploaded image
        // Placeholder action for now
        setTattooImage('path/to/generated/tattoo/image.png');
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Describe your tattoo idea..."
                rows={4}
                style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }}
                disabled={uploadedImage !== null}
            />
            <br />
            <input type="file" onChange={handleImageUpload} disabled={text !== ''} />
            <br />
            <button
                onClick={renderNewIdea}
                style={{
                    backgroundColor: 'white', // White background color
                    border: '1px solid #ccc',
                    borderRadius: '30px', // Oval shape
                    padding: '10px 20px',
                    cursor: 'pointer'
                }}
            >
                Render new idea
            </button>
            <div>
                {tattooImage && <img src={tattooImage} alt="Custom Tattoo" />}
            </div>
        </div>
    );
};

export default TattooGenerator;
