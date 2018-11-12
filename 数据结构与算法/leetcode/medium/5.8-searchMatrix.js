/**
 * 搜索二维矩阵 II
编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 */

 /**
 * 【分析】
 * 算法的时间复杂度为O(m+n)
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

var matrixSearch = function(matrix, target) {
    if (!matrix || !matrix.length) return false
    
    var rows = matrix.length - 1
    var i = 0
    var j = matrix[0].length - 1
    while (i <= rows && j >= 0) {
        if (target < matrix[i][j]) {
            --j
        } else if (target > matrix[i][j]) {
            ++i
        } else {
            return true
        }
    }

    return false
}