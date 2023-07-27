import flattenDeep from 'lodash/flattenDeep.js';
import isPlainObject from 'lodash/isPlainObject.js';

const getValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (diffTree) => {
  const inner = (children, path) => {
    const result = children.filter(({ status }) => status !== 'unchanged')
      .map((child) => {
        const { key, status } = child;
        const keypath = (path === '') ? `${key}` : `${path}.${key}`;
        switch (status) {
          case 'added': {
            const value = getValue(child.value);
            return `Property '${keypath}' was added with value: ${value}`;
          }
          case 'deleted': {
            return `Property '${keypath}' was removed`;
          }
          case 'changed': {
            const oldValue = getValue(child.oldValue);
            const newValue = getValue(child.newValue);
            return `Property '${keypath}' was updated. From ${oldValue} to ${newValue}`;
          }
          case 'nested': {
            const newChildren = child.children;
            const newPath = keypath;
            return inner(newChildren, newPath);
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
