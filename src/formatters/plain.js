import flattenDeep from 'lodash/flattenDeep.js';

const getValue = (value) => ((typeof value !== 'object' || value === null) ? value : '[complex value]');

const getLine = (obj, key, objpath) => {
  const keypath = `${objpath}${key}`;
  switch (obj[key].status) {
    case 'added': {
      const value = getValue(obj[key].value);
      return `Property ${keypath} was added with value: ${value}`;
    }
    case 'deleted': {
      return `Property ${keypath} was deleted`;
    }
    case 'changed': {
      const oldValue = getValue(obj[key].oldValue);
      const newValue = getValue(obj[key].newValue);
      return `Property ${keypath} was updated. From ${oldValue} to ${newValue}`;
    }
    default:
      throw new Error(`Unknown status: ${obj[key].status} in ${obj[key]}!`);
  }
};

const makePlain = (diffTree) => {
  const currentObj = diffTree;
  const currentKeys = Object.keys(diffTree).sort();
  const currentObjpath = '';
  const inner = (obj, keys, objpath) => {
    console.log(`1111!!!!${keys}`);
    const result = keys.map((key) => {
      console.log(`!!!!!!!!!!!${key}`);
      console.log(`2222222${obj[key].status}`);
      if (obj[key].status !== 'nested') {
        return getLine(obj, key, objpath);
      }
      const newObj = obj[key];
      const newKeys = Object.keys(obj[key].value).sort();
      const newObjpath = `${objpath}.${key}`;
      return inner(newObj, newKeys, newObjpath);
    });
    return flattenDeep(result).join('\n');
  };
  return inner(currentObj, currentKeys, currentObjpath);
};

export default makePlain;
