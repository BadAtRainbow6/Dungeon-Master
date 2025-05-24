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
                    { role: "system", content: "You are an AI that designs and runs a MUD (multi-user dungeon), along the lines of Zork." },
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

        const reply = response.data.choices[0].message.content;
        res.json({ response: reply });
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ response: "AI request failed." });
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});