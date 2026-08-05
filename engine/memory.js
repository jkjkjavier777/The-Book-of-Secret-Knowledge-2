const sessions = new Map();

function getSession(sessionId) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, { history: [] });
  return sessions.get(sessionId);
}

module.exports = { getSession };