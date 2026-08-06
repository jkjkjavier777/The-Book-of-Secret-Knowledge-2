const fs = require('fs');
const path = require('path');

let cache = null;

function loadVoice(filePath = path.resolve(__dirname, '..', 'data', 'voice.json')) {
  if (cache) return cache;
  cache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return cache;
}

function pickLine(personaKey, category) {
  const voice = loadVoice();
  const pool = voice[personaKey] && voice[personaKey][category];
  if (!pool || !pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickShared(category) {
  const voice = loadVoice();
  const pool = voice.shared && voice.shared[category];
  if (!pool || !pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { pickLine, pickShared };