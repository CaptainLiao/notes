var searchMatrix = function(matrix, target) {
    return search(matrix, 0, 0, matrix.length-1, matrix[0].length-1, target)
};

function search(matrix, is, js, ie, je, target) {
    if (is >= 0 && js >= 0 && ie < matrix.length && je < matrix[0].length) {
        var im = parseInt((is + ie)/2)
        var jm = parseInt((js + je)/2)

        var mid = matrix[im][jm]
        if (target === mid) return true

        if (target < mid)
            return search(matrix, is, js, im, jm, target)

        if (target > mid) {
            search(matrix, is, jm+1, im, je, target)
            search(matrix, im+1, js, ie, je, target)
        }
    }
    

}