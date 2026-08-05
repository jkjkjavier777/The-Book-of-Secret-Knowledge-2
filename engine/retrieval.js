const { loadKnowledge, saveKnowledge } = require('./knowledge');

function findMatch(userInput) {
  const replies = loadKnowledge();
  const input = userInput.toLowerCase().trim();

  if (replies[input]) return synthesize(input, replies[input]);

  for (const phrase of Object.keys(replies)) {
    if (input.includes(phrase.toLowerCase()) || phrase.toLowerCase().includes(input)) {
      return synthesize(phrase, replies[phrase]);
    }
  }
  return null;
}

function synthesize(phrase, answers) {
  const options = Array.isArray(answers) ? answers : [answers];
  const reply = options[Math.floor(Math.random() * options.length)];
  return { id: phrase, reply, type: 'fact', confidence: 1.0 };
}

function teach(phrase, answer) {
  const replies = loadKnowledge();
  const key = phrase.trim().toLowerCase();
  if (!replies[key]) replies[key] = [];
  replies[key].push(answer);
  saveKnowledge(replies);
  return replies[key].length;
}

module.exports = { findMatch, teach };