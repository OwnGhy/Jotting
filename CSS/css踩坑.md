## css踩坑
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