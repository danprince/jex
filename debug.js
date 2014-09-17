var colors = require('colors');

module.exports = {
  printTree: function toXml(ast, depth) {
    var indent = '';
    depth = depth || 0;

    for(var i = 0; i < depth; i++) {
      indent += '  ';
    }

    for(var key in ast) {
      var tag = indent + '<' + ast[key].type.name + ' value=' + ast[key].value + '>';

      var colors = {
        string: 'green',
        list: 'cyan',
        set: 'red',
        number: 'white',
        variable: 'yellow',
        symbol: 'blue'
      };

      console.log(tag[colors[ast[key].type.name]]);

      if(ast[key].items.length > 0) {
        toXml(ast[key].items, depth + 1);
      }
    }
  }
}
