
function getStringWithComma(s:string, gap:number):string {
  s = s.toString()
  if(typeof s !== 'string') throw new Error('xxxx')
  
  return s.split('')
    .reverse()
    .reduce((res, item, index) => {
      if( index !== 0 && index % gap === 0) {
        res += ','
      }
      res += item
      return res
    }, '')
    .split('')
    .reverse()
    .join('')
    
}

function getStringWithComma2(s:string, gap:number):string {
  s = s.toString()
  if(typeof s !== 'string') throw new Error('xxxx')
  
  let arr = s.split('')
  let res = []
  for(var i = arr.length - 1; i >= 0; i--) {
    if( i !== arr.length -1 && i % gap === 0 ) {
      res.unshift(',')
    }
    res.unshift(arr[i])
  }
  return res.join('')
}

function bubbleSort(arr:number[]):number[] {
  var len = arr.length

  for(var i = len; i > 0; i--) {
    for(var j = 0; j < i - 1; j++) {
      if(arr[j +1] < arr[j]) {
        var temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}



export {
  getStringWithComma2,
  getStringWithComma,
  bubbleSort
}