FROM node:12.17.0-slim
WORKDIR /app
COPY package*.json /app/
RUN npm install --silent
COPY . /app
CMD ["npm", "start"]
