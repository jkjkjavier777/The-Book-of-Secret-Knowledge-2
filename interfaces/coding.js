#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = 3003;
const apiKey = process.env.MISTRAL_API_KEY;
const model = process.env.MISTRAL_MODEL || 'mistral-medium-latest';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/quantum.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const systemPrompt = 'You are a direct, technically precise coding and quantum-computing assistant. Explain your reasoning briefly, flag tradeoffs and edge cases, and prefer working code over abstract advice. No filler, no unnecessary hedging.';

app.post('/api/v1/quantum/chat', async (req, res) => {
  try {
    const { prompt: message } = req.body;
    if (!message) {
      return res.status(400).json({ status: 'ERROR', error: 'No prompt provided.' });
    }
    if (!apiKey) {
      return res.status(500).json({ status: 'ERROR', error: 'API key not configured' });
    }

    const mistralMessages = [
      { role: 'system', content: systemPrompt },
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

    const reqBody = JSON.stringify({ model, max_tokens: 1500, messages: mistralMessages });

    const mistralReq = https.request(options, (mistralRes) => {
      let data = '';
      mistralRes.on('data', (chunk) => { data += chunk; });
      mistralRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (mistralRes.statusCode !== 200) {
            return res.status(mistralRes.statusCode).json({
              status: 'ERROR',
              error: parsed.error?.message || 'API error'
            });
          }
          const text = parsed.choices?.[0]?.message?.content || '';
          res.json({ status: 'SUCCESS', response: text });
        } catch (e) {
          res.status(500).json({ status: 'ERROR', error: 'Failed to parse response' });
        }
      });
    });

    mistralReq.on('error', (err) => {
      res.status(500).json({ status: 'ERROR', error: 'API request failed: ' + err.message });
    });

    mistralReq.write(reqBody);
    mistralReq.end();
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Quantum Chatbot running at http://localhost:${PORT}`);
});