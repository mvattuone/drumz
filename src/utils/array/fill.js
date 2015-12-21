var fill = function(l,v) {
  var a = this;
  while (0 < l) {
    a[l -= 1] = v;
  }
  return a;
}

module.exports = fill;