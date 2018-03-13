### 彻底理解JS中0.1 + 0.2 != 0.3
一直都知道js一道很坑daddy的面试题0.1 + 0.2 != 0.3，也知道是浮点数精度问题，但是却只知道皮毛，并不是真的理解其中的原理和为什么。

然后今天遇到了这样的一道题

```
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
console.log(two - one == one)
console.log(eight - six == two)
```

想着0.1 + 0.2 != 0.3，反推0.2 - 0.1肯定也不等于0.1啊。但是没想到最后打印的是true和false。所以彻底把我弄懵了。

打算好好学习下关于js浮点数精度的问题。

参考文章： [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)