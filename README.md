`说在前面`：克隆项目后，请先添加配置文件，目录：src/config，新建configEnvLocal.ts，配置可以参考configEnvLocal.ts.tmp

## 本地调试，使用自己配置
```bash
npm run start:local
```
解释：启用src/config/configEnvLocal.ts的配置

## 本地调试
```bash
npm run start
```

## 本地调试（热重载）
```bash
npm run start:dev"
```

## 生产调试（热重载）
```bash
npm run start:prod"
```

## 配置文件说明 

```javascript

export const CONFIG_LOCAL = {
  port: 3000, //启动端口
  mysqlConfig: {  //数据库相关
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "test"
  },
  authUrl: "http://172.16.22.16:8000", //统一平台地址，用于认证
  fileUrl: "http://localhost:3000"  //上传文件的地址
};

```

## 中间件说明

`开启认证`:
对应文件 src/common/middleware/auth.middleware.ts
开启认证可以可以打开注释，别忘了注释底部的next()

## 部署相关
 
用到的技术是docker

可以直接执行docker/build.sh脚本

部署分支，建议用`dev`分支

对应命令

```bash
sh docker/build.sh
```

ps: docker-compose.yml 未用到，一是觉得没必要，二是有待完善

### 文档地址
http://localhost:3000/docs#/

