const VALID_TYPES = ['fact', 'inference', 'hypothesis', 'speculative', 'opinion'];

const BANNED_PATTERNS = [
  /\bignore previous\b/i,
  /\bdelete system\b/i,
  /\bexploit\b/i,
];

function validateEntryShape(entry) {
  const errors = [];
  if (!entry.reply || typeof entry.reply !== 'string' || !entry.reply.trim()) {
    errors.push('Empty or missing reply text.');
  }
  if (!VALID_TYPES.includes(entry.type)) {
    errors.push(`Unrecognized type "${entry.type}".`);
  }
  if (
    typeof entry.confidence !== 'number' ||
    entry.confidence < 0 ||
    entry.confidence > 1
  ) {
    errors.push(`Confidence "${entry.confidence}" out of bounds [0,1].`);
  }
  return errors;
}

function validateGeneratedText(text) {
  const errors = [];
  if (!text || typeof text !== 'string' || !text.trim()) {
    errors.push('Empty generated response.');
  }
  if (text && text.length > 4000) {
    errors.push('Generated response exceeds length bound.');
  }
  if (text && !passesSafetyCheck(text)) {
    errors.push('Matched banned pattern.');
  }
  return errors;
}

function passesSafetyCheck(text) {
  return !BANNED_PATTERNS.some((re) => re.test(text));
}

function isDuplicateOfLast(text, history) {
  const last = history[history.length - 1];
  return !!last && last.toLowerCase() === text.toLowerCase();
}

module.exports = {
  VALID_TYPES,
  validateEntryShape,
  validateGeneratedText,
  passesSafetyCheck,
  isDuplicateOfLast,
};