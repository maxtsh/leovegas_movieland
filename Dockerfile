FROM node:20-alpine as builder


WORKDIR /app

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=16384

RUN npm install -g rimraf

RUN rm -rf node_modules

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]

