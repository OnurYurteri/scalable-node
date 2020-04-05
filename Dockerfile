FROM node:13
WORKDIR /home/node/src
COPY src /home/node/src

RUN npm ci --only=production
CMD npm run start
EXPOSE 3000