import yaml from 'js-yaml';

const parseFile = (content, extension) => {
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unknown file extension - ${extension}!`);
  }
};

export default parseFile;
