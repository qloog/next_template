// pages/triggerApi.js or any component file you wish to use

import React from 'react';

const TriggerApiButton = () => {
  const handleButtonClick = async () => {
    try {
      // Replace '/api/editUserImage' with your actual API route
      const response = await fetch('/api/editUserImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary body data here
        body: JSON.stringify({
          // Your request body content
        }),
      });
      const data = await response.json();
      // This will log the response to the browser's console
      console.log(data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Trigger API Call</button>
    </div>
  );
};

export default TriggerApiButton;
