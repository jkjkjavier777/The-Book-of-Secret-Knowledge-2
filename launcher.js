const readline = require('readline');
const path = require('path');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ports = { '1': 3001, '2': 3002, '3': 3003 };

function showMenu() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║          THE LIVING ARCHIVE           ║');
  console.log('╚══════════════════════════════════════╝\n');

  console.log('Choose your interface:\n');
  console.log('  [1] Book of Secret Knowledge (BoSK)');
  console.log('      → Archive UI, http://localhost:3001\n');
  console.log('  [2] BoundedGlitchEngine (BGE)');
  console.log('      → Study Desk, http://localhost:3002\n');
  console.log('  [3] Coding Assistant');
  console.log('      → Quantum Chatbot, http://localhost:3003\n');

  rl.question('Enter choice (1, 2, or 3): ', (answer) => {
    rl.close();
    handleChoice(answer.trim());
  });
}

function handleChoice(choice) {
  let interfaceFile;
  let interfaceName;

  if (choice === '1') {
    interfaceFile = path.join(__dirname, 'interfaces/archive.js');
    interfaceName = 'Book of Secret Knowledge (BoSK)';
  } else if (choice === '2') {
    interfaceFile = path.join(__dirname, 'interfaces/browser.js');
    interfaceName = 'BoundedGlitchEngine (BGE)';
  } else if (choice === '3') {
    interfaceFile = path.join(__dirname, 'interfaces/coding.js');
    interfaceName = 'Coding Assistant';
  } else {
    console.log('\n✗ Invalid choice. Please enter 1, 2, or 3.\n');
    const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl2.question('Enter choice (1, 2, or 3): ', (answer) => {
      rl2.close();
      handleChoice(answer.trim());
    });
    return;
  }

  console.log(`\n→ Starting ${interfaceName} at http://localhost:${ports[choice]}\n`);

  const child = spawn('node', [interfaceFile], {
    stdio: 'inherit',
    cwd: __dirname
  });

  process.on('SIGINT', () => {
    child.kill('SIGKILL');
    process.exit(0);
  });

  child.on('error', (err) => {
    console.error(`✗ Error starting interface: ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`✗ Interface exited with code ${code}`);
    }
    process.exit(code);
  });
}

showMenu();