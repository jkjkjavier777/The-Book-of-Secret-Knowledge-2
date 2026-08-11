#!/usr/bin/env node
const readline = require('readline');
const path = require('path');
const express = require('express');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  console.log('========================================');
  console.log('   The-Book-of-Secret-Knowledge-2');
  console.log('========================================');
  console.log('1) The-Book-of-Secret-Knowledge');
  console.log('2) The BoundedGlitchEngine');
  console.log('3) Coding Assistant');
  console.log('========================================');

  rl.question('Select an option (1-3): ', (answer) => {
    handleChoice(answer.trim());
  });
}

function handleChoice(choice) {
  let interfaceModule;

  switch (choice) {
    case '1':
      interfaceModule = require(path.join(__dirname, 'interfaces', 'archive.js'));
      break;
    case '2':
      interfaceModule = require(path.join(__dirname, 'interfaces', 'browser.js'));
      break;
    case '3':
      interfaceModule = require(path.join(__dirname, 'interfaces', 'coding.js'));
      break;
    default:
      console.log('\nInvalid option. Please enter 1, 2, or 3.\n');
      return showMenu();
  }

  rl.close();
  startServer(interfaceModule);
}

function startServer({ name, htmlFile }) {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // index: false prevents Express from auto-serving index.html
  // for '/' before our explicit route below gets a chance to run
  app.use(express.static(path.join(__dirname, 'public'), { index: false }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', htmlFile));
  });

  app.listen(PORT, () => {
    console.log(`\n${name} running at http://localhost:${PORT}\n`);
  });
}

showMenu();