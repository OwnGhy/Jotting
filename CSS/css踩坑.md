## CSS踩坑
### 多行文本溢出省略显示-webkit-box-orient: vertical;属性不渲染问题
实现多行文本溢出省略显示的方法主要有两种：

- 方法一：使用after在段后显示...

```
p {
    position:relative;
    line-height:1.5em;
    /* 高度为需要显示的行数*行高，比如这里我们显示两行，则为3 */
    height:3em;
    overflow:hidden;
}
p:after {
    content:"...";
    position:absolute;
    bottom:0;
    right:0;
    padding: 0 5px;
    background-color: #fff;
}
```
- 方法二：WebKit内核浏览器解决办法

```
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```
- display: -webkit-box 将对象作为弹性伸缩盒子模型显示；
- -webkit-box-orient 设置或检索伸缩盒对象的子元素的排列方式；
- text-overflow: ellipsis 用省略号“…”隐藏超出范围的文本。
但是第二种方法存在的问题是，-webkit-box-orient: vertical;已被废弃，不能编译。为了使其可用，需要在webpack中进行配置。

```
var postcss = require('postcss');

var css = postcss([
  require('postcss-cssnext')({
    browsers: 'chrome >= 42, safari >= 8',
    features: {
      autoprefixer: {remove: false}
    }
  })
]).process(`
.foo {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
}`).css;

console.log(css);
```
参考：[https://github.com/postcss/autoprefixer/issues/776](https://github.com/postcss/autoprefixer/issues/776)

---

### 使用scrollTop获取到始终为0？
今天遇到这样的需求，需要使用scrollTop结合pageY计算出鼠标相对于浏览器窗口的位置。但是始终获取scrollTop结果为0。如图所示。
![scrollTop.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/scrollTop.jpeg?raw=true)

从右边的滚动条看出页面滚动了，但是获取不到滚动的值。

原因：scrollTop获取的是元素自己被卷去的高度，针对设置了```overflow:scroll;```样式的元素。针对自己由于内容超过浏览器高度或宽度的滚动不属于scrollTop的类型。

解决办法：给元素设置明确的宽高与```overflow:scroll;```

---

### float与position:absolute;脱离文档流的区别
position:absolute和float都是使元素脱离文档流。

- position:absolute的元素是根据最近的非static的父元素定位，如果没有，则根据最初的包含块定义（一般是body）
- float，也会脱离文档流，会被放置在其容器的左边或右边。但是，文字会围绕float的元素，所以float的元素在文档流还是占有位置。

参考：[https://segmentfault.com/q/1010000002924699](https://segmentfault.com/q/1010000002924699)

###### 补充：清除浮动的方法
- 使用伪元素after

```
.clearfix{
  content: '.';
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
}
.clearfix{
	zoom:1;  //为了兼容IE
}
```
- 使用额外标签

```
.clear {
	clear: both;
}
```
- 使用overflow:hidden;原理为BFC
- 父元素也浮动
- 使用table标签而不使用div

---

### 行内元素使用overflow:hidden导致元素上移？？

```

<div style="position:absolute;left:0;top:0;background:black;color:white;font-size:24px;">
	<span style="background:red;margin:0;">
		<span>sss</span>
		<span style="overflow:hidden;display:inline-block;">sss</span>
		sss
	</span>
  </div>
```
![inline_move.png](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/inline_move.png?raw=true)

上面的代码得到上图：可以看到中间的SSS上移了一丢丢


![黑人问号.jpg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/黑人问号.jpg?raw=true)

原因：我们知道span是行内元素即inline，但是添加了overflow之后其变成了inline-block元素且为BFC。
所以它在IFC中vertical-align:baseline 中 baseline 文字就不是其内部文字的 baseline了，成为了BFC元素底边界。
而BFC的line-height默认值 normal，这就导致了元素的上移。

解决方法：中间的span元素使用vertical-align: bottom; 或者 top ；或者改小它的 line-height 即可解决。

###### 补充：什么是BFC？
参考：[http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

好文：[http://www.cnblogs.com/fsjohnhuang/p/5259121.html](http://www.cnblogs.com/fsjohnhuang/p/5259121.html)

###### Box: CSS布局的基本单位
Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：
> block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
> 
> inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
> 
> run-in box: css3 中才有， 这儿先不讲了。

###### Formatting context
Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。

###### BFC定义
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

###### BFC布局规则
1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

###### 哪些元素会生成BFC?
1. 根元素
2. float属性不为none
3. position为absolute或fixed
4. display为inline-block, table-cell, table-caption, flex, inline-flex
5. overflow不为visible

###### BFC的应用
- 自适应两栏布局：借用**BFC的区域不会与float box重叠。**规则
- 清除内部浮动：借用**计算BFC的高度时，浮动元素也参与计算**规则，使父元素为BFC
- 防止垂直 margin 重叠：借用**Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠**规则，使其属于不同的BFC。

---
### 0.8宽度border导致iphone白边?
描述：我给div设置了.8的border，最后一个border设置为border none，但是出现了白边。

解决办法： 使用1px的border

---
