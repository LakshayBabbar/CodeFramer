FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 python3-pip default-jdk

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","start"]
