FROM node:10.24.1 as build
WORKDIR /app/
COPY ./ ./
RUN npm install && npm run build
FROM nginx:latest
COPY --from=build /app/dist/projetobase-presentation-spa/ /usr/share/nginx/html/
