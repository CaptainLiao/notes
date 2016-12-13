### 1. 跨浏览器事件对象

在EventUtil对象中添加方法，兼容各种浏览器。

| IE                                  | DOM                   |
| ----------------------------------- | --------------------- |
| cancleBubble=true，取消事件冒泡，默认为false   | stopPropagation( )    |
| returnValue=false，取消事件的默认行为，默认为true | preventPropagation( ) |
| srcElement，事件的目标                    | target                |

```
var EventUtils = {
    addHandler: function(ele, type, handler){
        if(ele.addEventListener){
            ele.addEventListener(type, handler, false);
        }else if(ele.attachEvent) {
            ele.attachEvent("on" + type, handler);
        }else {
            ele.on[type] = handler;
        }
    },
    getEvent: function(e) {
        return e ? e : window.event;
    },
    getTarget: function(e) {
        return e.target ? e.target : e.srcElement;
    },
    removeHandler: function(ele, type, handler) {
        if(ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        }else if(ele.detachEvent) {
            ele.detachEvent("on" + type, handler);
        }else {
            ele.on[type] = null;
        }
    },
    // 阻止默认事件
    preventDefault: function(e){
        if(e.preventDefault) {
            e.preventDefault();
        }else {
            e.returnValue = false;
        }
    },
    // 停止事件传播
    stopPropagation: function(e) {
        if(e.stopPropagation) {
            e.stopPropagation();
        }else {
            e.cancelBubble = true;
        }
    }
}
```

### 2. 删除重复数组

```
function delRepeat (arr){
    var result = [];
    arr.forEach(function (item) {
        if(result.indexOf(item) < 0){
            result.push(item);
        }
    });
    return result;
}
2：
var delRepeat = function (arr) {
    var obj = {},
        result = [];
    arr.forEach(function (item) {
        if(!obj[item]) {
            obj[item] = true;
            result.push(item);
        }
    });
    return result;
};
```

### 3. 判断单词回文

```
function checkReverse(str) {
    return str == str.split('').reverse().join('');
}
```

### 4.排序算法 

```
function bubbleSort(arr) {
    var i,j,tem;
    for(i = 0; i<arr.length; i++) {
        for(j = i+1; j< arr.length; j++) {
            if(arr[i]> arr[j]) {
                tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
            }
        }
    }
    return arr;
}

function bubbleSort(arr) {
    var i,j;
    for(i = 0; i<arr.length; i++) {
        for(j = i+1; j< arr.length; j++) {
            if(arr[i]> arr[j]) {
                arr[j] = arr[i] - arr[j];
                arr[i] = arr[i] - arr[j];
                arr[j] = arr[i] + arr[j];
            }
        }
    }
    return arr;
}
```

### 5. 随机生成指定长度的字符串

```
function randomStr(n) {
    var str = 'abcdefghijklmnopqrestuvwsyz0123456789'，
        tem = '',
        n = n || 5,
        i = 0,
        l = str.length;
    for(i=0; i<n; i++) {
        tem = tem + str.charAt(Math.floor(Math.random() * l));
    }
    return tem;
}

奇妙的写法：
function randomStr(n) {
    return Math.random().toString(36).substr(2,n);
}
```
### 6. 对象、字符串、布尔值深度复制

    function deepCopy (p, c) {
        var c = c || {};
        switch(typeof p) {
            case "string":
                c = p;
                break;
            case "boolean":
                c = p;
                break;
            case 'object':
                for(var i in p) {
                    if(typeof p[i] === 'object'){
                        c[i] = (p[i].constructor === Array) ? [] : {};
                        deepCopy(p[i], c[i]);
                    }else {
                        c[i] = p[i];
                    }
                };
                break;
            default:
                alert("请输入正确的值")
        }
    
        return c;
    }
    var m = "sss"
    var n = deepCopy(m)
    console.log(n)

#### 7. 上传图片并预览

```
var file = $(".weui_uploader_input"),
   submitBtn = $(".xq_button"),
   files;
file.on("change", change);
      function change() {
          var pic = document.getElementById("preview"),
              file = document.getElementById("f");

          var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

          // gif在IE浏览器暂时无法显示
          if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
              alert("图片的格式必须为png或者jpg或者jpeg格式！");
              return;
          }
          var isIE = navigator.userAgent.match(/MSIE/)!= null,
              isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

          if(isIE) {
              file.select();
              var reallocalpath = document.selection.createRange().text;

              // IE6浏览器设置img的src为本地路径可以直接显示图片
              if (isIE6) {
                  pic.src = reallocalpath;
              }else {
                  // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                  pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
                  // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                  pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
              }
          }else {
              html5Reader(file);
          }
      }

      function html5Reader(file){
          var file = file.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e){
              var pic = document.getElementById('preview');
              pic.src=this.result;
          }
      }
```