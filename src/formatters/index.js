import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return makeStylish;
    case 'plain':
      return makePlain;
    case 'json':
      return makeJson;
    default:
      return console.log('Unknown type of format!');
  }
};

export default chooseFormatter;
