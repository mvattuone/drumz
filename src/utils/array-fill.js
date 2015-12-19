var fillArray = function(l,v) {
  var a = [];
  while (0 < l) {
    a[l -= 1] = v;
  }
  return a;
}

module.exports = fillArray;