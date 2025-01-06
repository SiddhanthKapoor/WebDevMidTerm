const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Weather API route
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Bangalore';  // Default to Bangalore if no city is provided
  const apiKey = process.env.WEATHER_API_KEY;  // Get the API key from the environment variable
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();  // Parse the response to JSON

    if (data.cod === 200) {
      res.json(data);  // Send the data to the client
    } else {
      res.status(400).json({ error: 'City not found or API issue' });  // Handle error response
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });  // Handle server-side error
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
