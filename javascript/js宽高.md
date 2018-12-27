### 一、window和document

#### 1.window

1.1 window 指浏览器打开的窗口

1.2 window对象可以省略

`alert() === window.alert()`

#### 2. document

2.1 document对象是window对象的一部分

2.2 浏览器的HTML文档成为document对象的一部分

*window.location === document.location  他们都引用自Location对象*

### 二、与window相关的宽高

#### 1. window.innerWidth 和 window.outerWidth // 不兼容ie9-

#### 2. window.innerHeight 和 window.outerHeight // 不兼容ie9-

#### 3. window.screen.height 和 window.screen.width  兼容

### 三、 与document相关的宽高



### 四、 documentElement 和 body的关系

`document.documentElement === html`

`document.body === body`

`document.documentElement.childNodes[2] === document.body`

### 五、 Event对象上5种坐标

1. clientX 、clientY  相对于浏览器（可视区左上角0,0）的坐标
2. screenX 、screenY 相对于设备屏幕左上角（0,0）的坐标
3. offsetX 、 offsetY  相对于事件源（目标元素）左上角（0,0）的坐标
4. pageX、pageY 相对于整个网页左上角（0,0）的坐标
5. X 、Y  本来是IE属性，相对于用CSS动态定位的最内层包容元素

**id.getBoundingClientRect().top ：元素距离浏览器顶部的距离**

