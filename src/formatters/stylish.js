import isPlainObject from 'lodash/isPlainObject.js';

const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (children, depth) => {
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };

    const getValue = (currentValue) => {
      if (!isPlainObject(currentValue)) {
        return currentValue;
      }
      const obj = currentValue;
      const keys = Object.keys(obj)
        .map((key) => {
          const value = obj[key];
          return { key, value };
        });
      return iter(keys, depth + 1);
    };

    const lines = children.map((child) => {
      const { key, status } = child;
      switch (status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${getValue(child.value)}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${getValue(child.value)}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${getValue(child.value)}`;
        }
        case 'changed': {
          return `${indent}${specialSigns.deleted}${key}: ${getValue(child.oldValue)}\n${indent}${specialSigns.added}${key}: ${getValue(child.newValue)}`;
        }
        case 'nested': {
          return `${indent}${specialSigns.unchanged}${key}: ${iter(child.children, depth + 1)}`;
        }
        default: {
          return `${indent}${specialSigns.unchanged}${key}: ${getValue(child.value)}`;
        }
      }
    });
    return ['{',
      ...lines,
      `${bracketIndent}}`].join('\n');
  };
  const { children } = diffTree;
  return iter(children, 1);
};

export default makeStylish;
