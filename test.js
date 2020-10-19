
var ftn = function ftn () {
  console.log('old');
  
}

var b = ftn;
console.log(b);



var ftn = function ftn () {
  b()
  console.log('new');
  
}

console.log(b);
