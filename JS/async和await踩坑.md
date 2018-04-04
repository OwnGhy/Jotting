## async和await踩坑
一开始这样写，将数据库查询的结果处理在回调中进行处理返回，然后根据返回值来响应请求。

问题：

1. 这里出现了await后面的代码先于await后面的回调的执行，输出不符合预期。
2. 逻辑上来说，处理多了一层，操作更麻烦，阔以在回调中直接进行响应请求的操作

```
exports.updateUser = async (ctx, next) => {
    let data = ctx.request.body;
    let testUpdateRes = await Test.update({_id: data._id}, {$set: {name: data.name}}, (err, docs) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(docs);
            return docs;
        }
    });
    console.log(testUpdateRes);
    if (testUpdateRes)
    {
        Response.success(ctx, testUpdateRes)
    }
    else
    {
        Response.error(ctx, code.UNKNOWN_ERR)
    }
}

```

出错原因：单纯的把await理解为等待其后面代码执行完毕之后再进行下一步。但await本身就是用来解决回调地狱这一问题，所以应该用promise的方式来处理操作。 

测试如下：

###### 正常输出情况
![async_await1.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/async_await1.jpeg?raw=true)

###### 抛出异常情况
![async_await2.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/async_await2.jpeg?raw=true)

###### catch异常
![async_await3.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/CSS/async_await3.jpeg?raw=true)