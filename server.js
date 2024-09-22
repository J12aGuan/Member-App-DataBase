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

const filePath = path.join(__dirname, 'member-app-8683b-aa412b322788.json');
const serviceAccountKey = JSON.parse(fs.readFileSync(filePath, 'utf8')); // Parse the JSON

// Google Calendar API setup
const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  
  const calendar = google.calendar({ version: 'v3', auth });
  
  // Endpoint to get calendar events
  app.get('/events', async (req, res) => {
    try {
        const calendarId = 'info@steme.org'; // Replace with your calendar ID
        const events = await calendar.events.list({
            calendarId: calendarId,
            timeMin: new Date().toISOString(), // Get events from today onwards
            maxResults: 10, // Limit results
            singleEvents: true,
            orderBy: 'startTime',
        });
        
        console.log('Events from Google Calendar:', events.data.items);
        
        res.json(events.data.items);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
});
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const http = require('http');
// const port = process.env.PORT || 3000;

// http.createServer(function(request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World!');
// }).listen(port);

// console.log(`Server running at http://localhost:${port}`);