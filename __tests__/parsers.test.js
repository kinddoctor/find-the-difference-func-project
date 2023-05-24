import parseFile from '../src/parsers.js';

let fileJSON;
let fileYAML;

beforeEach(() => {
  fileJSON = parseFile('../__fixtures__/file1.json');
  fileYAML = parseFile('../__fixtures__/file1.yml');
});

test('parseFileIntoJSValue', () => {
  expect(typeof fileJSON).toEqual('object');
  expect(Object.keys(fileJSON).length > 0).toBeTruthy();
  expect(typeof fileYAML).toEqual('object');
  expect(Object.keys(fileYAML).length > 0).toBeTruthy();
});
