# animationend  事件说明   

### 1、兼容性

`animationend`只有两种形式：`animationend`和`webkitAnimationEnd`

>webkitAnimationEnd  中 w 一定要小写，animationend  中 e 要小写

### 2、事件执行次数

同一个元素上的动画，`animationend`只执行一次

### 3、兼容性

```
_thisEle.on("webkitAnimationEnd animationend", function(){
    alert('animationend')
});
```

注：**网上资料说支持微信浏览器，但在实际项目中发现通过微信扫描二维码，并没有执行上段代码。**

|        |                | animationend | weikitanimationend |
| ------ | -------------- | ------------ | ------------------ |
| PC     | FF             | √            | ×                  |
|        | chrome（46+）    | √            |                    |
|        | IE10+          | √            |                    |
|        | 360            | ×            | √                  |
|        | safari         | ×            | √                  |
|        | qq和微信浏览器（安卓）   | √            | √                  |
| mobile | qq和微信浏览器（ip5+） | ×            | ×                  |
|        | qq和微信浏览器（ip4）  | ×            | ×                  |
|        | 安卓自带浏览器        | ×            |                    |
|        | chrome         | √            | √                  |
|        | uc             | ×            | √                  |
|        | 360            | ×            | √                  |
|        | safari         | ×            | √                  |