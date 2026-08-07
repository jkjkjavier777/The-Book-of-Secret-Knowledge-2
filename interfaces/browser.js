#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');

class BrowserInterface {
  constructor(port = 3002) {
    this.port = port;
    this.app = express();
    this.apiKey = process.env.MISTRAL_API_KEY;
    this.model = process.env.MISTRAL_MODEL || 'mistral-medium-latest';
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index-old.html'));
    });

    this.app.post('/api/explain', async (req, res) => {
      try {
        const { messages, system } = req.body;

        if (!messages || !Array.isArray(messages)) {
          return res.status(400).json({ error: 'Messages required' });
        }

        if (!this.apiKey) {
          return res.status(500).json({ error: 'API key not configured' });
        }

        const mistralMessages = system
          ? [{ role: 'system', content: system }, ...messages]
          : messages;

        const options = {
          hostname: 'api.mistral.ai',
          port: 443,
          path: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        };

        const req_body = JSON.stringify({
          model: this.model,
          max_tokens: 1000,
          messages: mistralMessages
        });

        const mistral_req = https.request(options, (mistral_res) => {
          let data = '';

          mistral_res.on('data', (chunk) => {
            data += chunk;
          });

          mistral_res.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              if (mistral_res.statusCode !== 200) {
                return res.status(mistral_res.statusCode).json({ error: parsed.error?.message || parsed.error || 'API error' });
              }
              const text = parsed.choices?.[0]?.message?.content || '';
              res.json({ reply: text });
            } catch (e) {
              res.status(500).json({ error: 'Failed to parse response' });
            }
          });
        });

        mistral_req.on('error', (err) => {
          console.error('API error:', err.message);
          res.status(500).json({ error: 'API request failed: ' + err.message });
        });

        mistral_req.write(req_body);
        mistral_req.end();
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
      }
    });

    this.app.get('/api/status', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  }

  start() {
    if (!this.apiKey) {
      console.error('✗ MISTRAL_API_KEY not set');
      console.log('Set it: export MISTRAL_API_KEY="your-key"');
      process.exit(1);
    }

    this.app.listen(this.port, () => {
      console.log(`\n● Study Desk running at http://localhost:${this.port}`);
      console.log(`API key loaded ✓\n`);
    });
  }
}

const server = new BrowserInterface(3002);
server.start();