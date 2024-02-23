// This could be a file like pages/api/uploadToGallery.js or app/api/uploadToGallery/route.js depending on your structure

// Simulating a database with an in-memory array
let galleryImages = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body;

    // Simulate saving to a database by pushing to an array
    const newImage = {
      id: galleryImages.length + 1, // Simple incrementing ID, replace with DB logic
      url: imageUrl,
      alt: 'User uploaded image', // You might want to allow users to specify an alt text
    };

    galleryImages.push(newImage);

    // Respond with the updated list of images or just the new image as confirmation
    res.status(200).json(newImage);
  } else {
    // If not a POST request, return 405 - Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
