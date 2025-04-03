require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const projects = require('./projects.json');

dotenv.config();
const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// File path for storing messages
const messagesPath = path.join(__dirname, 'messages.json');

// --- ROUTES ---

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /projects, /weather, /contact or /messages.');
});

// Projects route
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Weather route
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

// --- NEW: Contact Form Submission ---
app.post('/contact', (req, res) => {
  const { name, email, subject, message, consent } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message || !consent) {
    return res.status(400).json({ error: 'Missing or invalid input' });
  }

  // Sanitize input
  const sanitizedMessage = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  try {
    // Load existing messages
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    }

    // Add new message
    messages.push(sanitizedMessage);

    // Save messages
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// --- NEW: Get all messages ---
app.get('/messages', (req, res) => {
  try {
    const messages = fs.existsSync(messagesPath)
      ? JSON.parse(fs.readFileSync(messagesPath, 'utf8'))
      : [];

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
