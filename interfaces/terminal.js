#!/usr/bin/env node

/**
 * Terminal Interface for BoSK (Book of Secret Knowledge)
 * Runs in Termux, uses stdin/stdout for interaction
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Load shared engine modules (stubs for now — will be filled in)
const Engine = require('../engine/boundedGlitchEngine');
const Bosk = require('../engine/personas/bosk');

class TerminalInterface {
  constructor() {
    this.engine = new Engine('bosk');
    this.persona = new Bosk(this.engine);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '⊞ BoSK > '
    });
  }

  start() {
    console.clear();
    console.log('\n🔷 Book of Secret Knowledge');
    console.log('━'.repeat(40));
    console.log('Archive Mode');
    console.log('Type "help" for commands\n');

    this.rl.prompt();

    this.rl.on('line', (input) => {
      this.handleInput(input.trim());
      this.rl.prompt();
    });

    this.rl.on('close', () => {
      console.log('\n⊗ Archive closed.\n');
      process.exit(0);
    });
  }

  async handleInput(input) {
    if (!input) {
      return;
    }

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      this.rl.close();
      return;
    }

    if (input.toLowerCase() === 'help') {
      this.showHelp();
      return;
    }

    if (input.toLowerCase() === 'clear') {
      console.clear();
      console.log('🔷 Book of Secret Knowledge (cleared)\n');
      return;
    }

    // Pass to persona for processing
    try {
      const response = await this.persona.respond(input);
      console.log('\n📖 ' + response + '\n');
    } catch (err) {
      console.log('\n⚠ Error: ' + err.message + '\n');
    }
  }

  showHelp() {
    console.log(`
Commands:
  help       — show this menu
  clear      — clear screen
  exit/quit  — close the archive

Examples:
  "what is superposition?"
  "explain entanglement"
  "tell me about Bell states"
    `);
  }
}

const app = new TerminalInterface();
app.start();