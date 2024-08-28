FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV URI=mongodb://localhost:27017/

ENV BASE_URL=http://localhost:3000

RUN npm run build

CMD ["npm","start"]
