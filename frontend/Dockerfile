FROM node:18-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm start"]
