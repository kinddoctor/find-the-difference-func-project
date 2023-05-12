#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((fileName, fileName2) => {
    const result = genDiff(fileName, fileName2);
    console.log(`${result}`);
  });

program.parse();
