## for循环、for-in、forEach、for-of

### for循环
**要遍历数组，最简单的方式即for循环：**

```
var a = [1,2,3],
len =a.length;
for(var i=0 ; i < len ; i++){
console.log(a[i]);
}
```
这样的方式是最简单直接的方法，但是这样的方式**需要的变量比较多**。

### forEach
在ES5之后，我们可以使用**forEach**进行数组遍历,这种方法更加简洁，但是不能使用breack语句中断循环，也不能使用return语句返回到外层函数。

```
var a = [1,2,3],
len =a.length;
a.forEach(function(el,index){
  console.log(index +":"+el);
});
//0:1
//1:2
//2:3
```

### for-in
**for-in是另一种方式**,但是有几个缺点：
 - index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”。
 - for-in循环体还会遍历自定义的属性，数组原型链上的属性都能被访问到。
 - for-in按照**随机顺序**遍历数组元素。
 - 
```
for (var index in a) { // 千万别这样做
  console.log(a[index]);
}
```

### for-of
强大的**for-of循环**，是ES6的新语法。

```
for (var value of myArray) {
  console.log(value);
}
```
 - 这是最简洁、最直接的遍历数组元素的语法
 - 这个方法避开了for-in循环的所有缺陷
 - 与forEach()不同的是，它可以正确响应break、continue和return语句

总之，for-in循环用来遍历对象属性；for-of循环用来遍历数据—例如数组中的值。for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM [NodeList对象]。for-of循环也支持**字符串遍历**，它将字符串视为一系列的Unicode字符来进行遍历：

```
for (var chr of "ab") {
  console.log(chr);
}
//a
//b
```







