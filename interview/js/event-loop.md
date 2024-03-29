* 宏任务和微任务
  * 宏任务：macrotask,包括setTimeout、setInerVal、setImmediate(node独有)、requestAnimationFrame(浏览器独有)、I/O、UI rendering(浏览器独有)
  * 微任务：microtask,包括process.nextTick(Node独有)、Promise.then()、Object.observe、MutationObserver
* Promise构造函数中的代码是同步执行的，new Promise()构造函数中的代码是同步代码，并不是微任务
* Node.js中的EventLoop执行宏队列的回调任务有6个阶段
  * 1.timers阶段：这个阶段执行setTimeout和setInterval预定的callback
  * 2.I/O callback阶段：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
  * 3.idle, prepare阶段：仅node内部使用
  * 4.poll阶段：获取新的I/O事件，适当的条件下node将阻塞在这里
  * 5.check阶段：执行setImmediate()设定的callbacks
  * 6.close callbacks阶段：执行socket.on('close', ....)这些callbacks

* NodeJs中宏队列主要有4个
  * 1.Timers Queue
  * 2.IO Callbacks Queue
  * 3.Check Queue
  * 4.Close Callbacks Queue
  * 这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。

* NodeJS中微队列主要有2个
  * 1.Next Tick Queue：是放置process.nextTick(callback)的回调任务的
  * 2.Other Micro Queue：放置其他microtask，比如Promise等
* 在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。

* Node.js中的EventLoop过程
  * 1.执行全局Script的同步代码
  * 2.执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
  * 3.开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
  * 4.Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
  * 5.这就是Node的Event Loop
* Node 11.x新变化
  * 现在node11在timer阶段的setTimeout,setInterval...和在check阶段的immediate都在node11里面都修改为一旦执行一个阶段里的一个任务就立刻执行微任务队列。为了和浏览器更加趋同.