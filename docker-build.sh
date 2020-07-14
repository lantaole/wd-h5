#!/usr/bin/env bash

#定义变量
API_NAME="rank-mobile-h5"
API_PORT=9091
#私库地址
#REGISTRY_URL="192.168.100.211:5000"
#镜像名称
#IMAGE_NAME="$REGISTRY_URL/$API_NAME:$BUILD_NUMBER"
IMAGE_NAME="$API_NAME:$BUILD_NUMBER"
#删除的镜像名称
DEL_IMAGE_NAME=$API_NAME
#容器名称
CONTAINER_NAME=$API_NAME

#删除同名docker容器
cid=$(docker ps | grep "$CONTAINER_NAME" | awk '{print $1}')
if [ "$cid" != "" ]; then
   echo "rm container:" $cid
   docker stop $cid
   docker rm -f -v $cid
fi

#删除上个版本的镜像
IMAGE_ID=$(docker images | grep "$DEL_IMAGE_NAME" | awk '{print $3}')
echo "iam:"$IMAGE_ID
if [ -z "$IMAGE_ID" ]
then
echo no images need del
else
echo "rm images:" $IMAGE_ID
docker rmi -f $IMAGE_ID
fi

#构建docker镜像
docker build -t $IMAGE_NAME .

#推送docker镜像到私库
#docker push $IMAGE_NAME

#启动docker容器
docker run -d -m 2G --memory-swap 2G --restart=always --net malling-net -p $API_PORT:$API_PORT --name $CONTAINER_NAME $IMAGE_NAME
