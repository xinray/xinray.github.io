---
title: "Docker学习笔记—DockerFile及命令"
layout: post
category: Server
tags: [docker]
excerpt: "本文主要介绍了DockerFile的编写规则,以及Docker 的运行指令。"
prev-url: "server/Docker-introduction"
prev-title : "Docker学习笔记—介绍"
---

上一篇对Docker做了简短的介绍，这一篇讲介绍Dockerfile的编写，以及常用命令。

# DockerFile

## [一般准则和建议](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)
>1. 容器尽可能短小。
>2. 要会利用 .dockerignore 文件。
>3. 避免安装不必要的包。
>4. 一个容器只运行一个进程。
>5. 排序使得方便更新，检查利用\符号。
>6. 使层的数量尽可能少。
>7. 利用Cache。

这里着重解释下第7条
在建立Docker镜像的过程中,DockerFile 按层编译执行，每个指令的编译将去搜寻缓存里存在的，而不是创立一个新的镜像。例如：apt-get update时，将会使用缓存镜像并不会更新apt-get列表。  build镜像的时候加上'–no-cache=true' 选项即可不去寻找缓存里已有的镜像。除了ADD和COPY命令，缓存检查将不会查看容器中的文件，以确定缓存匹配。

## DockerFile 命令
### 基本语句
#### From
`FROM <image>
FROM <image>:<tag>
FROM <image>@<digest>`
第一条指令指定一个基本的镜像源，从公共库拉取一个镜像源。并且From必须是第一行。

#### MAINTAINER
MAINTAINER <name>
设置作者。

#### LABEL
`LABEL <key>=<value> <key>=<value> <key>=<value>`
设置�标签，采用键值对的形式。
#### RUN
`RUN <command>
RUN ["executable", "param1", "param2"]`
运行类linux 命令。
#### EXPOSE
`EXPOSE <port> [<port>...]`
用来指定容器的监听端口。
#### ENV
`ENV <key> <value>
ENV <key>=<value>`
设置环境变量的键值。

#### WORKDIR
`WORKDIR /path/to/workdir`
设置当前COPY ADD ENV 路径

#### ADD、COPY
复制文件。


###  COPY 与 ADD
二者都是复制文件的作用
>COPY &lt;src&gt;  &lt;dest&gt;
>ADD &lt;src&gt;  &lt;dest&gt;

ADD在和COPY相同的基础上，增加：
ADD 允许 &lt;src&gt;是一个 URL
ADD 的&lt;src&gt;是一个压缩格式文档&lt;src&gt;将会解压缩复制。

虽然ADD 比COPY功能多，但是还是推荐使用COPY作为文件的复制，因为ADD的行为有些越界，下载会使用CURL以及make命令。

所以使用 COPY除非你确信你需要 ADD。

### CMD 与 Entrypoint
1、CMD 和 Entrypoint一般用于制作具备后台服务的镜像, 如启动nginx，php-fpm, mysql 等。
2、DockerFile应至少指定一个CMD命令或Entrypoint。
3、都可以指定shell或exec函数调用的方式执行命令。
4、DockerFile run 启动镜像之后便会退出容器，需要一个长时间运行的命令，使得容器一直执行。

>CMD ["executable","param1","param2"] （运行一个可执行的文件并提供参数）
>CMD ["param1","param2"]  （为ENTRYPOINT指定参数）
>CMD command param1 param2 (以”/bin/sh -c”的方法执行的命令)

>ENTRYPOINT ["executable", "param1", "param2"] (首选执行形式)
>ENTRYPOINT command param1 param2 (以”/bin/sh -c”的方法执行的命令)

区别:
1、一个Dockerfile只能有一个CMD/ENTRYPOINT指令，如果有超过一个CMD将只启动并有效最后一个。
2、CMD在运行时会被command覆盖, ENTRYPOINT不会被运行时的command覆盖。
3、如果在Dockerfile中同时写了entrypoint和cmd则，docker在build过程中会将cmd中指定的内容作为entrypoint的参数。

需要初始化运行多个命令，彼此之间可以使用 && 隔开，但最后一个须要为无限运行的命令

### 注意
1、开始时RUN apt-get update  最后要清除apt 的缓存并移除 /var/lib/apt/lists 文件下的内容，使得镜像文件小。

