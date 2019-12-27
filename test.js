//const p = 42;
const p = Promise.resolve(42)

setTimeout(() => console.log('setTimeout'))

const asyncFn = (async function () {
  await p; 
  console.log('after:await', 1);
  await p;
  console.log('after:await', 2);
})();

asyncFn.then(() => console.log('after:asyncFn'))

Promise.resolve(p).then(() => console.log('tick:1'))
 .then(() => console.log('tick:2'))
 .then(() => console.log('tick:3'))
 .then(() => console.log('tick:4')) 
 .then(() => console.log('tick:5')) 
 .then(() => console.log('tick:6')) 
 .then(() => console.log('tick:7')) 
 .then(() => console.log('tick:8')) 
 .then(() => console.log('tick:9')) 
