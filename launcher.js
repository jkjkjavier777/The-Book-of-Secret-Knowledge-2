#!/usr/bin/env node
const readline = require('readline');
const path = require('path');
const express = require('express');
require('dotenv').config();

const { handleMessage } = require('./engine/boundedGlitchEngine');
const config = require('./config');

const personas = {
  bosk: require('./personas/bosk'),
  bge: require('./personas/bge'),
  coding: require('./personas/coding'),
};

const sessions = new Map();
function getSession(sessionId) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, { history: [] });
  return sessions.get(sessionId);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  console.log('========================================');
  console.log('   The-Book-of-Secret-Knowledge-2');
  console.log('========================================');
  console.log('1) The-Book-of-Secret-Knowledge');
  console.log('2) The BoundedGlitchEngine');
  console.log('3) Coding Assistant');
  console.log('========================================');

  rl.question('Select an option (1-3): ', (answer) => {
    handleChoice(answer.trim());
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1': {
      const interfaceModule = require(path.join(__dirname, 'interfaces', 'archive.js'));
      rl.close();
      startServer(interfaceModule);
      break;
    }
    case '2': {
      const interfaceModule = require(path.join(__dirname, 'interfaces', 'browser.js'));
      rl.close();
      startServer(interfaceModule);
      break;
    }
    case '3':
      startTerminalChat();
      break;
    default:
      console.log('\nInvalid option. Please enter 1, 2, or 3.\n');
      showMenu();
  }
}

function startServer({ name, htmlFile }) {
  const app = express();
  const PORT = config.port;

  // index: false prevents Express from auto-serving index.html
  // for '/' before our explicit route below gets a chance to run
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public'), { index: false }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', htmlFile));
  });

  app.get('/health', (req, res) => {
    if (!config.mistral.apiKey) {
      return res.status(503).json({ ok: false, error: 'MISTRAL_API_KEY not set' });
    }
    res.json({ ok: true });
  });

  app.post('/chat', async (req, res) => {
    const { message, persona: personaKey, sessionId, mode } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing "message" in request body.' });
    }

    const persona = personas[personaKey];
    if (!persona) {
      return res.status(400).json({ error: `Unknown persona "${personaKey}".` });
    }

    const session = getSession(sessionId || 'default');
    const input = mode ? `[mode: ${mode}] ${message}` : message;

    try {
      const reply = await handleMessage(input, session, persona);
      res.json({ reply });
    } catch (err) {
      console.error('Chat request failed:', err);
      res.status(500).json({ error: `Request failed: ${err.message}` });
    }
  });

  app.listen(PORT, () => {
    console.log(`\n${name} running at http://localhost:${PORT}\n`);
  });
}

function startTerminalChat() {
  const persona = personas.coding;
  const session = getSession('terminal-coding');

  console.clear();
  console.log(typeof persona.banner === 'function' ? persona.banner() : (persona.banner || persona.name));
  console.log('Type "exit" or "quit" to leave.\n');

  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('\nGoodbye.\n');
      rl.close();
      return;
    }

    try {
      const reply = await handleMessage(input, session, persona);
      console.log(`\n${reply}\n`);
    } catch (err) {
      console.error(`\nRequest failed: ${err.message}\n`);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

showMenu();
