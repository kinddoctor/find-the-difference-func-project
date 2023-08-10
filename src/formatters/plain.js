import flattenDeep from 'lodash/flattenDeep.js';
import isPlainObject from 'lodash/isPlainObject.js';

const stringify = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const findPath = (currentKey, pathBeforeKey) => ((pathBeforeKey === '') ? `${currentKey}` : `${pathBeforeKey}.${currentKey}`);

const makePlain = (diffTree) => {
  const inner = (children, path) => {
    const result = children.filter(({ status }) => status !== 'unchanged')
      .map((child) => {
        const { key, status } = child;
        const keypath = findPath(key, path);
        switch (status) {
          case 'added': {
            const value = stringify(child.value);
            return `Property '${keypath}' was added with value: ${value}`;
          }
          case 'deleted': {
            return `Property '${keypath}' was removed`;
          }
          case 'changed': {
            const oldValue = stringify(child.oldValue);
            const newValue = stringify(child.newValue);
            return `Property '${keypath}' was updated. From ${oldValue} to ${newValue}`;
          }
          case 'nested': {
            return inner(child.children, keypath);
          }
          default:
            throw new Error(`Unknown status: ${status} in ${key}!`);
        }
      });
    return flattenDeep(result).join('\n');
  };
  const { children } = diffTree;
  return inner(children, '');
};

export default makePlain;
