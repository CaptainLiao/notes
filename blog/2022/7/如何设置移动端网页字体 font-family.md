## 是什么
font-family 用于设置网页字体，格式为：`font-family: [ <family-name> | <generic-family> ]`。

`<family-name>`

表示一个字体族的名字。例如"PingFang SC" 和 "Helvetica"，可以包含空格，但**包含空格时应该用引号**。

<[generic-family](https://drafts.csswg.org/css-fonts-4/#valdef-font-family-serif)>

通用字体族名是一种备选机制，都是关键字，所以**不可以**加引号。在列表的末尾应该至少有一个通用字体族名。以下是该属性可能的取值。
* serif 带衬线字体，笔画结尾有特殊的装饰线或衬线。如：Song
* sans-serif 无衬线字体，即笔画结尾是平滑的字体。如：Arial, Helvetica, Hei。
* monospace 等宽字体，即字体中每个字宽度相同。
* system-ui 从浏览器所处平台处获取的默认用户界面字体。
* emoji 专门用于呈现 Emoji 表情符号的字体。
* ...

举个例子：
````css
body {
  font-family: Helvetica, "PingFang SC", sans-serif;
}
````
如果`Helvetica`可用，渲染时就使用它。如果`Helvetica`或`"PingFang SC"`都不存在，则使用通用字体`sans-serif`。

## 常用字体（family-name）
* Roboto 西文无衬线字体，Android 4.0 发布，对应中文字体"Noto Sans"，思源雅黑
* "PingFang SC" 苹果官方中文字体
* "Segoe UI" 西文无衬线体，是由微软公司开发的并且广泛使用的字体
* "Microsoft YaHei" 中文无衬线字体
* "Helvetica Neue" Helvetica 的升级版，广泛使用于拉丁字母的无衬线字体

## font-family 设置
````css
body {
  font-family:
    system-ui, // 使用系统默认字体
    -apple-system, BlinkMacSystemFont, // system-ui 兼容写法
    "Segoe UI", "Helvetica Neue",  // 各种西文字体
    "PingFang SC", "Microsoft YaHei", // 中文字体
    sans-serif, // 以上都未命中，使用系统已安装的无衬线字体
}
````
### Android 系统
原生Android下中文字体与英文字体都选择默认的无衬线字体。

4.0之前版本英文字体原生Android使用的是Droid Sans，中文字体原生Android会命中Droid Sans Fallback。

4.0+ 中英文字体都会使用原生Android新的Roboto字体。

其他第三方Android系统也一致选择默认的无衬线字体。

Android 就直接让它命中系统字体吧，因为你无法预知发行厂商会去内置什么字体，或者人家root去修改什么字体。

## 引用
[AlloyTeam/Mars字体设置](https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md)

[css-fonts-4/](https://drafts.csswg.org/css-fonts-4/#valdef-font-family-serif)

[谈谈一些有趣的CSS题目（16）-- 你该知道的字体 font-family](https://github.com/chokcoco/iCSS/issues/6)
