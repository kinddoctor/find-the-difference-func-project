#!/usr/bin/env node

import { Command } from 'commander';
import makeTree from '../src/makeTree.js';
import makeStylish from '../src/stylish-formater.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((fileName, fileName2) => {
    const result = makeTree(fileName, fileName2);
    const options = program.opts();
    if (options.format === 'stylish') {
      console.log(`${makeStylish(result)}`);
    }
  });

program.parse();
