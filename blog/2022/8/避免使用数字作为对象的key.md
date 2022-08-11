## 背景
同事开发一个表格，一次性渲染5w+条数据。但在渲染某些数据时，内存暴增，经排查，发现其数据用了数字`90`作为对象的key。

## 分析
我们猜测，当用数字作为对象的key时，数据将以数组的形式进行存储。由于其中拥有大量的节点（空节点也要占据内存），导致内存飙升。

使用chrome浏览器无痕模式进行验证，在控制台输入如下测试代码，观察内存变化：
````js
let a = {}
let indexValue = 200

for(var i = 0; i < 500; i++) {
    a[i] = {}
    for (var j = 0; j < 500; j++) {
        a[i][j] = {}
        a[i][j][indexValue] = {}
    }
}
````
通过不断改变`indexValue`的值，得到`indexValue`和内存占用的关系如下：
| indexValue | memory size(M) |
|------------|----------------|
|  9         | 50             |
|  90        | 171            |
|  200       | 336            |
|  500       | 786            |
|  600       | 936            |
|  1023      | 1572           |
|  1024      | 35             |
|  1028      | 35             |
|  9999      | 35             |

可以看到，随着`indexValue`的不断增加，内存也不断升高，直到`indexValue`值为1023时内存占用达到顶峰，随后立即断崖式下降。

v8 的官网文章[fast-properties](https://v8.dev/blog/fast-properties)也有提及。

## 结论
当我们使用对象存储数据时，不要用数字作用对象的key，以避免内存浪费。

## 引用
* [fast-properties](https://v8.dev/blog/fast-properties)
* [How is data stored in V8 JS engine memory?](https://blog.dashlane.com/how-is-data-stored-in-v8-js-engine-memory/)

