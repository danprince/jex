var debug = require('./debug'),
    types = require('./types'),
    colors = require('colors'),
    core = require('./core');

var globals = {
  locals: core
};

module.exports = function(ast) {
  var expr;
  for(var i = 0; i < ast.length; i++) {
    expr = ast[i];
    evaluate(expr);
  }
};

function evaluate(expr) {
  var args;

  console.log(expr.type.toString().white);

  if(expr.type === types.internals.Variable) {
    return resolve(expr.__parent__.locals, expr.value);
  }

  if(expr.type === types.core.List) {
    expr.locals = context();

    expr.locals.__args__ = expr.items;

    // resolve expressions within list
    args = expr.items.map(function(arg) {
      return evaluate(arg) || arg.value;
    });

    // execute the list if first item
    // is a function
    //console.log('first'.red, args[0]);
    //console.log('args'.red .green, args);
    if(typeof args[0] === 'function') {
      a = args[0].apply(expr.locals, args.slice(1));
      console.log('return', a);
      return a;
    } else {
    // alternatively, return the list
    // as data
      return args;
    }
  }

  if(expr.type === types.core.Set) {
    // TODO: ensure unique
    return expr.items.filter(function(item) {
      return expr.items.indexOf(item) < 0;
    });
  }

  if(expr.type === types.core.Number) {
    return expr.value;
  }

  if(expr.type === types.core.String) {
    return expr.value;
  }
}

function context(parent) {
  parent = parent || null;
  return {
    __parent__: parent || globals
  };
}

function resolve(locals, name) {
  console.log('locals'.cyan, locals);
  // If available in locals, use
  if(typeof locals[name] !== 'undefined') {
    return locals[name];

  // Lookup in parent
  } else if(locals.__parent__ && locals.__parent__.locals) {
    return resolve(locals.__parent__.locals, name);

  // Does not exist
  } else {
    return undefined;
  }
}

