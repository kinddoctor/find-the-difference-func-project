import { readFileSync } from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import makeTree from './makeTree.js';
import makeStylish from './stylish-formater.js';

const getAbsolutePath = (file) => path.resolve(file);
const getExtension = (file) => path.extname(file);

export const getDataFromFile = (file) => {
  const content = readFileSync(getAbsolutePath(file));
  const extension = getExtension(file);
  return parseFile(content, extension);
};

const genDiff = (file1, file2, format) => {
  const data1 = getDataFromFile(file1);
  const data2 = getDataFromFile(file2);
  const tree = makeTree(data1, data2);
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    default:
      return console.log('Unknown type of format!');
  }
};

export default genDiff;
