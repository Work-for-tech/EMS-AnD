FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 9999

CMD ["npm", "start"]
