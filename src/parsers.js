import yaml from 'js-yaml';

const parseFile = (content, extension) => {
  if (extension === ('.yml' || '.yaml')) {
    return yaml.load(content);
  }
  if (extension === '.json') {
    return JSON.parse(content);
  }
  return console.log('Error! Unknown file extension!');
};

export default parseFile;
