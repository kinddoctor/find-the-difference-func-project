import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const readFile = (filename) => {
  const absoluteFilePath = path.resolve(filename);
  const data = readFileSync(absoluteFilePath);
  const extension = path.extname(absoluteFilePath);
  return { data, extension };
};

const parseFile = (filename) => {
  const file = readFile(filename);
  if (file.extension === ('.yml' || '.yaml')) {
    return yaml.load(file.data);
  }
  if (file.extension === '.json') {
    return JSON.parse(file.data);
  }
  return console.log('Error! Unknown file extension!');
};

export default parseFile;
