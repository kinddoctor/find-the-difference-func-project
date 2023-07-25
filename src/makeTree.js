import union from 'lodash/union.js';

const makeTree = (file1, file2) => {
  const inner = (obj1, obj2) => {
    const keys = union(Object.keys(obj1), Object.keys(obj2));
    console.log(`!!!!111!!!${keys}`);
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
      if (obj1[key] === 'null' || obj2[key] === 'null') {
        acc.push({
          key, status: 'changed', oldValue: obj1[key], newValue: obj2[key],
        });
        return acc;
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const newObj1 = obj1[key];
        const newObj2 = obj2[key];
        const children = inner(newObj1, newObj2);
        acc.push({ key, status: 'nested', children });
        return acc;
      }
      acc[key] = { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
      return acc;
    }, []);
    return result;
  };
  return { key: 'root', status: 'nested', children: inner(file1, file2) };
};

export default makeTree;
