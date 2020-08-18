关于在 JS 中，函数参数的传递方式，网络上有很多的讨论，譬如[Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)和[javascript传递参数如果是object的话，是按值传递还是按引用传递？](https://www.zhihu.com/question/27114726)。大家的说法似乎都有道理，但还是感觉一头雾水。

现在，只需要记住一句话：函数参数**按内存地址的值进行传递**。

我们先来看题；
````js
function changeStuff(a, b, c){
  a = a * 10;
  b.item = "changed";
  c = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

changeStuff(num, obj1, obj2);

console.log(num);
console.log(obj1.item);
console.log(obj2.item);
````
利用上面的结论，你能说出正确的结果并解释原因么？

要理解这个论断，我们要明白两件事：
* *变量保存的是内存地址*，访问变量，就是拿到这个地址去内存中找对应的值
* *函数传参，是一次变量创建和赋值过程*

### 函数传参，为什么说是变量创建和赋值？
在 ecma262 规范中，有关于[函数运行时语义](https://tc39.es/ecma262/#sec-function-definitions-runtime-semantics-evaluatebody)的详细说明，我们节选部分摘抄如下：
1) 根据形参名，在函数作用域内创建一个*新的*、未初始化的可变绑定(CreateMutableBinding)
2) 执行 IteratorBindingInitialization，即为上一步创建的变量们赋值

### 变量赋值，赋的是什么值？
对于下面的语句：
````
var a = 'abc'; (1)
a = 'def'; (2)
````
对于表达式(1)，JS引擎声明了一个变量 a，接着在内存中创建了值'abc'，最后将这个内存地址赋值给了变量 a。

对于表达式(2)，JS引擎首先在内存中创建值'def'，然后将新的内存地址赋值给 a。

所以，每一次变量赋值，就是在内存中创建（如果已经存在，就不用创建了）一个值，然后把这个值对应的**内存地址赋值给变量**。

### 解题

假定有如下伪代码，全局变量 num 持有的内存地址为 0x11111，它的真实值为 10，以此类推：
````
变量     内存地址     真实的值
num     0x11111     10
obj1    0x22222     {item: "unchanged"}
obj2    0x33333     {item: "unchanged"}
````

在函数初始化过程中，JS引擎会在`changeStuff`的作用域内，根据参数名创建对应的变量并赋值：
````
变量     内存地址     真实的值
a       0x11111     10
b       0x22222     {item: "unchanged"}
c       0x33333     {item: "unchanged"}
````
在函数`changeStuff`执行过程中，对于参数 a 和 c，经过函数内部的重新赋值过程后，它们已经指向了**新的**内存地址。

而对于参数 b，函数对值进行了**修改**，但内存地址并没有发生变化，所以，参数 b 持有的内存**地址不变**：
````
变量     内存地址     真实的值
a       0x44444     100
b       0x22222     {item: "changed"}
c       0x55555     {item: "unchanged"}
````
全局变量没有经过重新赋值，所以它们还是持有最初的内存地址：
````
变量     内存地址     真实的值
num     0x11111     10
obj1    0x22222     {item: "changed"}
obj2    0x33333     {item: "unchanged"}
````
注意，内存地址 0x22222 所指向的值，在函数执行过程中被更改为：{item: "changed"}。
