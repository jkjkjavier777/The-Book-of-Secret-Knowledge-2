#!/usr/bin/env node
require('dotenv').config();
const readline = require('readline');
const path = require('path');

const options = {
  '1': { label: 'The-Book-of-Secret-Knowledge', file: './interfaces/archive.js' },
  '2': { label: 'The BoundedGlitchEngine', file: './interfaces/browser.js' },
  '3': { label: 'Coding Assistant', file: './interfaces/coding.js' },
};

function printMenu() {
  console.log('\n=== Launcher ===');
  Object.entries(options).forEach(([key, opt]) => {
    console.log(`${key}) ${opt.label}`);
  });
  console.log('================');
}

function prompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Choose an option (1-3): ', (answer) => {
    const choice = options[answer.trim()];
    rl.close();

    if (!choice) {
      console.log('Invalid choice, try again.');
      printMenu();
      return prompt();
    }

    console.log(`Loading ${choice.label}...`);
    const modulePath = path.resolve(__dirname, choice.file);
    require(modulePath);
  });
}

printMenu();
prompt();