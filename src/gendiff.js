import union from 'lodash/union.js';
import parseFile from './parsers.js';

const genDiff = (fileName1, fileName2) => {
  const file1 = parseFile(fileName1);
  const file2 = parseFile(fileName2);
  const unionKeys = union(Object.keys(file1), Object.keys(file2));
  const sortedUnionKeys = unionKeys.sort();
  const differenceInFiles = sortedUnionKeys.reduce((acc, key) => {
    const deletedLine = `  - ${key}: ${file1[key]}`;
    const addedLine = `  + ${key}: ${file2[key]}`;
    const unchangedLine = `    ${key}: ${file1[key]}`;
    if (!Object.hasOwn(file1, key)) {
      const newAcc = `${acc}\n${addedLine}`;
      return newAcc;
    }
    if (!Object.hasOwn(file2, key)) {
      const newAcc = `${acc}\n${deletedLine}`;
      return newAcc;
    }
    if (file1[key] === file2[key]) {
      const newAcc = `${acc}\n${unchangedLine}`;
      return newAcc;
    }
    const newAcc = `${acc}\n${deletedLine}\n${addedLine}`;
    return newAcc;
  }, '{');
  return `${differenceInFiles}\n}`;
};

export default genDiff;
