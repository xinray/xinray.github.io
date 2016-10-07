---
title: "Docker 学习笔记——介绍"
layout: post
category: Server
tags: [docker]
excerpt: "本文主要介绍了Docker的好处,与VM比较,并介绍了组成及架构。"
next-url: "note/note-php-syntax"
next-title : "笔记 - PHP 语法"
---


实习的时候接触到Docker 也用了一段时间，整理一下对docker的理解。
# 什么是Docker
Docker 是 [Docker.Inc](https://www.docker.com/) 公司开源的一个基于 LXC技术之上构建的Container容器引擎， 源代码托管在 GitHub 上, 基于Go语言并遵从Apache2.0协议开源。

![Docker-logo](http://oeeycy0kn.bkt.clouddn.com/docker-logo-compressed.png)

官网解释：
> Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications

因此可以把Docker理解为超轻量虚拟机的一种实现。

# Docker 功能
简化配置、代码流水线管理、提高开发效率、隔离应用、整合服务器、调试能力、多租户环境、快速部署。
## Docker 使用场景
Docker通常用于如下场景：
>* web应用的自动化打包和发布；
>* 自动化测试和持续集成、发布；
>* 在服务型环境中部署和调整数据库或其他的后台应用；
>* 从头编译或者扩展现有的OpenShift或Cloud Foundry平台来搭建自己的PaaS环境。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;让我们想象一个运行环境，当做一个管理系统的时候，需要nginx，php，mysql 以及一些其他的依赖。于是我需要安装这些软件，再装一堆依赖库，根据你的操作系统平台和版本进行设置，有时候还要从源代码编译报出一堆莫名其妙的错误亦或是软件版本的不同造成的问题，可不是这么好装。而且万一你机器挂了，所有的东西都要重新来，可能还要把配置在重新弄一遍。这十分的麻烦和浪费时间。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用Docker就可以帮你解决这方面的烦恼，就相当于有了一个可以运行起来的虚拟机，只要将Docker容器运行起来，就可以省略上述繁琐的配置和安装依赖。而且一旦你想换台机器，直接把这个容器端起来，再放到另一个机器就好了。硬件，操作系统，运行环境什么的都不需要考虑了。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;并且还可以通过Docker容器，整个开发、测试和生产环境可以保持高度的一致。


## 与VM不同
可以发现Docker容器功能和 VM 类似，那为啥不直接用 VM 而还要整出个容器这么个概念来呢？

因为相比于               VM Docker提供了轻量级的虚拟化，它几乎没有任何额外开销。对比如下：

| 项目 | 虚拟机 | Docker |
|:---: | :--------: | :-----: |
|启动与停止 | 比启动windows快 | 快速启动停止，几秒内 |
|占用资源 | 需正确解析合理分配 | 降低额外开销|
|耦合度| 在硬件设施上运行各种不一样的平台 | 可在不同硬件设施和应用环境中使用|
|结构图|![VM-structure](http://oeeycy0kn.bkt.clouddn.com/vm-structure.jpg)    |     ![Docker-structure](http://oeeycy0kn.bkt.clouddn.com/docker-structure.jpg)|

# Docker 架构和组成

Docker 使用客户端-服务器(C/S)架构模式，使用远程API来管理和创建Docker容器。Docker 容器通过 Docker 镜像来创建。

## 详细结构：
![Docker-cs-structure](http://oeeycy0kn.bkt.clouddn.com/docker-csstructure.jpg)
图片来源(http://www.wenwenyun.com/a/tip/2014/0926/552.html)

**1、**用户是使用Docker Client与Docker Daemon建立通信，并发送请求给后者。

**2、**Docker Daemon作为Docker架构中的主体部分，提供Server的功能使其可以接受Docker Client的请求；然后Engine执行Docker内部的一系列工作，每一项工作都是以一个Job的形式的存在。

**3、**Job的运行过程中，
 3、1当需要容器镜像时，则从Docker Registry中下载镜像，并通过镜像管理驱动graphdriver将下载镜像以Graph的形式存储；
 3、2当需要为Docker创建网络环境时，通过网络管理驱动networkdriver创建并配置Docker容器网络环境；
 3、3当需要限制Docker容器运行资源或执行用户指令等操作时，则通过execdriver来完成。

**4、**libcontainer是一项独立的容器管理包，networkdriver以及execdriver都是通过libcontainer来实现具体对容器进行的操作。

**5、**当执行完运行容器的命令后，一个实际的Docker容器就处于运行状态，该容器拥有独立的文件系统，独立并且安全的运行环境等。
详细内容见[Docker 架构](http://www.wenwenyun.com/a/tip/2014/0926/552.html)

## Docker 内部
Docker 内部构建，需要理解以下三种部件：

- Docker 镜像 - Docker images
- Docker 仓库 - Docker registeries
- Docker 容器 - Docker containers


### Docker 镜像
Docker 镜像是 Docker 容器运行时的只读模板，每一个镜像由一系列的层 组成。Docker 使用 UnionFS 来将这些层联合到单独的镜像中。当你改变了一个 Docker 镜像，比如升级到某个程序到新的版本，一个新的层会被创建。因此，不用替换整个原先的镜像或者重新建立(在使用虚拟机的时候你可能会这么做)，只是一个新的层被添加或升级了。现在你不用重新发布整个镜像，只需要升级，层使得分发 Docker 镜像变得简单和快速。

### Docker 仓库
Docker 仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker 仓库分为公有和私有。公有的 Docker 仓库名字是 Docker Hub。Docker Hub 提供了庞大的镜像集合供使用。这些镜像可以是自己创建，或者在别人的镜像基础上创建。Docker 仓库是 Docker 的分发部分。

>[Docker Hub](https://hub.docker.com/) 是一个用于分享、管理 Docker 容器的 Docker SaaS 平台。由Docker公司负责维护的公共注册中心，包含超过15,000个可用来下载和构建容器的镜像，并提供认证、工作组结构、工作流工具（比如webhooks）、构建触发器以及私有工具。

### Docker 容器
Docker 容器和文件夹很类似，一个Docker容器包含了所有的某个应用运行所需要的环境。每一个 Docker 容器都是从 Docker 镜像创建的。Docker 容器可以运行、开始、停止、移动和删除。每一个 Docker 容器都是独立和安全的应用平台，Docker 容器是 Docker 的运行部分。

下面用一张图来介绍各部件使用规则:
![docker-](http://oeeycy0kn.bkt.clouddn.com/12222025G-3.png)
图片来源google搜索

# Docker 安装

ubuntu 系列安装Docker Engine 参考 [官方安装文档]( http://docs.docker.com/engine/installation/#installation)
## 1、安装
`$ sudo apt-get install -y docker.io`
验证docker是否安装成功
## 2、验证
```
sudo docker run hello-world

显示
Hello from Docker.
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new Container from that image which runs the executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker Hub account: https://hub.docker.com

For more examples and ideas, visit:
 https://docs.docker.com/userguide/
```
## 3、配置(可选)

-  创建 Docker 用户组
-  调整内存和交换空间(swap accounting)
-  启用防火墙的端口转发(UFW)
-  为 Docker 配置DNS服务


# 结束语
本文主要结合工作上的需求对docker的做简单介绍，详情可以参阅下面给出的参考链接，下一章节将会介绍DockerFile 编写，以及docker命令。

# 参考资料
>* [什么是Docker](http://www.docker.org.cn/book/docker/what-is-docker-16.html)
>* [Docker应用场景](http://blog.flux7.com/blogs/docker/8-ways-to-use-docker-in-the-real-world)
>* [Docker — 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/)
>* [Docker架构](http://www.wenwenyun.com/a/tip/2014/0926/552.html)
>* [Docker详细介绍](http://www.open-open.com/lib/view/open1423703640748.html)
>* [Docker 架构](http://www.wenwenyun.com/a/tip/2014/0926/552.html)


