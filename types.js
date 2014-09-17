function Type(package, name, test) {
  return {
    name: name,
    test: test,
    toString: function() {
      return 'jex.' + package + '.' + name;
    }
  };
}

var packages = {
  core: Type.bind({}, 'core'),
  internals: Type.bind({}, 'internals')
};

module.exports = {
  core: {
    List: packages.core('list'),
    Set: packages.core('set'),
    Symbol: packages.core('symbol'),
    String: packages.core('string'),
    Number: packages.core('number'),
    'Function': packages.core('function')
  },
  internals: {
    Variable: packages.internals('variable', /[a-zA-Z0-9_\$\?\-\+\*\/]/)
  }
};
