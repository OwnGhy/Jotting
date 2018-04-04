## Git命令记录
### clone相关
1. 克隆指定分支:git clone -b branch remote-url
2. 克隆到指定目录:git clone remote-url “dir”

### 分支相关
1. 创建新分支并与远程相关联
   - git checkout -b dev origin/dev
   - git checkout -t dev/origin

### 远程
1. 查看远程连接:git remote -v
2. 添加远程连接:git remote add origin <remote-url>
3. 删除远程连接:git remote remove origin


### 回滚

(参考文章：[http://blog.csdn.net/ligang2585116/article/details/71094887](http://blog.csdn.net/ligang2585116/article/details/71094887))

- 回滚最后一次远程提交
   
方法一：使用revert
   
```
git revert HEAD
git push origin master
```

方法二： 使用reset
   
```
git reset —hard HEAD^
git push origin master -f
```

两者区别：
> revert是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
>
> reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。

- 回滚某一次提交
       git log
       git revert commitID