import yaml from 'js-yaml';

const parseFile = (content, extension) => {
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    case '.json':
      return JSON.parse(content);
    default:
      return console.log('Error! Unknown file extension!');
  }
};

export default parseFile;
