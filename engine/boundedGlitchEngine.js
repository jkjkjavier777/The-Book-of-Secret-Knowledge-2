const { findMatch } = require('./retrieval');
const validator = require('./validator');
const { formatByType, formatGenerated } = require('./formatter');
const { reason } = require('./reasoning');
const { pickLine, pickShared } = require('./voice');

async function handleMessage(userInput, session, persona) {
  if (!session.history) session.history = [];

  if (validator.isRedZoneQuery(userInput)) {
    const refusal = pickShared('redZone') ||
      "I'm sorry, I can't help with that request.";
    session.history.push(refusal);
    return refusal;
  }

  if (userInput.trim().toLowerCase() === 'help') {
    const line = pickLine(persona.key, 'help') || 'Ask a question.';
    session.history.push(line);
    return line;
  }

  const match = findMatch(userInput);

  if (match) {
    const shapeErrors = validator.validateEntryShape(match);
    if (shapeErrors.length || !validator.passesSafetyCheck(match.reply) ||
        validator.isDuplicateOfLast(match.reply, session.history)) {
      return pickShared('fallback') || "I couldn't verify that response.";
    }
    const output = formatByType(match);
    session.history.push(output);
    return output;
  }

  let generated;
  try {
    generated = await reason(userInput, persona);
  } catch (err) {
    console.error('[engine] reasoning failed:', err.message);
    return persona.unavailableMessage || pickShared('error');
  }

  const genErrors = validator.validateGeneratedText(generated);
  if (genErrors.length) {
    return pickShared('fallback') || "I couldn't verify that response.";
  }

  const intro = pickLine(persona.key, 'unknown');
  const body = formatGenerated(generated, persona);
  const output = intro ? `${intro}\n\n${body}` : body;

  session.history.push(output);
  return output;
}

module.exports = { handleMessage };
