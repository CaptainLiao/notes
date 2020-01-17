
Number.prototype.add = function (n) {
  return this + n
}
Number.prototype.reduce = function (n) {
  return this - n
}


console.log((10).add(10).reduce(20))

