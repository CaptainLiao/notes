
## 六
“smart constructors” for simple types, and “making illegal states unrepresentable” for more complex types.

design for eventual consistency rather that immediate consistency.


## 七
函数对外暴露公共接口，对调用者隐藏其依赖信息；对内部使用的函数，要明确它们的依赖。

## 八：理解函数
### Currying
把多参函数转化为一系列单参函数

### partial application
Currying 特别版，它返回一个保存了部分参数的函数。

### composition
一个函数的输入，是另一个函数的输出。

使用组合时，如何解决两个函数参数类型不兼容的问题？
````
let add1 x = x + 1
let printOption x =
  match x with
  | Some i -> printfn "The int is %i" i
  | None -> printfn "No value"

5 |> add1 |> printOption  // error
````
答案是：寻找最大公共分母

上例中，输出是`int`，输入是`Option<int>`，所以需要将输出转化为`Option`。
````
5 |> add1 |> Some |> printOption
````

## 九 实现：组合pipeline
### dependencies inject in functional programing

