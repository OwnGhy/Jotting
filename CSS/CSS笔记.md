## CSS笔记

### 修改复选框checkbox的默认样式
参考文章：[复选框样式修改方法](https://www.cnblogs.com/qqfontofweb/p/7017229.html)

核心：

1. 通过-webkit-appearance:none;清除复选框默认样式
2. 给复选框添加背景图片
3. 根据复选框不同的选中状态设置背景图片的位置。

图片如下：
![checkbox.png](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/checkbox.png?raw=true)

代码：

```
input[type="checkbox"] {
  -webkit-appearance: none;  /*清除复选框默认样式*/
  background: #fff url(checkbox.png);
  height: 22px;   /*高度*/
  vertical-align: middle;
  width: 22px;
}
input[type="checkbox"]:checked {
  background-position: -48px 0;
}
```
---
### tr加外边距？
tr：内联元素。所以直接设置margin无效。

若将tr设置为块级元素再设margin，tr会失去table特有的样式，每一列的对齐将失效。
﻿

解决办法：

1.给每一行tr设置外边距的方法：

```
table{
    border-collapse:seperate;
    border-spacing:10px 0;/*10表示tr行间距，0表示列间距*/
}
```
2.每间隔两行设间距：增加一个tr来充当间距。

```
 table tbody tr:nth-child(3n){
    height: 10px;
}
```

---
### CSS reset?
不同核心的浏览器对CSS的解析效果呈现各异，导致您所期望的效果跟浏览器的“理解”效果有偏差。

css reset就是用来重置（复位）元素在不同核心浏览器下的默认值，尽量保证元素在不同浏览器下的同一“起跑线”。 

CSS reset(css重置)基本上是不需要的，至少可以说80%的的CSS reset都是没有必要的，反而增加了页面CSS 的重写，尤其像*{margin:0;}的做法更加错误（反而破坏了很多UI的兼容性，比如说单复选框等）。

参考：[http://html5reset.org/](http://html5reset.org/)
