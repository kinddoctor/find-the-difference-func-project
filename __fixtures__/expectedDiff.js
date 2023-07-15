const result = {
  common: {
    status: 'nested',
    value: {
      follow: {
        status: 'added',
        value: false,
      },
      setting1: {
        status: 'unchanged',
        value: 'Value 1',
      },
      setting2: {
        status: 'deleted',
        value: 200,
      },
      setting3: {
        newValue: null,
        oldValue: true,
        status: 'changed',
      },
      setting4: {
        status: 'added',
        value: 'blah blah',
      },
      setting5: {
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
      setting6: {
        status: 'nested',
        value: {
          doge: {
            status: 'nested',
            value: {
              wow: {
                newValue: 'so much',
                oldValue: '',
                status: 'changed',
              },
            },
          },
          key: {
            status: 'unchanged',
            value: 'value',
          },
          ops: {
            status: 'added',
            value: 'vops',
          },
        },
      },
    },
  },
  group1: {
    status: 'nested',
    value: {
      baz: {
        newValue: 'bars',
        oldValue: 'bas',
        status: 'changed',
      },
      foo: {
        status: 'unchanged',
        value: 'bar',
      },
      nest: {
        newValue: 'str',
        oldValue: {
          key: 'value',
        },
        status: 'changed',
      },
    },
  },
  group2: {
    status: 'deleted',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  group3: {
    status: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
};

export default result;
