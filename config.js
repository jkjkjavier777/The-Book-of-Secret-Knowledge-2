require('dotenv').config();

module.exports = {
  mistral: {
    apiKey: process.env.MISTRAL_API_KEY,
    model: process.env.MISTRAL_MODEL || 'mistral-medium-latest',
    temperature: 0.6,
    maxTokens: 1000,
  },
  repliesPath: process.env.REPLIES_PATH || './data/replies.json',
};