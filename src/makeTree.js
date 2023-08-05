import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';
import isPlainObject from 'lodash/isPlainObject.js';

const makeTree = (file1, file2) => {
  const inner = (obj1, obj2) => {
    const keys = sortBy(union(Object.keys(obj1), Object.keys(obj2)));
    const result = keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj2, key)) {
        const newAcc = [...acc, { key, status: 'deleted', value: obj1[key] }];
        return newAcc;
      }
      if (!Object.hasOwn(obj1, key)) {
        const newAcc = [...acc, { key, status: 'added', value: obj2[key] }];
        return newAcc;
      }
      if (obj1[key] === obj2[key]) {
        const newAcc = [...acc, { key, status: 'unchanged', value: obj1[key] }];
        return newAcc;
      }
      if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
        const newObj1 = obj1[key];
        const newObj2 = obj2[key];
        const children = inner(newObj1, newObj2);
        const newAcc = [...acc, { key, status: 'nested', children }];
        return newAcc;
      }
      const newAcc = [...acc, {
        key, status: 'changed', oldValue: obj1[key], newValue: obj2[key],
      }];
      return newAcc;
    }, []);
    return result;
  };
  return { key: 'root', status: 'nested', children: inner(file1, file2) };
};

export default makeTree;
