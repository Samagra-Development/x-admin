FROM zenika/alpine-chrome:77-with-node

WORKDIR /app

COPY package.json ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

USER root

RUN npm install

COPY . .

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

