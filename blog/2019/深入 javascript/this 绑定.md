
### 函数对象
函数类型：
* Arrow
* Normal
* Method

this 的三种模式：
* lexical：this 绑定到函数定义时所在的词法环境
* strict：this 绑定到函数调用时提供的值
* global：表示 this 的值是 undefined，在非严格模式下，指向 global object

#### 函数初始化
函数初始化会执行抽象方法 FunctionInitialize ( F, kind, ParameterList, Body, Scope )，我们可以用下面的伪代码表示函数初始化执行过程：
````js
function FunctionInitialize ( F, kind, ParameterList, Body, Scope ) {
  const len = ParameterList.length
  SetFunctionLength(F, len)

  const Strict = Body.is(StrictModeCode)
  F.[[Strict]] = Strict
  F.[[Environment]] = Scope
  F.[[FormalParameters]] = ParameterList
  F.[[ECMAScriptCode]] = Body
  F.[[ScriptOrModule]] = GetActiveScriptOrModule()

  /**
   * kind：Arrow，Normal，Method
  */
  if (kind === 'Arrow') {
    F.[[thisMode]] = 'lexical'
  } else if (Strict) {
    F.[[thisMode]] = 'strict'
  } else {
    F.[[thisMode]] = 'global'
  }

  return F
}

````

#### this 绑定
调用函数时，会执行抽象方法 OrdinaryCallBindThis ( F, calleeContext, thisArgument )，三个参数分别是：函数对象，执行上下文，this 绑定的对象/值。执行步骤详见[OrdinaryCallBindThis](https://tc39.es/ecma262/#sec-ordinarycallbindthis)

我们可以用下面的伪代码表示寻找this绑定对象的过程：
````js
function OrdinaryCallBindThis( F, calleeContext, thisArgument ) {
    const thisMode = F.[[ThisMode]]

    if (thisMode === 'lexical') return NormalCompletion(undefined)

    const calleeRealm = F.[[Realm]]
    const localEnv = LexicalEnvironment.calleeContext

    if (thisMode === 'strict') {
      thisMode = thisArgument
    }
    else {
      if (thisArgument === undefined || thisArgument === null) {
        const globalEnv = calleeRealm.[[GlobalEnv]]
        const globalEnvRec = globalEnv.EnvironmentRecord
        thisValue = globalEnvRec.[[GlobalThisValue]]
      } 
      else {
        // ToObject 在 calleeRealm 领域内生成一个 thisArgument 的包装对象
        // 原文是：Let thisValue be ! ToObject(thisArgument). 
        // 不知道这里的 ! 有何作用，难道是 thisValue = !ToObject(thisArgument)????
        thisValue = ToObject(thisArgument)
      }
    }

    const envRec = localEnv.EnvironmentRecord
    assert(envRec.is('FuntionEnvironmentRecord'))
    return envRec.BindThisValue(thisValue)
}
````




