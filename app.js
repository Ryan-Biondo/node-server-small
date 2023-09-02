require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/get-api-key/:projectName', (req, res) => {
  const { projectName } = req.params;
  const apiKey = process.env[`API_KEY_${projectName.toUpperCase()}`];

  if (apiKey) {
    res.json({ apiKey });
  } else {
    res.status(404).json({ message: 'API key not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
