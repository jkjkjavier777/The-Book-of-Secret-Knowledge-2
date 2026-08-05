const { findMatch } = require('./retrieval');
const validator = require('./validator');
const { formatByType, formatGenerated } = require('./formatter');
const { reason } = require('./reasoning');

const FALLBACK_MESSAGE = "I couldn't verify that response.";

async function handleMessage(userInput, session, persona) {
  const match = findMatch(userInput);

  if (match) {
    const shapeErrors = validator.validateEntryShape(match);
    if (shapeErrors.length) return FALLBACK_MESSAGE;
    if (!validator.passesSafetyCheck(match.reply)) return FALLBACK_MESSAGE;
    if (validator.isDuplicateOfLast(match.reply, session.history)) return FALLBACK_MESSAGE;

    const output = formatByType(match);
    session.history.push(output);
    return output;
  }

  let generated;
  try {
    generated = await reason(userInput, persona);
  } catch (err) {
    console.error('[engine] reasoning failed:', err.message);
    return persona.unavailableMessage;
  }

  const genErrors = validator.validateGeneratedText(generated);
  if (genErrors.length) return FALLBACK_MESSAGE;

  const body = formatGenerated(generated, persona);
  const output = persona.silentPrefix ? `${persona.silentPrefix}\n\n${body}` : body;

  session.history.push(output);
  return output;
}

module.exports = { handleMessage };