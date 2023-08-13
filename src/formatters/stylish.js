import isPlainObject from 'lodash/isPlainObject.js';

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const makeBracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - spaceCount);
const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };

const stringify = (currentValue, depth) => {
  if (!isPlainObject(currentValue)) {
    return currentValue;
  }
  const newDepth = depth + 1;
  const indent = makeIndent(newDepth);
  const bracketIndent = makeBracketIndent(newDepth);
  const obj = currentValue;
  const keys = Object.keys(obj)
    .map((key) => {
      const value = stringify(obj[key], newDepth);
      return `${indent}  ${key}: ${value}`;
    });
  return ['{',
    ...keys,
    `${bracketIndent}}`].join('\n');
};

const makeStylish = (diffTree) => {
  const iter = (children, depth) => {
    const indent = makeIndent(depth);
    const bracketIndent = makeBracketIndent(depth);
    const lines = children.map((child) => {
      const { key, status } = child;
      switch (status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${stringify(child.value, depth)}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${stringify(child.value, depth)}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${stringify(child.value, depth)}`;
        }
        case 'changed': {
          return `${indent}${specialSigns.deleted}${key}: ${stringify(child.oldValue, depth)}\n${indent}${specialSigns.added}${key}: ${stringify(child.newValue, depth)}`;
        }
        case 'nested': {
          return `${indent}${specialSigns.unchanged}${key}: ${iter(child.children, depth + 1)}`;
        }
        default: {
          throw new Error(`Unknown type of status - ${status}!`);
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
