/**
 * arr 中任意两数之和等于 target，假设每个输入只对应一种答案
 * @param {array} arr 
 * @param {number} target 
 * @returns {array} 返回数字对应下标组成的数组
 */
function twoSum( arr, target ) {
  // 用于缓存每一步操作的结果
  var o = {}
  for( var i = 0; i < arr.length; ++i ) {
    if( o[arr[i]] !== undefined ) 
        return [o[ arr[i] ], i];
    o[target - arr[i]] = i;
  }

  return [];
}

var a = [2,7,11,15]
console.log(twoSum(a, 9))



