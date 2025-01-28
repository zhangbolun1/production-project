FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 复制后端代码到容器
COPY . /app

# 更新 pip
RUN pip install --upgrade pip

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 暴露 Flask 默认端口
EXPOSE 5000

# 启动后端服务
CMD ["python", "app.py"]
