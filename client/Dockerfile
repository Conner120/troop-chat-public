FROM nginx:alpine
COPY /local.conf /etc/nginx/conf.d/local.conf
COPY /build /usr/share/nginx/html

EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]