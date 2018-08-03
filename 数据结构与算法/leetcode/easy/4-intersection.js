
function intersect( nums1, nums2 ) {
  var o = {}
  var a = []
  nums1.forEach(item => {
    o[item] ? o[item]++ : o[item] = 1;
  })

  nums2.forEach(item => {
    if( o[item] ) {
      a.push(item);
      o[item]--
    }
  })
  return a;
}

var a = [2, 1]
var b = [1, 2, 2, 2,1]

console.log(intersect(a,b))
