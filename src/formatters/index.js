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
    default:
      return makeStylish;
  }
};

export default chooseFormatter;
