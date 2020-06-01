FROM node:12.17.0-slim
WORKDIR /app
COPY package*.json /app/
RUN npm install --silent
COPY . /app
RUN apt-get update && apt-get install netcat-openbsd -y
RUN chmod +x ./run.sh
CMD ["./run.sh"]
