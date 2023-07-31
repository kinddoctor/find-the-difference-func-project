import { readFileSync } from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(file);
const getExtension = (file) => path.extname(file);
const getContent = (file) => readFileSync(getAbsolutePath(file));

const genDiff = (file1, file2, format) => {
  const data1 = parseFile(getContent(file1), getExtension(file1));
  const data2 = parseFile(getContent(file2), getExtension(file2));
  const tree = makeTree(data1, data2);
  const currentFormatter = chooseFormatter(format);
  return currentFormatter(tree);
};

export default genDiff;
