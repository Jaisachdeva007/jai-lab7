require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const projects = require('./projects.json');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

let messagesMemory = [];

app.get('/', (req, res) => {
  res.send('API is running');
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

app.post('/contact', (req, res) => {
  const { name, email, subject, message, consent } = req.body;

  if (!name || !email || !subject || !message || !consent) {
    console.log(" Invalid submission:", req.body);
    return res.status(400).json({ error: 'Invalid input' });
  }

  const sanitizedMessage = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  messagesMemory.push(sanitizedMessage);
  console.log(" Message saved:", sanitizedMessage);
  res.status(201).json({ success: true });
});

app.get('/messages', (req, res) => {
  res.json(messagesMemory);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
