Array.prototype.mapIf = function(criteria, callback) {
  return this.map(item => criteria(item) ? callback(item) : item);
}