FROM node

WORKDIR /

RUN apt-get update
RUN apt-get upgrade -y

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN touch .env
RUN echo "HOST=localhost" >> .env
RUN echo "PORT=3000" >> .env

COPY --chown=node:node . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]