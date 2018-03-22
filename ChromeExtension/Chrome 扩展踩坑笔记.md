## Chrome 扩展踩坑笔记
### 版本问题
参考链接： [Current Version](https://developer.chrome.com/extensions/manifestVersion)

manifest_version的版本应为2，manifest_version为1已经被弃用。

### dom操作时机
刚开始开发chrome的时候就想着尝试为popup弹出框处理一些基本的操作。如下：为popup中的一个id为test的按钮添加点击事件。

```
$('#test').on('click', function () {
    console.log('test')
});
```

但是发现怎么都没有事件响应叻。emm...

解决办法：需要在dom加载完之后才能操作dom哦。不然会事件绑定失败～

```
window.addEventListener('DOMContentLoaded', function () {
    // 在这外面绑定无效
    $('#test').on('click', function () {
        console.log('test')
    });
});
```

### 三个不同的js文件处理不同的功能
一个chrome扩展一般会包含popup.js、contentscript.js以及background.js。一开始我是很迷茫的，就不知道该在哪里写操作...纠结了一番总结如下：

- popup.js：popup框的js操作逻辑，包括popup框的事件绑定和dom操作等。
- contentscript.js：实际页面的js操作逻辑，包括实际页面的事件绑定、dom操作以及请求发送等。
- background.js：还没接触过，理解为对于后台的处理，后台是一个常驻页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。