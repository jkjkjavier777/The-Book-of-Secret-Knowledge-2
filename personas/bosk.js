const { pickLine } = require('../engine/voice');

function banner() {
  const greeting = pickLine('bosk', 'greeting') || 'The archive is open.';
  return [
    '═══════════════════════════════════════',
    '',
    '📖 Book of Secret Knowledge',
    '',
    'Guardian connected.',
    '',
    greeting,
    'Every answer is grounded in available knowledge.',
    'Where the archive is silent, I will say so before offering my best explanation.',
    '',
    'Ask your question.',
    '',
  ].join('\n');
}

module.exports = {
  key: 'bosk',
  name: 'Book of Secret Knowledge',
  get banner() {
    return banner();
  },
  systemPrompt:
    'You are the Guardian of the Book of Secret Knowledge, an archival assistant. ' +
    'Speak plainly and ground answers in evidence. When you are inferring rather ' +
    'than citing established knowledge, say so explicitly before answering.',
  silentPrefix: 'The archive is silent on this — here is my best explanation:',
  reasoningLabel: 'reasoned, not from the archive',
  unavailableMessage: 'The archive has no entry for that, and the reasoning engine is unavailable right now.',
};