# Docker 命令行
参见 [官方手册](https://docs.docker.com/engine/reference/commandline/)
## 环境信息相关
**info** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本地的配置信息
**version**  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示Docker的版本号，API版本号，Git commit， Docker客户端和后台进程的Go版本号
## 系统运维相关
**attach**
**build**
**commit**
**cp**
**diff**
**export** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;把容器系统文件打包并导出来，方便分发给其他场景使用。
**images**  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可查看所创建的镜像,默认只显示最顶层的Image
**import/save/load**
**inspect** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杀掉容器的进程
**kill** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杀掉容器的进程。
**port** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印出Host主机端口与容器暴露出的端口的NAT映射关系
**pause/unpause**
**ps** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印出正在运行的容器，docker ps -a打印出所有运行过的容器。
**rm** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除指定的容器。
**rmi** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`docker rmi IMAGE [IMAGE...]`删除失败镜像
**run**
**start/stop/restart**
**tag** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组合使用用户名，Image名字，标签名来组织管理Image。
**top** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示容器內运行的进程。
**wait** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阻塞对指定容器的其他调用方法，直到容器停止后退出阻塞。
## 日志信息相关
**events** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印容器实时的系统事件。
**history** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打印指定Image中每一层Image命令行的历史记录。
**logs** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量打印出容器中进程的运行日志。
## Docker Hub服务相关
**login** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录Hub服务。
**pull/push** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过此命令分享Image到Hub服务或者自服务的Registry服务。
**search** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过关键字搜索分享的Image。

## 主要命令介绍：

### attach
`docker attach [OPTIONS] CONTAINER`
挂载正在后台运行的容器，在开发应用的过程中运用这个命令可以随时观察容器內进程的运行状况。
### build
`docker build [options] <path>`
例如：docker build -t test:1.0 .
后面要带上点 .
将会运行当前目录下的DockerFile，运行结果如下：
Step 1 : FROM ubuntu:14.04
 ---> a5a467fddcb8
Step 2 : MAINTAINER ray@gmail.com
 ---> Running in ce9e7b02f075
 ---> 332259a92e74

如标题一所说 每一层都有一个层的cache id。
### diff
`docker diff CONTAINER`
diff会列出3种容器内文件状态变化（A - Add, D - Delete, C - Change ）的列表清单。

### [run](https://docs.docker.com/engine/reference/run/)
详细的请看官方文档，没有写详细，以后补充。
`docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`
运行镜像启动容器。

OPTIONS可以划分为：
a、设定操作执行方式：
>决定container的运行方式，前台执行还是后台执行
>设定containerID
>设定network参数
>设定container的CPU和Memory参数
>设定权限(Privileges )和LXC参数

b、设定image的默认资源，即image使用者可以用此命令来覆盖image开发者在build阶段所设定的默认值。

#### 参数解析
##### 1、Detached vs foreground
`-d=true`

- containter将会运行在后台模式(Detached mode)，并打印容器id。
- container不再监听你执行docker。
- 此时所有I/O数据只能通过网络资源或者共享卷组来进行交互。
- 但可以通过执行docker attach 来重新挂载这个container里面。
**注：**执行-d使container进入后台模式，那么将无法配合"--rm"参数。

`-d=false`

- container将默认进入前台模式(Foregroud mode)。
- 启动container，同时将当前的命令行窗口挂载到container的标准输入，标准输出和标准错误中。（即container中所有的输出，你都可以再当前窗口中查看到）

##### 2、Network settings

默认情况下，所有的container都开启了网络接口，同时可以接受任何外部的数据请求。

>--dns=[]         : Set custom dns servers for the container
--net="bridge"   : Set the Network mode for the container
  'bridge': creates a new network stack for the container on the docker bridge
  'none': no networking for this container
  'container:<name|id>': reuses another container network stack
  'host': use the host network stack inside the container
--add-host=""    : Add a line to /etc/hosts (host:IP)
--mac-address="" : Sets the container's Ethernet device's MAC address

可以通过docker run --net none 来关闭网络接口，此时将关闭所有网络数据的输入输出。此时只能通过STDIN,STDOUT或者files来完成I/O操作。

以下是网络设置中常用的参数：

- none 关闭container内的网络连接
- bridge 通过veth接口来连接contianer 默认选项
- host 允许container使用host的网络堆栈信息。 **注：**这种方式将允许container访问host中类似D-BUS之类的系统服务，所以被认为是不安全的 。
- container 使用另外一个container的网络堆栈信息。
- None：将网络模式设置为none时，这个container将不允许访问任何外部router。这个container内部只会有一个loopback接口，而且不存在任何可以访问外部网络的router。

**Bridge：**
Docker默认是将container设置为bridge模式。此时在host上面讲存在一个docker0的网络接口，同时会针对container创建一对veth接口。其中一个veth接口是在host充当网卡桥接作用，另外一个veth接口存在于container的命名空间中，并且指向container的loopback。Docker会自动给这个container分配一个IP，并且将container内的数据通过桥接转发到外部。

**Host：**
当网络模式设置为host时，这个container将完全共享host的网络堆栈。host所有的网络接口将完全对container开放。container的主机名也会存在于host的hostname中。这时，container所有对外暴露的port和对其它container的link，将完全失效。

通过host 启动     docker run --net=host  -i -t deployment:1.0 /bin/bash   这样可以通过镜像连接本地端数据库。

通过bridge 启动  docker run -p 8990:9988  -i -t deployment:1.0 /bin/bash
－p 暴露连接的port

## 总结
这篇文章主要介绍了DockerFile的编写使用规则以及CMD命令行的使用规则和功能。对于我在学习工程中遇到的坑进行了找重的介绍和整理。在docker run 命令中没有介绍全面（以后会重看并补充），直接介绍了两个需要注意的地方，详细可以参考[run参数详解](https://docs.docker.com/engine/reference/run/)。


## 参考资料

[DockerFile 官方文档](https://docs.docker.com/engine/reference/builder/)

[CMD、ENTRYPOINT比较](https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/)

[Docker run](https://docs.docker.com/engine/reference/run/)

[Docker中文文档](https://yeasy.gitbooks.io/docker_practice/content/introduction/what.html)