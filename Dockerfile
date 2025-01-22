FROM node:21-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
# EXPOSE 3000

# CMD ["npm", "start"]

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY /nginx-server/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]