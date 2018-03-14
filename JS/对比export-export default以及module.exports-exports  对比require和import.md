## 对比export/export default以及module.exports/exports  对比require和import
ES6和nodejs流行之后，经常会使用export，import，module.exports一类模块导入导出的语法，其实对于他们的实际使用场景和区别我是很晕的，踩了坑才发现需要区别它们的使用。

### 模块
模块思想的出现致使我们阔以方便的引入导出代码，将一些可复用的功能封装导出或引入。所以阔以分享代码以及实现复用性的组件。

### 规范
JS的模块规范有CommonJS和AMD两种。
CommonJS 用于服务端，即 nodeJs 加载模块的方式。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。模块之间通过 require 进行加载。

AMD 加载方式用于浏览器环境中，因为浏览器从网络加载 JS 有延迟，无法像 nodeJs 服务器环境一样直接读文件。所以使用 define('moduleName',['dependences'], function(){}) 这种方式定义模块。

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

### 服务器端Nodejs
导入：require
导出：module.exports或exports

### 浏览器端
导入：import或require
导出：export或export default

### 对比module.exports与exports
module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
而exports变量是指向module.exports的，所以阔以直接在 exports 对象上添加方法，表示对外输出接口。等同于在 module.exports 上添加方法。

```
function add (flag) {
  return flag + 1
}
module.exports.x = 1
exports.add = add
```
### 对比export与export default
export方法导出一组方法或变量
export default方法导出一个方法或变量
例如： 

```
// export方法
export const a = 1
export const b = () => {
  console.log('func')
}

//export default方法
const c = {
  a: '1',
  b: function () {}
}
export default c
```
使用这两种方式导出的模块在导入也有区别

```
// 对于export方法导出的模块
import { a } from './xxx'

// 对于export default方法导出的模块
import c from './xxx'
```
参考于：
[https://seekbetter.me/2017/10/28/2017/module.exports%E4%B8%8E%20exports%EF%BC%8C%20export%E5%92%8C%20export%20default,%20import%20%E5%8F%8A%20require%20%E7%9A%84%E5%85%B3%E7%B3%BB/](https://seekbetter.me/2017/10/28/2017/module.exports%E4%B8%8E%20exports%EF%BC%8C%20export%E5%92%8C%20export%20default,%20import%20%E5%8F%8A%20require%20%E7%9A%84%E5%85%B3%E7%B3%BB/)


[http://www.jianshu.com/p/076f2af97db0](http://www.jianshu.com/p/076f2af97db0)

其次，一些语法的书写阔以浏览

[http://www.infoq.com/cn/articles/es6-in-depth-modules](http://www.infoq.com/cn/articles/es6-in-depth-modules)

