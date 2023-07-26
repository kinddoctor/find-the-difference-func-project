import union from 'lodash/union.js';
import isPlainObject from 'lodash/isPlainObject.js';

const makeTree = (file1, file2) => {
  const inner = (obj1, obj2) => {
    const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();
    const result = keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj2, key)) {
        acc.push({ key, status: 'deleted', value: obj1[key] });
        return acc;
      }
      if (!Object.hasOwn(obj1, key)) {
        acc.push({ key, status: 'added', value: obj2[key] });
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc.push({ key, status: 'unchanged', value: obj1[key] });
        return acc;
      }
      if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
        const newObj1 = obj1[key];
        const newObj2 = obj2[key];
        const children = inner(newObj1, newObj2);
        acc.push({ key, status: 'nested', children });
        return acc;
      }
      acc.push({
        key, status: 'changed', oldValue: obj1[key], newValue: obj2[key],
      });
      return acc;
    }, []);
    return result;
  };
  return { key: 'root', status: 'nested', children: inner(file1, file2) };
};

export default makeTree;
