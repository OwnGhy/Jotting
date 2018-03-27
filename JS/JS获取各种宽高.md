##JS获取各种宽高

### JS获取宽高API
- 页可见区域宽： document.body.clientWidth; 
- 网页可见区域高： document.body.clientHeight; 
- 网页可见区域宽： document.body.offsetWidth (包括边线的宽); 
- 网页可见区域高： document.body.offsetHeight (包括边线的宽); 
- 网页正文全文宽： document.body.scrollWidth; 
- 网页正文全文高： document.body.scrollHeight; 
- 网页被卷去的高： document.body.scrollTop; 
- 网页被卷去的左： document.body.scrollLeft; 
- 网页正文部分上： window.screenTop; 
- 网页正文部分左： window.screenLeft; 
- 屏幕分辨率的高： window.screen.height; 
- 屏幕分辨率的宽： window.screen.width; 
- 屏幕可用工作区高度： window.screen.availHeight;

### JS获取鼠标相关的位置
参考：https://www.cnblogs.com/dolphinX/archive/2012/10/09/2717119.html
##### 相对于屏幕

```
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.screenX,'y':screenY}
}
```
##### 相对于浏览器窗口

```
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.clientX,'y':clientY}
}
```

##### 相对于文档

```
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}
```

### 关于getBoundingClientRect()方法
Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
语法

```
rectObject = object.getBoundingClientRect();
```
返回值

返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。

DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
![获取的位置](https://mdn.mozillademos.org/files/15087/rect.png)