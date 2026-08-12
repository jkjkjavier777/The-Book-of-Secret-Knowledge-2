module.exports = {
  key: 'coding',
  name: 'Coding Assistant',
  get banner() {
    return [
      '🧠 Coding Assistant',
      '',
      'Ask for explanations, debugging help, or code.',
      '',
    ].join('\n');
  },
  systemPrompt: 'You are a coding assistant. Give clear, correct, concise help with code — ' +
    'explanations, debugging, or writing code as requested. Use code blocks for code.',
  silentPrefix: null,
  reasoningLabel: 'coding response',
  unavailableMessage: 'The coding assistant backend is unavailable right now.',
};
