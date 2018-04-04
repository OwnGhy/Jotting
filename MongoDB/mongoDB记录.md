## mongoDB记录
### mongo服务启动
```
cd /usr/local/mongodb/bin/
sudo ./mongod
```

新终端窗口:

```
cd /usr/local/mongodb/bin/
./mongo
```

### mongoDB数据结构设计
其实官网的这篇设计哲学还是很不错的([https://docs.mongodb.com/manual/data-modeling/](https://docs.mongodb.com/manual/data-modeling/))

 MongoDB和传统SQL schema设计上最大的区别就是关于模型关系用什么方法表示比较好(在MongoDB里即可以用Link,又可以用Embedded)
简单总结下：

1. FirstClass （比如“User”这种） 应该用独立的Collection
2. "条目类型"的，应该 embedded
3. 两个模型之间如果是包含关系，用 embedded
4. 多对多关系，用 link(类似sql里面的foregin key)
5. 如果一个模型，其可能存的对象很少，那么就用独立的collection，这样有助于mongodb server做缓存
6. embedded方式不利于做复杂的关联，复杂的查询
7. embedded方式性能很有优势，如果你有“性能”方面的要求，可以考虑用embbed

文章：

[Mongodb架构设计浅谈](https://juejin.im/post/5a0e370cf265da430d579392)

[更优雅的Mongorito](https://juejin.im/post/5a16a78ef265da432717e653)

[RESTful API 设计最佳实践](http://www.zcfy.cc/article/restful-api-design-best-practices-in-a-nutshell-4388.html)

[mongoose](http://mongoosejs.com/docs/connections.html)