import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('expected_file.txt'), 'utf-8');
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

test('genDiff', () => {
  expect(gendiff(file1, file2)).toEqual(expectedResult);
});
