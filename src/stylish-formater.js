const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (tree, depth) => {
    const keys = Object.keys(tree);
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };
    const lines = keys.map((key) => {
      if (key.status !== 'changed' && (typeof key.value !== 'object' || key.value === null)) {
        switch (key.status) {
          case 'added': {
            return `${indent}${specialSigns.added}${key}: ${key.value}`;
          }
          case 'deleted': {
            return `${indent}${specialSigns.deleted}${key}: ${key.value}`;
          }
          case 'unchanged': {
            return `${indent}${specialSigns.unchanged}${key}: ${key.value}`;
          }
          default: {
            //if !key.status
            return `${indent}${specialSigns.unchanged}${key}: ${key.value}`;
          }
        }
      }
      if (key.value.first) {
        return `${indent}${specialSigns.deleted}${key}: ${key.value.first}\n
        ${indent}${specialSigns.added}${key}: ${key.value.second}`;
      }
      return `${indent}${specialSigns.unchanged}${key}: ${iter(key.value, depth + 1)}`;
    });
    return ['{',
      ...lines,
      bracketIndent,
      '}'].join('\n');
  };
  return iter(diffTree, 1);
};

export default makeStylish;
