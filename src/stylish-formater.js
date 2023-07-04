const makeStylish = (diffTree, spaceCount = 4) => {
  const iter = (tree, depth) => {
    const keys = Object.keys(tree).sort();
    const indent = ' '.repeat(depth * spaceCount - 2);
    const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount);
    const specialSigns = { added: '+ ', deleted: '- ', unchanged: '  ' };
    const lines = keys.map((key) => {
      let value;
      let value1;
      let value2;
      switch (true) {
        case (typeof tree[key].value !== 'object' || tree[key].value === null): {
          value = tree[key].value;
          break;
        }
        case tree[key].value.first: {
          value1 = (typeof tree[key].value.first !== 'object' || tree[key].value.first === null) ? tree[key].value.first : iter(tree[key].value.first, depth + 1);
          value2 = (typeof tree[key].value.second !== 'object' || tree[key].value.second === null) ? tree[key].value.second : iter(tree[key].value.second, depth + 1);
          break;
        }
        case (typeof tree[key].value === 'object'): {
          value = iter(tree[key].value, depth + 1);
          break;
        }
        default: {
          value = tree[key].value;
        }
      }
      switch (tree[key].status) {
        case 'added': {
          return `${indent}${specialSigns.added}${key}: ${value}`;
        }
        case 'deleted': {
          return `${indent}${specialSigns.deleted}${key}: ${value}`;
        }
        case 'changed': {
          return `${indent}${specialSigns.deleted}${key}: ${value1}\n${indent}${specialSigns.added}${key}: ${value2}`;
        }
        case 'unchanged': {
          return `${indent}${specialSigns.unchanged}${key}: ${value}`;
        }
        case 'nested': {
          return `${indent}${specialSigns.unchanged}${key}: ${value}`;
        }
        default: {
          return `${indent}${specialSigns.unchanged}${key}: ${value}`;
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
