require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Function to retrieve your NASA API key
const getAPIKey = () => {
  return process.env.API_KEY_APOD;
};

// Function to fetch data from NASA API
const fetchDataFromNASA = async (startDate, endDate) => {
  const API_KEY = getAPIKey();
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    throw error;
  }
};

// Route to serve API key (don't actually do this, just for demonstration)
app.get('/get-api-key/:service', (req, res) => {
  if (req.params.service === 'APOD') {
    res.json({ apiKey: getAPIKey() });
  } else {
    res.status(400).send('Unknown service');
  }
});

// Route to fetch APOD data
app.get('/apod', async (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  try {
    const data = await fetchDataFromNASA(startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
