const replacer = (key, value) => {  
  return typeof value === 'function' 
    ? value.toString() 
    : value;
} 


let reviver = (key, value) => {  
  if (typeof value === 'string' && value.indexOf('function') >= 0) {
    // eval is slower
    // let functionTemplate = `(${value})`;    
    // return eval(functionTemplate);
    let functionTemplate = `(${value}).call(this)`;    
    return new Function(functionTemplate); 
  }  
  return value;
} 

export default {
  stringify(data, space = 0) {
    return JSON.stringify(data, replacer, space)
  },

  parse(jsonStr) {
    return JSON.parse(jsonStr, reviver)
  }
}