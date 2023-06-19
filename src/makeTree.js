import union from 'lodash/union.js';

const makeTree = (file1, file2) => {
  const unionKeys = union(Object.keys(file1), Object.keys(file2));
  const findDiff = (obj1, obj2, keys) => {
    const result = keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj2, key)) {
        const newAcc = { ...acc, key: { status: 'deleted', value: obj1[key] } };
        return newAcc;
      }
      if (!Object.hasOwn(obj1, key)) {
        const newAcc = { ...acc, key: { status: 'added', value: obj2[key] } };
        return newAcc;
      }
      if (obj1[key] === obj2[key]) {
        const newAcc = { ...acc, key: { status: 'unchanged', value: obj1[key] } };
        return newAcc;
      }
      if (obj1[key] === 'null' || obj2[key] === 'null') {
        const newAcc = { ...acc, key: { status: 'changed', value1: obj1[key], value2: obj2[key] } };
        return newAcc;
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const newObj1 = obj1[key];
        const newObj2 = obj2[key];
        const keysOfNewObjs = union(Object.keys(newObj1), Object.keys(newObj2));
        const value = findDiff(newObj1, newObj2, keysOfNewObjs);
        const newAcc = { ...acc, key: { status: 'changed', value } };
        return newAcc;
      }
      const newAcc = { ...acc, key: { status: 'changed', value1: obj1[key], value2: obj2[key] } };
      return newAcc;
    }, {});
    return result;
  };
  return findDiff(file1, file2, unionKeys);
};

export default makeTree;
