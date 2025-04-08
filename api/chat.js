// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer sk-v1-b5998f2d872111b00c39354309c0d8678b49936efc661953f41c998c1a3f0d29`, // 🛑 Replace this with your real API key
        'HTTP-Referer': 'https://ai-chatbot-pi-mocha-15.vercel.app/',
        'X-Title': 'WSP ChatBot',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch from OpenRouter API' });
  }
}


