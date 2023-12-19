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
            // Assuming URL.createObjectURL is used for preview; adjust based on your method
            setUploadedImage(URL.createObjectURL(file));
            setText(''); // Reset text if image is uploaded
        }
    };

    const generateTattoo = () => {
        // Implement logic to generate a tattoo based on text or uploaded image
        // For now, this is a placeholder action
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
                disabled={uploadedImage !== null} // Disable if an image is uploaded
            />
            <br />
            <input type="file" onChange={handleImageUpload} disabled={text !== ''} /> {/* Disable if text is entered */}
            <br />
            <button onClick={generateTattoo}>Generate Tattoo</button>
            <div>
                {tattooImage && <img src={tattooImage} alt="Custom Tattoo" />}
            </div>
        </div>
    );
};

export default TattooGenerator;
