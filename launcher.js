#!/usr/bin/env node
const readline = require('readline');
const path = require('path');

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
  switch (choice) {
    case '1':
      rl.close();
      require(path.join(__dirname, 'interfaces', 'archive.js'));
      break;
    case '2':
      rl.close();
      require(path.join(__dirname, 'interfaces', 'browser.js'));
      break;
    case '3':
      rl.close();
      require(path.join(__dirname, 'interfaces', 'coding.js'));
      break;
    default:
      console.log('\nInvalid option. Please enter 1, 2, or 3.\n');
      showMenu();
  }
}

showMenu();