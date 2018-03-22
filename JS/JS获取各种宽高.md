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