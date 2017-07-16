# 表单操作

## 一、input

### 1.1 checkbox 相关

#### 1.1.1 点击全选或取消选中

```
ele.click(function () {
   	var checkBox = $(":checkbox");
	if($(this).prop("checked")) {
    	checkBox.prop("checked", true);
	}else {
    	checkBox.prop("checked", false);
	}
});
```