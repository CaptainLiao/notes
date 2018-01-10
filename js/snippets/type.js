let typeReg = /^\[object (\w+)\]$/;

module.exports = function type(o) {
  if(o === null) return 'null';
  if(o === undefined) return 'undefined';
  if(o !== o) return 'NaN';

  let t = Object.prototype.toString.call(o).match(typeReg);
  return t === null ? 'unknown' : t[1].toLowerCase();
}
