import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import makeTree from '../src/makeTree.js';
import makeStylish from '../src/stylish-formater.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedResult;
let filepath1;
let filepath2;

beforeEach(() => {
  expectedResult = readFileSync(getFixturePath('expectedNestedDiff.txt'), 'utf-8');
  filepath1 = getFixturePath('file1.yml');
  filepath2 = getFixturePath('file2.yml');
});

test('makeTree', () => {
  expect(makeStylish(makeTree(filepath1, filepath2))).toEqual(expectedResult);
});
