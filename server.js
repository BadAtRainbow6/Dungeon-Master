const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const path = require('path');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.post('/api/ai', (req, res) => {
  const userMessage = req.body.message;
  console.log('Received from client:', userMessage);

  // Simulate AI processing (replace this with real AI integration)
  const aiResponse = `You said: "${userMessage}". Here's a pretend AI response.`;

  res.json({ response: aiResponse });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
