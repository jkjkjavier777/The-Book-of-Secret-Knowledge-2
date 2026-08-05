const express = require('express');
const path = require('path');
const { handleMessage } = require('./engine/boundedGlitchEngine');
const { getSession } = require('./engine/memory');
const bosk = require('./personas/bosk');
const bge = require('./personas/bge');

const personas = { bosk, bge };

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/chat', async (req, res) => {
  const { message, sessionId, persona } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided.' });

  const personaObj = personas[persona] || bge;
  const session = getSession(sessionId || 'default');

  try {
    const reply = await handleMessage(message, session, personaObj);
    res.json({ reply, persona: personaObj.key });
  } catch (err) {
    console.error('[server] error:', err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('The Living Archive server running.');
  console.log(`Open http://localhost:${PORT} in your browser.`);
});