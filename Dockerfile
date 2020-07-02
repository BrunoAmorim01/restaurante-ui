FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/restaurante /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf 

#CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# docker build -t restaurante-ui-prod .
# docker run -p 8081:80 restaurante-ui-prod