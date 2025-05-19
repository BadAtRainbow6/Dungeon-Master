const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});


app.post('/api/ai', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "meta-llama/llama-4-maverick:free",
                messages: [
                    { role: "system", content: "You are an AI that designs and runs a MUD (multi-user dungeon), along the lines of Zork."},
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const mockResponse = {
            "location": "Ancient Cavern",
            "description": "You stand in a dimly lit cavern. The walls are damp with moss, and you can hear the distant drip of water echoing through the tunnels. A faint glow comes from a passage to the east.",
            "inventory": [
                "Rusty Sword",
                "Torch (half-burned)",
                "Old Map Fragment"
            ],
            "choices": [
                {
                "id": 1,
                "text": "Take the eastern passage"
                },
                {
                "id": 2,
                "text": "Inspect the cavern walls"
                },
                {
                "id": 3,
                "text": "Check your map"
                }
            ],
            "ai_hint": "The glow from the east might indicate a magical presence. The walls may hide secrets."
        }


        const reply = response.data.choices[0].message.content;
        console.log(reply);
        res.json({ response: reply });
        //res.json({response: mockResponse});
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ response: "AI request failed." });
    }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});