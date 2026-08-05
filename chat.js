const readline = require('readline');
const { handleMessage } = require('./engine/boundedGlitchEngine');
const bosk = require('./personas/bosk');
const bge = require('./personas/bge');

const TITLE = [
  '═══════════════════════════════════════════════',
  '',
  '            THE LIVING ARCHIVE',
  '',
  '═══════════════════════════════════════════════',
  '',
  'Two interfaces are available.',
  '',
  '[1] 📖 Book of Secret Knowledge',
  '    Archive • Retrieval • Reflection',
  '',
  '[2] 🌌 Bounded Glitch Engine',
  '    Reasoning • Validation • Exploration',
  '',
  'Both use the same underlying engine.',
  '',
  'Select an interface.',
  '',
].join('\n');

console.log(TITLE);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
rl.prompt();

rl.once('line', (line) => {
  const choice = line.trim();
  const persona = choice === '1' ? bosk : choice === '2' ? bge : null;

  if (!persona) {
    console.log('Not recognized. Restart and choose 1 or 2.');
    rl.close();
    return;
  }

  console.log('\n' + persona.banner);
  const session = { history: [] };
  rl.prompt();

  rl.on('line', async (input) => {
    const text = input.trim();
    if (!text) { rl.prompt(); return; }
    if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'quit') {
      console.log('Closing. Bye.');
      rl.close();
      return;
    }
    try {
      const reply = await handleMessage(text, session, persona);
      console.log(reply + '\n');
    } catch (err) {
      console.error('Error:', err.message);
    }
    rl.prompt();
  });
});

rl.on('close', () => process.exit(0));