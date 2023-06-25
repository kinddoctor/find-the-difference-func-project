import union from 'lodash/union.js';

const makeTree = (file1, file2) => {
  const unionKeys = union(Object.keys(file1), Object.keys(file2));
  const findDiff = (obj1, obj2, keys) => {
    const result = keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj2, key)) {
        acc[key] = { status: 'deleted', value: obj1[key] };
        return acc;
      }
      if (!Object.hasOwn(obj1, key)) {
        acc[key] = { status: 'added', value: obj2[key] };
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc[key] = { status: 'unchanged', value: obj1[key] };
        return acc;
      }
      if (obj1[key] === 'null' || obj2[key] === 'null') {
        acc[key] = { status: 'changed', value1: obj1[key], value2: obj2[key] };
        return acc;
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const newObj1 = obj1[key];
        const newObj2 = obj2[key];
        console.log(`1111${JSON.stringify(newObj1)}222222${JSON.stringify(newObj2)}`);
        const keysOfNewObjs = union(Object.keys(newObj1), Object.keys(newObj2));
        console.log(`!!!!!!!!!!${keysOfNewObjs}`);
        const value = findDiff(newObj1, newObj2, keysOfNewObjs);
        acc[key] = { status: 'changed', value };
        return acc;
      }
      acc[key] = { status: 'changed', value1: obj1[key], value2: obj2[key] };
      return acc;
    }, {});
    return result;
  };
  return findDiff(file1, file2, unionKeys);
};

export default makeTree;
