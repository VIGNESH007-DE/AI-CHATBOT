const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-chatbot-pi-mocha-15.vercel.app/',
        'X-Title': 'WSP ChatBot',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await openRouterResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching from OpenRouter: ' + error.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
