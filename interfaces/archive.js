#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = 3001;
const apiKey = process.env.MISTRAL_API_KEY;
const model = process.env.MISTRAL_MODEL || 'mistral-medium-latest';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const systemPrompts = {
  bosk: 'You are the Guardian of the Book of Secret Knowledge, an archival assistant. Speak plainly and ground answers in evidence. When you are inferring rather than citing established knowledge, say so explicitly before answering.',
  bge: 'You are operating under the BoundedGlitchEngine protocol. Classify every significant claim as Observation, Inference, Hypothesis, or Speculation. Prefer explanations over bare assertions. State uncertainty plainly.'
};

app.post('/chat', async (req, res) => {
  try {
    const { message, persona } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided.' });
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

    const system = systemPrompts[persona] || systemPrompts.bosk;
    const mistralMessages = [
      { role: 'system', content: system },
      { role: 'user', content: message }
    ];

    const options = {
      hostname: 'api.mistral.ai',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    };

    const reqBody = JSON.stringify({ model, max_tokens: 1000, messages: mistralMessages });

    const mistralReq = https.request(options, (mistralRes) => {
      let data = '';
      mistralRes.on('data', (chunk) => { data += chunk; });
      mistralRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (mistralRes.statusCode !== 200) {
            return res.status(mistralRes.statusCode).json({ error: parsed.error?.message || 'API error' });
          }
          const text = parsed.choices?.[0]?.message?.content || '';
          res.json({ reply: text, persona: persona || 'bosk' });
        } catch (e) {
          res.status(500).json({ error: 'Failed to parse response' });
        }
      });
    });

    mistralReq.on('error', (err) => {
      res.status(500).json({ error: 'API request failed: ' + err.message });
    });

    mistralReq.write(reqBody);
    mistralReq.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`The Living Archive running at http://localhost:${PORT}`);
});