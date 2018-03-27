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

### 使用scrollTop获取到始终为0？
今天遇到这样的需求，需要使用scrollTop结合pageY计算出鼠标相对于浏览器窗口的位置。但是始终获取scrollTop结果为0。如图所示。
![scrollTop.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/scrollTop.jpeg?raw=true)

从右边的滚动条看出页面滚动了，但是获取不到滚动的值。

原因：scrollTop获取的是元素自己被卷去的高度，针对设置了```overflow:scroll;```样式的元素。针对自己由于内容超过浏览器高度或宽度的滚动不属于scrollTop的类型。

解决办法：给元素设置明确的宽高与```overflow:scroll;```