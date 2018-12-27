# HTML 5 之文件上传

### 一、FileReader

> https://developer.mozilla.org/en-US/docs/Web/API/FileReader

`FileReader` 对象允许Web应用程序异步读取存储在用户计算机中的文件（或缓冲区的原始数据），使用File或Blob对象指定要读取的文件或数据。

#### 1.1 实例化

`var reader = new FileReader() `

#### 1.2 事件类型

* `FileReader.onload`
  * 每次成功完成读取操作完成时触发loading事件	
* `FileReader.onprogress`
  * 读取Blob 内容时触发进度 progress 事件

#### 1.3 方法

* `FileReader.readAsDataURL()`

  * 开始读取指定的Blob内容，完成后，result 属性包含一个用URL表示的文件数据。

* `FileReader.readAsArrayBuffer()`

  * 开始读取指定的Blob内容，完成后，result 属性包含一个用 `ArrayBuffer` 表示的文件数据。

    HTML

    ```
    <input type="file" onchange="previewFile()"><br>
    <img src="" height="200" alt="Image preview...">
    ```

    JavaScript

    ```
    function previewFile() {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
    ```



* `FileReader.readAsText()`
  * 开始读取指定的Blob内容，完成后，result 将文件的内容作为一个文本字符串。

#### 1.4 兼容性

![1](C:\Users\PC\Desktop\1.png)

### 二、在Web应用中使用files对象

> https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

使用在HTML5中添加到DOM的`File API`，用户可选择本地文件，然后读取这些文件的内容。 你可以通过使用HTML <input>元素或通过拖放来完成。

#### 2.1 访问所选文件

```
<input multiple id="upload_input" type="file" accept="image/*" name='image' />

使用原生DOM选择器获取元素
var files = document.getElementById('upload_input').files;
```

files 是一个对象，包含着所选文件列表的信息和一个 length 属性

```
> console.log(files);
< FileList {0: File, 1: File, 2: File, length: 3}
<FileList
	0:File
		lastModified:1481789988885
		lastModifiedDate:Thu Dec 15 2016 16:19:48 GMT+0800 (中国标准时间)
		name:"my_order.png"
		size:93453
		type:"image/png"
		webkitRelativePath:""
	1:File
	2:File
	length:3
```

#### 2.2 通过change 事件访问所选文件

```
var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    var fileList = this.files; /* now you can work with the file list */
}
```

#### 2.3 获取所选文件的基本信息

访问files对象的自带的`length`属性，得到被选择文件的个数：

```
var numFiles = files.length;
```

可以通过数组列表，检索出被选择的单个文件：

```
for (var i = 0, numFiles = files.length; i < numFiles; i++) {
  var file = files[i];
  ..
}
```

每个 file 对象拥有三个属性，包含着文件的name,size,type

name：文件名，只读，不包含文件路径；

size：文件字节数，64-bit 整型；例如`92kb` 的文件，它的size = 92 * 1024 b;

type：文件的MIME类型，若不确定则为“”（空）。

#### 2.4 使用click 方法隐藏 input 元素

```
<input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
<a href="#" id="fileSelect">Select some files</a>
```

给隐藏的 input 增加事件

``````
var fileSelect = document.getElementById('fileSelect'),
	fileEle = document.getElementById('fileElem');
fileSelect.addEventListener('click', function(e) {
	if(fileEle) {
      	fileEle.click();
	}
}, false)
``````



### 三、实例

#### 3.1 显示用户选中图片的缩略图

```
var showThumbnails = function (files) {
    for(var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;

        if(!imageType.test(file.type)) {
            continue;
        }
        var img = document.createElement('img');
        img.classList.add('obj');
        img.file = file;
        preview.appendChild(img); // 假设preview是缩略图的展示位置

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result; // e.target 指向 reader
            }
        })(img)
    }
}
```

> 每个缩略图都添加了一个 obj 的类名，方便后期查找。还向每个图像指定了一个指向文件的file属性，以供稍后实际上传，然后用`Node.appendChild()` 将新的缩略图添加到预览区域。
>
> 紧接着，我们实例化了一个 `FileReader` 来处理异步加载图像并将其附加到`img` 元素上。调用`readAsDataURL()` 在后台启动读取操作，图像加载完毕，它们将被转换为传递给`onload`回调的数据：URL。



```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <title></title>
</head>
<body>
<div class="logo">
    <img src="111.png" />
</div>
<div class="upload">
    <p>上传图片</p>
    <form>
        <input multiple id="upload_input" type="file" />
    </form>
</div>
</body>
<script>
    window.onload = function () {
        var Upload = {
            change: function () {
                var oform = document.querySelector('form'),
                    oFiles = document.getElementById('upload_input').files;
                console.log(oFiles)
                for(var key in oFiles) {
                    if(oFiles.hasOwnProperty(key)) {
                        console.log('file_name:'+oFiles[key].name);
                        console.log('file_size:'+oFiles[key].size);
                        console.log('file_type:'+oFiles[key].type);
                    }
                }

            }
        };
        document.getElementById('upload_input').addEventListener('change',Upload.change);
    }
</script>
</html>
```
### 四、FormData  

> https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

#### 4.1 实例化

`var formData = new FormData(form)`

> form参数：HTML <form>元素 - 当指定时，将使用表单的每个元素的name属性以及它们提交的值为表单的当前键/值填充FormData对象。 它还将编码文件输入内容。

#### 4.2 填充内容

##### 4.2.1 使用 fromData.append

创建一个空对象：

```
var formData = new FormData(); // Currently empty
```

然后使用`FormData.append()`以key/value的形式增加内容：

```
formData.append('username', 'Chris');
```

##### 4.2.2 指定表单参数

```
var myForm = document.getElementById('myForm');
formData = new FormData(myForm);
```

#### 4.4 使用FormData  对象上传

> https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

使用jQuery  上传文件：

```
var fd = new FormData(document.querySelector("form"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
  type: "POST",
  data: fd,
  processData: false,  // tell jQuery not to process the data
  contentType: false   // tell jQuery not to set contentType
});
```

使用XMLHTTPRequest  上传：

```
var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function(ev) {

  var oOutput = document.querySelector("div"),
      oData = new FormData(form);

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "stash.php", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
    }
  };

  oReq.send(oData);
  ev.preventDefault();
}, false);
```

#### 4.5 兼容性

所有主流浏览器的较新版本都已经支持这个对象了，比如Chrome 7+、Firefox 4+、IE 10+、Opera 12+、Safari 5+。



















