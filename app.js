require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Determine if the app is in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Configure CORS options
const corsOptions = {
  origin: isDevelopment
    ? 'http://localhost:5174' // localhost during development
    : 'https://apod-gallery-gold.vercel.app/', // your production client-side URL
  methods: 'GET',
  credentials: true, // Add this line for handling credentials
};

// Enable CORS with the options
app.use(cors(corsOptions));

// API endpoint to get API keys
app.get('/get-api-key/:projectName', (req, res) => {
  const { projectName } = req.params;
  const apiKey = process.env[`API_KEY_${projectName.toUpperCase()}`];

  if (apiKey) {
    res.json({ apiKey });
  } else {
    res.status(404).json({ message: 'API key not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(
    `Server running at https://small-projects-alpha.onrender.com:${port}/`
  ); // Changed to your Render URL
});
