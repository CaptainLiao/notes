/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var o = nums.reduce((obj, item) => {
        obj[item] = ~~obj[item] + 1
        return obj
    }, {})
    
    var res = Object.keys(o)
        .reduce((a, k) => a.concat([{k: k, v: o[k]}]), [])
        .sort((a, b) => b.v - a.v)
        .slice(0, k)
        .map(item => ~~item.k)
    
    return res
};