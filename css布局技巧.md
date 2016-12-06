# CSS布局技巧

### 1. 文本溢出...

#### 1.1 单行文本溢出

````javas
.inaline {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
````

#### 1.2 多行文本溢出

````javas
.intwoline {
  display: -webkit-box !important;
  overflow: hidden;
  
  text-overflow: ellipsis;
  word-break: break-all;
  
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
````

