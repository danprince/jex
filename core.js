var types = require('./types');

module.exports = core = {

  // define a variable
  'var': function(name, value) {
    if(typeof this[name] === 'undefined') {
      this[name] = value;
    } else {
      console.error('Attempt to mutate immutable variable');
    }
  },

  // define a named function
  fun: function(name, args, fn) {
    fn = this.__args__[2];
    args = fn.items[0];
    console.log('name'.green, name, '\n\nargs'.green, args, '\n\nfn'.green, fn);
    if(typeof this[name] === 'undefined') {
      this[name] = core.fn(this, fn, args);
    } else {
      console.error('Attempt to mutatate immutable variable');
    }
  },

  // define an anonymous function
  fn: function(fn, args) {
    return {
      args: args,
      fn: fn,
      call: function() {
        var key, arg, index;

        // expose local args object
        this.args = args;

        // expose args locally using their names
        index = 0;
        for(key in args) {
          arg = args[key];
          this[arg] = arguments[index++];
        }

        return fn.apply(this, arguments);
      }
    };
  },

  print: function() {
    console.log.apply(console, arguments);
  },

  '=': function(a, b) {
    return a === b;
  },

  '+': function() {
    var i, total;
    for(i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  },

  '*': function() {
    var i, total;
    for(i = 0; i < arguments.length; i++) {
      total *= arguments[i];
    }
    return total;
  },

  '-': function() {
    var i, total = arguments[0];
    for(i = 1; i < arguments.length; i++) {
      total -= arguments[i];
    }
    return total;
  },

  '/': function() {
    var i, total;
    for(i = 0; i < arguments.length; i++) {
      total /= arguments[i];
    }
    return total;
  }



};
