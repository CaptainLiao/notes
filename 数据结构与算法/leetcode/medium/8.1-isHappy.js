/**
 * @param {number} n
 * @return {boolean}
 *
 * 维基百科指出，经过一系列计算后，快乐数等于 1 ，而不快乐数最后都会进入 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 的循环中
 */
var isHappy = function(n) {
    while (n !== 1 && n !== 4) {
        n = String(n).split('').reduce((s, i) => s += i * i, 0)
    }
    
    return n === 1
};
