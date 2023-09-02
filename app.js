require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173', // local development
  'https://apod-gallery-gold.vercel.app/', // production
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET',
  credentials: true,
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
