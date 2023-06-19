import { readFileSync } from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import makeTree from './makeTree.js';
import makeStylish from './stylish-formater.js';
import makePlainDiff from './gendiffOldPlainVersion.js';

const readFile = (filename) => {
  const absoluteFilePath = path.resolve(filename);
  const data = readFileSync(absoluteFilePath);
  const extension = path.extname(absoluteFilePath);
  return { data, extension };
};

const genDiff = (fileName1, fileName2, format) => {
  const file1 = parseFile(readFile(fileName1));
  const file2 = parseFile(readFile(fileName2));
  const tree = makeTree(file1, file2);
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    default:
      return makePlainDiff(tree);
  }
};

export default genDiff;
