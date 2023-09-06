require('dotenv').config();

import express from 'express';
import { get } from 'axios';
import cors from 'cors';

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
    const response = await get(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    throw error;
  }
};

app.get('/forward-to-nasa/apod', async (req, res) => {
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

// Route to fetch APOD data
app.get('/apod', async (req, res) => {
  const startDate = req.query.start_date;
  console.log('startDate:', startDate);
  const endDate = req.query.end_date;
  console.log('endDate:', endDate);

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
