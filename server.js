const express = require('express');
const { google } = require('googleapis');
const { readFileSync } = require('fs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Calendar API');
});

const filePath = path.join(__dirname, 'Google Calendar/member-app-8683b-aa412b322788.json');
const serviceAccountKey = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON

// Google Calendar API setup
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});
  
const calendar = google.calendar({ version: 'v3', auth });
  
// Endpoint to get calendar events
app.get('/general', async (req, res) => {
  try {
    const calendarId = 'info@steme.org'; // Replace with your calendar ID
    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(), // Get events from today onwards
      maxResults: 10, // Limit results
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    res.json(events.data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

app.get('/events', async (req, res) => {
  try {
    const calendarId = 'c_nobs3vp273idaqtjk10cu9vt7c@group.calendar.google.com'; // Replace with your calendar ID
    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(), // Get events from today onwards
      maxResults: 10, // Limit results
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    res.json(events.data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

app.get('/orientations', async (req, res) => {
  try {
    const calendarId = 'c_8a9ed5d40ee07ae9ae7d06abc9a53e4ad890638353ed46343d84e0153bd0d7a5@group.calendar.google.com'; // Replace with your calendar ID
    const events = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(), // Get events from today onwards
      maxResults: 10, // Limit results
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    res.json(events.data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// const http = require('http');
// const port = process.env.PORT || 3000;

// http.createServer(function(request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World!');
// }).listen(port);

// console.log(`Server running at http://localhost:${port}`);