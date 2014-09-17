var tokens = require('./tokens');
module.exports = Expression;

function Expression(type, index, line) {
  this.type = type;
  this.start = index;
  this.line = line;
  this.items = [];
  this.__parent__ = null;
}

Expression.prototype.close = function(index) {
  this.end = index;
};

Expression.prototype.child = function(expr) {
  this.items.push(expr);
};

Expression.prototype.parent = function(expr) {
  this.__parent__ = expr;
};
