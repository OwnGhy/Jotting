## Object API
### Object.create()
使用指定的原型对象及其属性去创建一个新的对象。

MDN：[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

### Object.assign()
用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

MDN：[Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

用途：合并对象、合并具有相同熟悉的对象（覆盖）、拷贝symbol类型的属性、继承属性和不可枚举属性是不能拷贝的

### Object.keys()
返回一个由一个给定对象得自身可枚举属性组成得数组，数组中属性名得排列顺序和使用for...in蓄暖遍历该对象时返回得顺序一致（两者得主要区别是一个for-in循环还会枚举其原型链上得属性）。

MDN：[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

### Object.getOwnPropertyNames()
该方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

MDN：[Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

### Object.is()
判断两个值是否是相同的值。

Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
- 都是正零 +0
- 都是负零 -0
- 都是 NaN
- 都是除零和 NaN 外的其它同一个数字

这种相等性判断逻辑和传统的 == 运算符所用的不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 为 true 的现象），但 Object.is 不会做这种类型转换。

这与===运算符也不一样。===运算符（和==运算符）将数字值-0和+0视为相等，并认为Number.NaN不等于NaN。
