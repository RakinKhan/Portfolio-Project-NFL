FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]

# create docker image command:
# docker build -t apiserver:latest .
# run a docker container for api server:
# docker run --name apiserver -d --rm -p 8000:8000 apiserver:latest