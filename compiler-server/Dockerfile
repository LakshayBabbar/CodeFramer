FROM docker:24-dind

RUN apk add nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add docker-cli

RUN npm run build

RUN chmod +x entrypoint.sh

ENV PORT 5000

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
