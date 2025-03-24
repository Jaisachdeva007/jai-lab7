require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projects = require('./projects.json');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
const PORT = 5050;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Projects API! Use /projects or /weather.');
});

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.get('/weather', async (req, res) => {
  const { WEATHER_API_KEY, CITY } = process.env;

  if (!WEATHER_API_KEY || !CITY) {
    return res.status(500).json({ error: 'API key or city not set' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) return res.status(data.cod).json({ error: data.message });

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Weather API Key:", process.env.OPENWEATHERMAP_API_KEY);
});
