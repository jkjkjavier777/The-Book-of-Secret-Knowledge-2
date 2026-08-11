#!/usr/bin/env node
require('dotenv').config();
const inquirer = require('inquirer');

async function main() {
  console.clear();
  console.log('=== Main Menu ===\n');

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Select an option:',
      choices: [
        { name: '1) The Book of Secret Knowledge', value: 'archive' },
        { name: '2) The Bounded Glitch Engine', value: 'browser' },
        { name: '3) Coding Assistant', value: 'coding' }
      ]
    }
  ]);

  switch (choice) {
    case 'archive':
      require('./interfaces/archive.js');
      break;
    case 'browser':
      require('./interfaces/browser.js');
      break;
    case 'coding':
      require('./interfaces/coding.js');
      break;
  }
}

main().catch((err) => {
  console.error('Launcher failed to start:', err);
  process.exit(1);
});