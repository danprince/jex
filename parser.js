var Expression = require('./expression'),
    types = require('./types');
    tokens = require('./tokens');

module.exports = function(file) {

  var ast, stack, index, line, character, expr, start, begin, end;

  ast = [];
  stack = [];
  line = 1;
  start = 0;
  begin = 0;

  function peek() {
    return stack[stack.length - 1];
  }

  function insert(expr) {
    var parent;
    if(stack.length > 0) {
      parent = stack[stack.length - 1];
      parent.child(expr);
      expr.parent(parent);
    } else {
      ast.push(expr);
    }
  }

  for(index = 0; index < file.length; index++) {
    character = file[index];

    // Lists
    if(character === tokens.OPEN) {
      stack.push(new Expression(types.core.List, index, line));
    } else if(character === tokens.CLOSE) {
      if(peek().type === types.core.List) {
        expr = stack.pop();
        expr.close(index);
        insert(expr);
      } else {
        // mismatched paren
        console.error('Mismatched paren');
      }

    // Sets
    } else if(character === tokens.SET_OPEN) {
      stack.push(new Expression(types.core.Set, index, line));
    } else if(character === tokens.SET_CLOSE) {
      if(peek().type === types.core.Set) {
        expr = stack.pop();
        expr.close(index);
        insert(expr);
      } else {
        // mismatched set
        console.error('Mismatched set');
      }


    // Numbers
    } else if(character.match(/[0-9\.]/)) {
      begin = index;
      expr = new Expression(types.core.Number, index, line);
      while(file[++index].match(/[0-9\.]/)) {

      }

      expr.value = parseFloat(file.slice(begin, index));
      --index;
      // jump cursor back
      insert(expr);

    // Strings
    } else if(character === tokens.STRING_OPEN) {
      expr = new Expression(types.core.String, ++index, line);
      end = file.indexOf(tokens.STRING_CLOSE, index + 1);
      expr.value = file.slice(index, end);
      // jump cursor along
      index = end;
      insert(expr);

    // Symbols
    } else if(character === tokens.SYMBOL) {
      // trim : character
      start = index + 1;
      expr = new Expression(types.core.Symbol, ++index, line);
      while(file[++index].match(types.internals.Variable.test)) {
      }
      expr.value = file.slice(start, index);
      --index;
      // jump cursor along
      insert(expr);

    // New line
    } else if(character === '\n') {
      line += 1;
      start = index + 1;

    // Variables
    } else if(character.match(types.internals.Variable.test)) {
      begin = index;
      expr = new Expression(types.internals.Variable, index, line);
      while(file[++index].match(types.internals.Variable.test)) {
      }
      expr.value = file.slice(begin, index);
      --index;
      insert(expr);
    }
  }

  return ast;
};
