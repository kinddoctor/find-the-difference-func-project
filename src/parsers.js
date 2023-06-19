import yaml from 'js-yaml';

const parseFile = (file) => {
  if (file.extension === ('.yml' || '.yaml')) {
    return yaml.load(file.data);
  }
  if (file.extension === '.json') {
    return JSON.parse(file.data);
  }
  return console.log('Error! Unknown file extension!');
};

export default parseFile;
