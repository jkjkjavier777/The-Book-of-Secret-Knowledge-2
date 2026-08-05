function formatByType(entry) {
  const { reply, type, confidence = 1.0 } = entry;
  switch (type) {
    case 'fact': return reply;
    case 'inference': return `The available evidence suggests: ${reply}`;
    case 'hypothesis': return `One possible explanation is: ${reply}`;
    case 'speculative':
      if (confidence >= 0.75) return `This is a plausible possibility: ${reply}`;
      if (confidence >= 0.5) return `I'm not certain, but one possibility is: ${reply}`;
      return `This is exploratory rather than established: ${reply}`;
    case 'opinion': return `My view: ${reply}`;
    default: return reply;
  }
}

function formatGenerated(text, persona) {
  return `${text.trim()}\n\n— ${persona.reasoningLabel}`;
}

module.exports = { formatByType, formatGenerated };