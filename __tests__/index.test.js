import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFile from '../src/parsers.js';
import makeTree from '../src/makeTree.js';
import genDiff from '../src/index.js';
import diff from '../__fixtures__/expectedDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getContent = (file) => readFileSync(getFixturePath(file), 'utf-8');

const file1 = parseFile(getContent('file1.yml'), path.extname('file1.yml'));
const file2 = parseFile(getContent('file2.yml'), path.extname('file2.yml'));
const expectedDiff = diff;
const filepathYML1 = getFixturePath('file1.yml');
const filepathYML2 = getFixturePath('file2.yml');
const filepathJSON1 = getFixturePath('file1.json');
const filepathJSON2 = getFixturePath('file2.json');
const expectedPlain = getContent('expectedPlain.txt');
const expectedStylish = getContent('expectedStylish.txt');
const expectedJson = getContent('expectedJson.json');

test('diff', () => expect(makeTree(file1, file2)).toEqual(expectedDiff));

test('diff with default formatter', () => expect(genDiff(filepathYML1, filepathJSON2)).toEqual(expectedStylish));

test.each([
  {
    firstFile: filepathYML1, secondFile: filepathYML2, formatter: 'stylish', expected: expectedStylish,
  },
  {
    firstFile: filepathJSON1, secondFile: filepathJSON2, formatter: 'plain', expected: expectedPlain,
  },
  {
    firstFile: filepathJSON1, secondFile: filepathJSON2, formatter: 'json', expected: expectedJson,
  },
])('genDiff with ($formatter) formatter', ({
  firstFile, secondFile, formatter, expected,
}) => {
  expect(genDiff(firstFile, secondFile, formatter)).toBe(expected);
});
