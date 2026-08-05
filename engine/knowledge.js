const fs = require('fs');
const path = require('path');
const config = require('../config');

let cache = null;

function loadKnowledge(filePath = path.resolve(__dirname, '..', config.repliesPath)) {
  if (cache) return cache;
  const raw = fs.readFileSync(filePath, 'utf8');
  cache = JSON.parse(raw);
  return cache;
}

function saveKnowledge(data, filePath = path.resolve(__dirname, '..', config.repliesPath)) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  cache = data;
}

module.exports = { loadKnowledge, saveKnowledge };