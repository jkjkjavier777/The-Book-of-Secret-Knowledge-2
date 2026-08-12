require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  repliesPath: 'data/replies.json',
  mistral: {
    apiKey: process.env.MISTRAL_API_KEY,
    model: process.env.MISTRAL_MODEL || 'mistral-large-latest',
    temperature: process.env.MISTRAL_TEMPERATURE ? parseFloat(process.env.MISTRAL_TEMPERATURE) : 0.7,
    maxTokens: process.env.MISTRAL_MAX_TOKENS ? parseInt(process.env.MISTRAL_MAX_TOKENS, 10) : 1000,
  },
};
