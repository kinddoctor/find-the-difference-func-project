#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { union } from 'lodash/union';
import { path } from 'node:path';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const absoluteFilePath1 = path.resolve(filepath1);
    const absoluteFilePath2 = path.resolve(filepath2);
    const file1 = JSON.parse(readFileSync(absoluteFilePath1));
    const file2 = JSON.parse(readFileSync(absoluteFilePath2));
    const unionKeys = union(Object.keys(file1), Object.keys(file2));
    const sortedKeys = unionKeys.sort();
    const differenceOfFiles = sortedKeys.reduce((acc, key) => {
      if (!Object.hasOwn(file1, key)) {
        const newAcc = `${acc}\n  + ${key}: ${file2[key]}`;
        return newAcc;
      }
      if (!Object.hasOwn(file2, key)) {
        const newAcc = `${acc}\n  - ${key}: ${file1[key]}`;
        return newAcc;
      }
      if (file1[key] === file2[key]) {
        const newAcc = `${acc}\n    ${key}: ${file1[key]}`;
        return newAcc;
      }
      const newAcc = `${acc}\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      return newAcc;
    }, '{');
    console.log(`${differenceOfFiles}\n}`);
  });

program.parse();
