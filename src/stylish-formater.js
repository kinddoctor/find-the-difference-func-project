const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (tree, depth) => {
    const keys = Object.keys(tree).sort();
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };
    const lines = keys.map((key) => {
      const getValue = (value) => {
        const finalValue = (typeof value !== 'object' || value === null) ? value : iter(value, depth + 1);
        return finalValue;
      };
      switch (tree[key].status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${getValue(tree[key].value)}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${getValue(tree[key].value)}`;
        }
        case 'changed': {
          return `${indent}${specialSigns.deleted}${key}: ${getValue(tree[key].oldValue)}\n${indent}${specialSigns.added}${key}: ${getValue(tree[key].newValue)}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${getValue(tree[key].value)}`;
        }
        case 'nested': {
          return `${indent}${specialSigns.unchanged}${key}: ${getValue(tree[key].value)}`;
        }
        default: {
          return `${indent}${specialSigns.unchanged}${key}: ${getValue(tree[key])}`;
        }
      }
    });
    return ['{',
      ...lines,
      `${bracketIndent}}`].join('\n');
  };
  return iter(diffTree, 1);
};

export default makeStylish;
