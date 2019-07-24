9.2.1 [[Call]] ( thisArgument, argumentsList )
-------
````js
F.[[Call]] = function (thisArgument, argumentsList) {
  assert F === 'function object'

  if (F.[[FunctionKind]] == 'classConstructor') throw TypeError

  let callerContext = running execution context
  let calleeContext = PrepareForOrdinaryCall(F, undefined)

  assert calleeContext === running execution context

  OrdinaryCallBindThis(F, calleeContext, thisArgument)

  let result = OrdinaryCallEvaluateBody(F, argumentsList)

  remove(calleeContext, execution context stack)
  restore(callerContext, running execution context)

  if (result.[[Type]] == 'return')
    return NormalCompletion(result.[[Value]])

  return NormalCompletion(undefined)
}
````

9.2.15 FunctionDeclarationInstantiation
------
当为了执行函数而建立一个执行上下文时，会创建一个函数环境记录 function Environment Record（ER），并把实例化的形参绑定到这个 ER 中。同时，函数体的每个声明也被实例化。如果函数形参没有默认值，那么函数体内部声明和形参会实例化到同一个 ER 中。否则，将为函数体内部声明创建另一个 ER。 
````js
let a = 1
function fnWithDefault(b = a) {
  console.log(b)
}


````

形参和函数作为 FunctionDeclarationInstantiation 的一部分被初始化，其他绑定在函数体【执行（evaluation ）】阶段被初始化。




