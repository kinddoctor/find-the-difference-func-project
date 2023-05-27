import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import parseFile from '../src/parsers.js';

let fileJSON;
let fileYAML;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

beforeEach(() => {
  fileJSON = parseFile(path.join(__dirname, '../__fixtures__/file1.json'));
  fileYAML = parseFile(path.join(__dirname, '../__fixtures__/file1.yml'));
});

test('parseFileIntoJSValue', () => {
  expect(typeof fileJSON).toEqual('object');
  expect(Object.keys(fileJSON).length > 0).toBeTruthy();
  expect(typeof fileYAML).toEqual('object');
  expect(Object.keys(fileYAML).length > 0).toBeTruthy();
});
