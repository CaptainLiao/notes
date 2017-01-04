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

### 7. 上传图片并预览

```
<!DOCTYPE html>
<html>
<head>
  <title>申请代理</title>
	@@include("_head.html")
<link rel="stylesheet" href="css/i_xuqiu.css">
</head>
<body>
<div class="content">
	<div class="header">
		<div class="header_fixed">
			<a href="#" class="header_left"><span class="iconfont">&#xe871;</span></a>
			<div class="header_text">申请代理</div>
		</div>
	</div>
	<div class="xq_wri">
		<div class="xq_wri_cont">
			<div class="weui_cells weui_cells_form">
				<div class="weui_cell">
					<div class="weui_cell_bd weui_cell_primary">
						<textarea class="weui_textarea" placeholder="请输入申请代理" rows="4"></textarea>
						<div class="weui_uploader">
							<form action="" id="uploadForm" enctype="multipart/form-data" name="form">
								<div class="weui_uploader_bd">
									<ul class="weui_uploader_files">
										<!--<li class="weui_uploader_file" style="background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)"></li>
                                        <li class="weui_uploader_file">
                                            <img alt="" id="preview" style="width: 100%;height: 100%">
                                        </li>-->

									</ul>
									<div class="weui_uploader_input_wrp">
										<input class="weui_uploader_input" id="f" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple>
									</div>
									<span>添加相片</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="height06"></div>
		<div class="height06"></div>
	</div>
	<div class="footer">
		<div class="footer_fix">
			<div class="xq_button"><input type="submit" class="weui_btn btn_lizhan" value="提交" /></div>
		</div>
	</div>
</div>

@@include("_foot.html")

<script>
    $(function () {
        var file = $(".weui_uploader_input"),
            submitBtn = $(".xq_button"),
            files,
            n = 0;
        // 添加相片并预览
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
                var file = file.files[0];
                var ul = $(".weui_uploader_files");
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    // 拼接显示预览图片的html
                    n +=1;
                    var list = $("<li class='weui_uploader_file' style='position: relative'>" +
                        "<img id='preview" + n + "' style='width: 100%;height: 100%'>" +
                        "<span id='delImg" + n+ "' style='position: absolute; top: 0; right: 4px; color: #e4007f'>X</span></li>");
                    ul.append(list);
                    // 将转化后的图片地址放在img中
                    var pic = document.getElementById('preview' + n);
                    pic.src = this.result;
                    document.getElementById('delImg' + n).addEventListener("click", function () {
                        $(this).parent().remove();
                    })

                }
            }
        }

        // ajax提交表单
        submitBtn.on("click", function () {
            var content = $(".weui_textarea").text();
            var data = {
                remark: content,
                images: new FormData($('#uploadForm')[0])
            };
            // 提交成功，返回到代理主页
            function redirectProxyHome(json) {
                //location.href = "";
                console.log(json);
            }
            Utils.ajaxFile(CONFIG.API.addSubProxyRecruit, data, redirectProxyHome)
        })
    })
</script>
</body>
</html>
```
### 8. 合并含有相同对象元素的数组

```
var arr = [{a:1,b:2}, {a:1,c:4}, {a:5,d:8}, {a:5,f:22}];

/* var arr2= [
 *          [{a:1,b:2},{a:1,c:4}],
 *          [{a:5,d:8},{a:5,f:22}]
 *     ];
*/

var splitArr = function (arr) {
    var obj = {},
        result = [];
    arr.forEach(function (item, index, arr) {
        var m = arr[index].a;
        if(!obj[m]) {
            obj[m] = [item];
            //[].push.call(obj[m],item);
        }else {
            [].push.call(obj[m],item);

        }

    });
    //[].push.call(obj.m, "fff");
    console.log(obj)
};
splitArr(arr)
```
### 9. 用eval()将字符串解析为数组

````
var a = '[{a:1,c:4},{b:33,x:0}]';
eval(a);

[Object, Object]

````



