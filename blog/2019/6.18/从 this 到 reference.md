判断“this 指向谁”是个老大难的问题。

网络上有许多文章教我们如何判别，但大多艰涩复杂，难以理解。

那么这里介绍一个非常简单实用的判别规则：
> 1）在函数【调用】时，“this”总是指向小数点左侧的那个对象
>
> 2）如果没有小数点，那么“this”指向全局作用域（比如 Window，严格模式为 undefined）
>
> 3）有几个可以改变“this”指向的函数——bind，call 和 apply
>
> 4）关键字 “new” 将 “this” 绑定到那个新创建的对象上

好了，我们已经学会了基本的理论知识，是时候运用一波了。请判断下面的 this 指向：
````
var foo = {bar: function () {return this}}
var b = foo.bar
  
foo.bar();
b();
var c = new someFunction(); 
````
相信你已经完全掌握了，下面我们再进行一点巩固练习：
````
(f = foo.bar)();
(1, foo.bar)();
(foo.bar)();
````
![22](/uploads/5f9dd3ac8dbf9026c875384d5833ea1f/22.png)

并不是上面的判别规则除了差错，而是新增的操作符/运算符增加了代码复杂度。为了解释上述代码的行为，我们需要理解 Reference 和 函数调用。

### Reference Specification Type
在 ES5 中，除了基本的 6 种类型（string,number,boolearn,null,undefined,object），还有 reference 类型，不过它对使用者屏蔽，作为开发者，我们也不用关心它。

但是，了解它能够提升我们对 ECMAScript 的认识。

#### Reference 是什么
ECMAScript  将 Reference 定义为“被解析的命名绑定（resolved name binding）”，它由三部分组成——base,name, and strict flag。

有两种创建 Reference 的途径：
*  标识符解析
*  属性访问

比如，foo 和 foo.bar 创建了一个 Reference ，而字面量（1，“foo”，[1,3]等）或函数表达式——(function(){})却不会。

参考下图：

![33](/uploads/85c31ceab73a12e0ba83cbaef5097890/33.png)

每创建一个 Reference 都会为其对应的 base，name，strict 设置相应的值。"strict "对应代码是否开启了严格模式；"name"设置为标识符或属性名；"base"设置为 property 对象或环境记录（environment record）。

可以认为 Reference 是一个不带原型、有且只有 3 个属性的对象。譬如说：
````
'use strict';
var foo;

// 标识符解析会产生 Reference
var Reference = Object.create(null);
Reference.base = EnvironmentRecord;
Reference.name = 'foo';
Reference.strict = true;

// or
foo.bar;

// 属性访问会产生 Reference
var Reference = Object.create(null);
Reference.base = foo;
Reference.name = 'bar';
Reference.strict = true;

// or 使用未声明的变量
a;
var Reference = Object.create(null);
Reference.base = undefined;
Reference.name = 'a';
Reference.strict = true;
````
### 函数调用
当函数调用的时候，会发生什么？[Function Calls ](https://es5.github.io/#x11.2.3)
> 1. Let ref be the result of evaluating MemberExpression.
> 2. Let func be GetValue(ref).
> 3. Let argList be the result of evaluating Arguments, producing an internal list of argument values ([see 11.2.4](https://es5.github.io/#x11.2.4)).
> 4. If Type(func) is not Object, throw a TypeError exception.
> 5. If IsCallable(func) is false, throw a TypeError exception.
> 
> 6. If Type(ref) is Reference, then
>   * If IsPropertyReference(ref) is true, then Let thisValue be GetBase(ref).
>   * Else, the base of ref is an Environment Record, Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref). 
> 7. Else, Type(ref) is not Reference.
>   * Let thisValue be undefined.
> 
> 8. Return the result of calling the *Call* internal method on func, providing thisValue as the this value and providing the list argList as the argument values.

*ES5 标准告诉我们一个事实——只有在函数真正调用的时候，才能判断 this 的值。*

### 赋值，逗号和分组操作符
有了以上的准备，我们可以解答(f = foo.bar)()、(1, foo.bar)()和(foo.bar)()的 this 指向问题了。

#### 简单赋值(=)操作
诸如 a = 1, g = function(){} 等都属于[Simple Assignment](https://es5.github.io/#x11.13.1)，和函数调用一样，在赋值发生之前，JS 也会做一些准备工作：
> 1. Let lref be the result of evaluating LeftHandSideExpression.
> 2. Let rref be the result of evaluating AssignmentExpression.
> 3. **Let rval be GetValue(rref).**
> 4. Throw a SyntaxError exception if the following conditions are all true:
>     a. Type(lref) is Reference is true
>     b. IsStrictReference(lref) is true
>     c. Type(GetBase(lref)) is Environment Record
>     d. GetReferencedName(lref) is either "eval" or "arguments"
> 5. Call PutValue(lref, rval).
> 6. Return rval.

注意，在赋值前，等号右侧的表达式的值会经过内部函数 [GetValue](https://es5.github.io/#x8.7.1) 进行转化。

在我们的例子中，GetValue 将 foo.bar 的引用转化成那个**实际的函数**。赋值完成后，和调用(function(){})()没有什么分别。现在我们可以使用前面定义的规则来判别 this 指向了，显然这符合第二条规则—— this 指向全局。

#### 逗号操作符
上面的过程也适用于逗号操作符 [Comma Operator ( , )](https://es5.github.io/#x11.14)
> 1. Let lref be the result of evaluating Expression.
> 2. Call GetValue(lref).
> 3. Let rref be the result of evaluating AssignmentExpression.
> 4. **Return GetValue(rref).**

GetValue 将 foo.bar 的引用转化成那个**实际的函数**。逗号操作符计算完成后，和调用(function(){})()没有什么分别。

#### 分组操作符
[Grouping Operator](https://es5.github.io/#x11.1.6)会使用 GetValue 计算表达式吗？
> Return the result of evaluating Expression. This may be of type Reference.
> This algorithm does not apply **GetValue** to the result of evaluating Expression. 

由于分组操作符不会对表达式做额外的操作，所以(foo.bar)() 和 foo.bar()没有差别，this 指向 foo。

（完）

如果你想知道更多细节，不妨点击[Annotated ECMAScript 5.1](https://es5.github.io/#x11.2.4)。

虽然不是标准文档，但更容易阅读。

### 参考
[know-thy-reference/](http://perfectionkills.com/know-thy-reference/)


.

.

.


