#!/bin/bash

# cd docker
# ls
# --build-arg="GO_VERSION=1.19"  \
# --progress plain \
# --cache-from uiback \
RED='\033[31m' # 红
RES='\033[0m' # 清除颜色
BRANCH='dev' 

getGitBranch(){
    d=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
    echo "当前分支：$d";
    if [ "$d" != $BRANCH ]
    then echo "$RED 提示：当前分支非 $BRANCH 分支，请注意！ $RES"
    fi
}
getDate(){
    buildTime=$(date "+%Y-%m-%d %H:%M:%S")
    echo $buildTime
}
buildImage(){
    getDate
    getGitBranch
    if docker images | grep uiback
    then docker rmi uiback
    else echo '没有运行uiback镜像'
    fi
    
    docker buildx build -f ./docker/Dockerfile  \
    --platform=linux/amd64 . \
    -t uiback  \
    --no-cache=true
    
    if [ $? -eq 0 ]
    then echo "构建镜像成功"
    else echo "构建镜像失败"
    fi
    
    if [ -f "uiback.tar" ]
    then rm ./uiback.tar
    else echo '未找到uiback压缩包'
    fi
    
    docker save -o ./uiback.tar uiback
    if [ $? -eq 0 ]
    then echo "保存镜像成功"
    else echo "保存镜像失败"
    fi
}

buildImage
