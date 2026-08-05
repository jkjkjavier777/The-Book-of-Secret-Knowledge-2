const { Mistral } = require('@mistralai/mistralai');
const config = require('../config');

let client = null;
function getClient() {
  if (!config.mistral.apiKey) {
    throw new Error('MISTRAL_API_KEY is not set. Add it to .env.');
  }
  if (!client) client = new Mistral({ apiKey: config.mistral.apiKey });
  return client;
}

async function complete(systemPrompt, userInput) {
  const response = await getClient().chat.complete({
    model: config.mistral.model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ],
    temperature: config.mistral.temperature,
    maxTokens: config.mistral.maxTokens,
  });
  return response.choices[0].message.content;
}

module.exports = { complete };