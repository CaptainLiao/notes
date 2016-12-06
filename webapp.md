# 移动webapp

### 1. Tap 基础事件

使用tap 自定义事件代替click事件，解决300ms 延迟

#### 1.1 原理

在`touchstart`、`touchend`时，记录时间、手指位置，在`touchend`时进行比较，如果手指位置为同一位置（或允许移动一个非常小的位移）且时间间隔较短（不超过200ms），且过程中未曾触发过`touchmove`，即可认为触发了手持设备上的`click`，一般称它为`tap`。

#### 1.2 实现`tap`

**一般使用`zepto.js`来实现**

#### 1.3 `tap`“点透”bug

解决方案：

1. 使用缓动动画，过渡300ms的延迟
2. 中间层dom元素的加入，让中间层接受这个“穿透”事件，稍后隐藏
3. “上下”都使用tap事件，原理上解决tap透传事件（但不可避免原生标签的click事件）
4. 改用其他库（如Fastclick，最新版本zepto已经解决这个bug）

### 2. Touch 事件

#### 2.1 touch基础事件

* touchstart：手指触摸屏幕触发
* touchmove： 手指在屏幕滑动，连续触发
* touchend： 手指离开屏幕时触发
* touchcancel： 系统取消touch时候触发（不常用）

#### 2.2 专有触摸属性

* touches：跟踪触摸操作的touch对象数组
* targetTouches：特定事件目标的touch对象数组



































