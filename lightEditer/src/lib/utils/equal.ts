function arrayEqual(a:number[], b:number[]) {
  let t = !Array.isArray(a) || !Array.isArray(b) || a.length !== b.length
  if( t ) return false
  
  return a.every((item, index) => item === b[index])
}


export {
  arrayEqual
}