### 声明
首先，我必须说`pinia` 是一款非常优秀的状态管理库。本文仅代表个人的一点拙见，请大家批判观看。

其次，虽然`Vue`官方称为组合式 API (Composition API) ，但我更喜欢使用 hooks（可以少打几个字），所以本文中 hooks 就是组合式 API。

最后，如有写得不对的地方，还望各位斧正。

### 为什么推荐使用 hooks
以下内容选自官网[为什么要有组合式 API？](https://cn.vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization)
1. 更好的逻辑复用
2. 更灵活的代码组织
3. 更好的类型推导
4. 更小的生产包体积

当然，墙裂推荐 `<script setup>` 语法糖。

### hooks 真棒，那跨组件通信这副牌又当怎么打
首先，拿到这张旧牌——`provide/inject`。然而这玩意儿用起来就遭老罪了：要注入数据、更改数据的函数，要维护注入命名空间。找爹也困难——谁，在什么地方，什么时候注入的？扔掉！

其次，pinia 这张牌看着新鲜又漂亮，但它的使用方式还停留在上个时代。这是 pinia 官网的代码：
````js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
````
什么年代了，还在做传统 Store。一点都不 Composition，扔掉，统统扔掉！

这下心急的朋友坐不住了：啰里吧嗦，你到底想打什么牌？

我知道你急，但是先别急。这里请大家思考一个问题：想不想 hooks 一把梭？

#### 王牌 [effectScope](https://cn.vuejs.org/api/reactivity-advanced.html#effectscope)
````js
import { effectScope, onScopeDispose } from 'vue'

export function useSharedHook(hook) {
  let subscribers = 0
  let state, scope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => hook(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}
````
使用方式：
````js
export const useFullName= useSharedHook(() => {
  const firstName = ref('')
  const lastName = ref('')
  const fullName = computed(() => firstName.value + lastName.value)
  const changeName = (type, value) => {
    if (type === 'firtName') firstName.value = value
    if (type === 'lastName') lastName.value = value
  }
  return {
    fullName,
    changeName,
  }
})
````
魔法就此发生。

无论是在不同的组件、亦或是不同的文件中执行`const { fullName, changeName } = useFullName()`，调用`changeName()`后，所有引用`fullName`的地方将同步生效。

更棒的是，当组件卸载（unmounted）的时候，上述 useFullName 中的各种 effect 也将自动销毁（如 computed）。

当然，王牌也有瑕疵。尤其当你在构建 SSR 应用时，应特别注意（没搞过，纯提醒）。

时间有限，关于`effectScope`的具体实现细节，这里不做展开，或许下次有机会再分享。有兴趣的同学，可以看看[RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)。


### 小提示更贴心
#### 哪些逻辑/函数可以抽离成 hooks
刚开始使用 Vue 3时，很容易把所有逻辑一股脑塞进 hooks 中，但还是有必要区分普通函数和hooks函数。

凡是包含以下内容的代码，都可以编写进 hooks 中：
* 响应式 API：例如 ref() 和 reactive()，使我们可以直接创建响应式状态、计算属性和侦听器。
* 生命周期钩子：例如 onMounted() 和 onUnmounted()，使我们可以在组件各个生命周期阶段添加逻辑。
* 依赖注入：例如 provide() 和 inject()，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

除此之外的可复用逻辑，作为工具函数会更适合。

#### effect 是什么
...
