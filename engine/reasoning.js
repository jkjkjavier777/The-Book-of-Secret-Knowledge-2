const { complete } = require('./mistral');

async function reason(userInput, persona) {
  return complete(persona.systemPrompt, userInput);
}

module.exports = { reason };