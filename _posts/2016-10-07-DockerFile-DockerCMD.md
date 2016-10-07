# Docker学习笔记——DockerFile及命令

标签（空格分隔）： docker

---
上一篇对Docker做了简短的介绍，这一篇讲介绍Dockerfile的编写，以及常用命令。
#Docker 命令行
docker 命令
docker iamges
docker ps
docker stop
docker run

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
在建立Docker镜像的过程中,DockerFile 按层编译执行，每个指令的编译将去搜寻缓存里存在的，而不是创立一个新的镜像。在build镜像的时候加上'–no-cache=true' 选项即可不去寻找缓存里已有的镜像。除了ADD和COPY命令，缓存检查将不会查看容器中的文件，以确定缓存匹配。

## DockerFile 命令
### From
第一条指令指定一个

COPY 与 ADD的区别
>COPY ?1<dest\>
>ADD <src> <dest>

DockerFile run 启动镜像之后便会退出容器，这时候如果
CMD and Entrypoint







