// import './style/index.less'
// import add from './lib/add'

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


export default {
  getStringWithComma2,
  getStringWithComma
}