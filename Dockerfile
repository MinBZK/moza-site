# This is the newer version
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "serve", "-s", "dist", "-l", "8080" ]