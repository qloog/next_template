import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, CircularProgress, Paper, Input } from '@mui/material';

export default function Home() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [openAIResponse, setOpenAIResponse] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || prompt === '') {
      alert('Please upload an image and enter a prompt.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);

    try {
      const response = await fetch('/api/editUserImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOpenAIResponse(data.response);
    } catch (error) {
      console.error('Error posting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Tattoo Design Analyzer
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            disableUnderline
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Enter your prompt"
            autoFocus
            value={prompt}
            onChange={handlePromptChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Analyze Design
          </Button>
          {loading && <CircularProgress size={24} sx={{ display: 'block', mx: 'auto' }} />}
          {openAIResponse && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Response: {openAIResponse}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
