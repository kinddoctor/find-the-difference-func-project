import makePlain from './plain.js';
import makeStylish from './stylish.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return makeStylish;
    case 'plain':
      return makePlain;
    default:
      return console.log('Unknown type of format!');
  }
};

export default chooseFormatter;
