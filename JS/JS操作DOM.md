### DOM节点
DOM节点通常对应于一个标签，一个文本，或者一个HTML属性。DOM节点有一个nodeType属性用来表示当前元素的类型，它是一个整数：

1. Element，元素
2. Attribute，属性
3. Text，文本

### 创建新节点
- document.createElement // 创建一个元素
- document.createTextNode // 创建一个文本节点
- document.createDocumentFragment // 创建一个DOM片段

### 添加、移除、替换、插入节点
- appendChild()
- removeChild()
- replaceChild()
- insertBefore()

### 查找节点
- getElementsByTagName()    //通过标签名称
- getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
- getElementById()    //通过元素Id，唯一性
- querySelector()  // 查询匹配的第一个元素
- querySelectorAll() // 查询匹配的所有元素
- getElementsByClassName() // 有兼容性问题
解决兼容性问题的办法：

```
function getElementsByClassName(className) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(className);
    } else {
        var els = document.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < els.length; i++) {
            if(els[i].className === className){
                result.push(els[i]);
            }
        }
        return result;
    }
}
```

### 获取父元素、父节点
- el.parentElement
- el.parentNode
- el.offsetParent // 最近的有定位的父节点

### 获取子元素、子节点
- el.childNodes
- el.firstChild
- el.lastChild

### 获取兄弟元素、兄弟节点
- el.nextSibling
- el.previousSibling
- el.nextElementSibling
- el.previousElementSibling

### 属性操作
- el.attributes // 获取所有属性
- el.getAttribute() // 获取某一个属性
- el.setAttribute() // 设置属性
- el.hasAttribute() // 判断是否有属性
- el.removeAttribute() // 移除属性

### innerHTML与outerHTML的区别？
 比如对于这样一个HTML元素：
 
 ```
 <div>content<br/></div>
 ```
- innerHTML：内部HTML，```content<br/>```
- outerHTML：外部HTML，```<div>content<br/></div>```
- innerText：内部文本，content
- outerText：内部文本，content


参考：[ JS中常见原生DOM操作API【总结整理)](http://blog.csdn.net/hj7jay/article/details/53389522)