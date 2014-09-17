var reader = require('./reader'),
    parser  = require('./parser'),
    interpreter = require('./interpreter'),
    debug = require('./debug');

reader.readFile('./old.jex', function(code) {
  var ast = parser(code);
  debug.printTree(ast);
  //interpreter(ast);
});
