Promise.prototype.tap = function(callback) {
  return this.then(value => Promise.resolve(callback(value)).then(() => value));
}