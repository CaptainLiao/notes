var setZeros = function(matrix) {
  var rows = matrix.length;
  var cols = matrix[0].length;
  var t = [];
  var m = Array(cols).fill(0);
  var hasZero;

  for (var i = 0; i < rows; ++i) {
    hasZero = false;
    for (var j = 0; j < cols; ++j) {
      if (matrix[i][j] === 0 && t[j] === void 0) {
        t[j] = j;
	hasZero = true;
      }
      if (t[j] !== void 0) {
        if (matrix[i][j] === 0) hasZero = true;
	matrix[i][j] = 0;
      }
    }
    hasZero && matrix[i] = m;
  }

  for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < cols; ++j) {
      if (t[j] !== void 0) matrix[i][j] = 0;
    }
  }
