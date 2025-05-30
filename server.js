const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());

let messageHistory = [
    {
        role: "system",
        content: "You are a text-based adventure AI. The user is the player. Respond as if generating a MUD room, and continue the game story with each message."
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.post('/api/ai', async (req, res) => {
    try {
        const userMessage = req.body.message;

        messageHistory.push({ role: "user", content: userMessage });

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "meta-llama/llama-4-maverick:free",
                messages: messageHistory
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data.choices[0].message.content;

        messageHistory.push({ role: "assistant", content: reply });

        res.json({ response: reply });

        if (messageHistory.length > 22) {
            // Keep only the system message and last 10 exchanges
            messageHistory = [
                messageHistory[0],
                ...messageHistory.slice(-20)
            ];
        }
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ response: "AI request failed." });
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});