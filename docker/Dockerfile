# 基础镜像
FROM node:18.17.1-alpine

# 安装 PM2
# RUN npm install pm2 -g

# 设置工作目录
WORKDIR /ui/back
# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
# 安装依赖
# 优化 --production 只安装生成依赖
# && rm -rf /root/.npm \
# && npm cache clean --force \
#  --production
RUN npm install
# 复制应用程序代码到工作目录
COPY . .
# 执行npm run build 后生成dist目录
RUN npm run build

RUN npm install pm2 -g
# 暴露应用程序的端口
EXPOSE 3000

# 运行应用程序
# CMD ["npm", "run", "start:prod"]

# 配置环境变量
ENV RUNNING_ENV=prod

# 使用 PM2 启动应用程序
CMD ["pm2-runtime", "start", "dist/src/main.js"]