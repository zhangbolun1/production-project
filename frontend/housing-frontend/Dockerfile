# 使用更高版本的 Node.js 镜像
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 复制前端代码到容器
COPY . .

# 安装依赖并构建前端项目
RUN npm install && npm run build

# 使用 Nginx 作为静态文件服务器
FROM nginx:stable-alpine

# 复制构建好的前端文件到 Nginx
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
