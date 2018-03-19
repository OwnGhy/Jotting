## CSS笔记

### 修改复选框checkbox的默认样式
参考文章：[复选框样式修改方法](https://www.cnblogs.com/qqfontofweb/p/7017229.html)

核心：

1. 通过-webkit-appearance:none;清除复选框默认样式
2. 给复选框添加背景图片
3. 根据复选框不同的选中状态设置背景图片的位置。

图片如下：
![]()

代码：

```
input[type="checkbox"] {
  -webkit-appearance: none;  /*清除复选框默认样式*/
  background: #fff url(i/blue.png);
  height: 22px;   /*高度*/
  vertical-align: middle;
  width: 22px;
}
input[type="checkbox"]:checked {
  background-position: -48px 0;
}
```