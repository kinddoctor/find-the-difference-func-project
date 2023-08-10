import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return makePlain;
    case 'json':
      return makeJson;
    case 'stylish':
      return makeStylish;
    default:
      throw new Error(`Unknown type of format - ${format}!`);
  }
};

export default chooseFormatter;
