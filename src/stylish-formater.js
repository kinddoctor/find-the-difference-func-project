const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (tree, depth) => {
    const keys = Object.keys(tree);
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };
    const lines = keys.map((key) => {
      const value = (typeof tree[key] !== 'object' || tree[key] === null) ? tree[key].value : iter(tree[key], depth + 1);
      switch (tree[key].status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${value}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${value}`;
        }
        case 'changed': {
          if (typeof tree[key] !== 'object' || tree[key] === null) {
            return `${indent}${specialSigns.deleted}${key}: ${tree[key].value1}\n
            ${indent}${specialSigns.added}${key}: ${tree[key].value2}`;
          }
          return `${indent}${specialSigns.unchanged}${key}: ${value}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${tree[key].value}`;
        }
        default: {
          return `${indent}${specialSigns.unchanged}${key}: ${tree[key].value}`;
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
