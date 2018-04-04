## Docker笔记

### 概念
Docker有三个组件和三个基本元素，读者可以快速浏览下面这个视频来了解这些组建和元素，以及它们的关系。三个组件分别是：

* Docker Client 是用户界面，它支持用户与Docker Daemon之间通信。
* Docker Daemon运行于主机上，处理服务请求。
* Docker Index是中央registry，支持拥有公有与私有访问权限的Docker容器镜像的备份。

三个基本要素分别是：

* Docker Containers负责应用程序的运行，包括操作系统、用户添加的文件以及元数据。
* Docker Images是一个只读模板，用来运行Docker容器。
* DockerFile是文件指令集，用来说明如何自动创建Docker镜像。

![docker.jpeg](https://github.com/OwnGhy/Jotting/blob/master/assets/docker/docker.jpeg?raw=true)

### 命令
- 安装：brew cask install docker\
- 查看版本：docker -v

```
docker-compose -v
docker-machien -v
```

- 运行一个nginx服务器：docker run -d -p 80:80 --name webserver nginx
- 停止nginx服务器：docker stop webserver
- 删除服务：docker rm webserver
- 获取镜像：docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
- 获取ubuntu镜像：docker pull ubuntu:16.04
- 启动ubuntu的bash并进行交互式操作：
- 列出镜像：docker image ls
- 查看镜像、容器、数据卷所占用的空间：docker system df
- 删除虚悬镜像：docker image prune
- 列出中间层镜像：docker image ls -a
- 删除镜像：docker image rm [选项] <镜像1> [<镜像2> ...]
- 进入容器：docker exec
- 查看改动：docker diff xxx
- 将容器保存成镜像：docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]
- 查看镜像内的历史： docker history nginx:v2
- 镜像构建：docker build [选项] <上下文路径/URL/->
- 镜像构建： docker build -t nginx:v3 .


