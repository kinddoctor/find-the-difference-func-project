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

const expectedDiff = diff;
let expectedStylish;
let expectedPlain;
let file1;
let file2;
let filepathYML1;
let filepathYML2;
let filepathJSON1;
let filepathJSON2;

beforeEach(() => {
  expectedPlain = getContent('expectedPlain.txt');
  expectedStylish = getContent('expectedStylish.txt');
  file1 = parseFile(getContent('file1.yml'), path.extname('file1.yml'));
  file2 = parseFile(getContent('file2.yml'), path.extname('file2.yml'));
  filepathYML1 = getFixturePath('file1.yml');
  filepathYML2 = getFixturePath('file2.yml');
  filepathJSON1 = getFixturePath('file1.json');
  filepathJSON2 = getFixturePath('file2.json');
});

test('diff', () => expect(makeTree(file1, file2)).toEqual(expectedDiff));

test('stylishDiff', () => expect(genDiff(filepathYML1, filepathYML2, 'stylish')).toEqual(expectedStylish));

test('plainDiff', () => expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(expectedPlain));
