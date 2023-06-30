const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (tree, depth) => {
    const keys = Object.keys(tree);
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };
    const lines = keys.map((key) => {
      switch (key.status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${key.value}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${key.value}`;
        }
        case 'changed': {
          return `${indent}${specialSigns.deleted}${key}: ${key.value.first}\n
          ${indent}${specialSigns.added}${key}: ${key.value.second}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${key.value}`;
        }
        case 'nested': {
          return `${indent}${specialSigns.unchanged}${key}: ${iter(key.value, depth + 1)}`;
        }
        default: {
          throw new Error(`Unknown status: ${key.status} in key ${key}`);
        }
      }
    });
    return ['{',
      ...lines,
      bracketIndent,
      '}'].join('\n');
  };
  return iter(diffTree, 1);
};

export default makeStylish;
