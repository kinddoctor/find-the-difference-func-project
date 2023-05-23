import parseFile from '../src/parsers.js';

beforeEach(() => {
  fileJSON = parseFile('../__fixtures__/file1.json');
  fileYAML = parseFile('../__fixtures__/file1.yaml');
});

test('parseFileIntoJSValue', () => {
  expect(typeof fileJSON).toEqual('object');
  expect(Object.keys(fileJSON).length > 0).toBeTruthy();
  expect(typeof fileYAML).toEqual('object');
  expect(Object.keys(fileYAML).length > 0).toBeTruthy();
});