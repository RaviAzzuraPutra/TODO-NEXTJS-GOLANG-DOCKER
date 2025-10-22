FROM node:18-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY .next ./.next
COPY public ./public
COPY next.config.js .
COPY package.json .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
