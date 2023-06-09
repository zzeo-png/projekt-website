#osnovna slika
FROM node:current-alpine

#direktorij iz katerega znotraj zabojnika poganjamo komande
WORKDIR /app

#kopira datoteke aplikacije v zabojniku
COPY ./node_server /app
RUN npm install

#izpostavi port
EXPOSE 3001

#zazene node v zabojniku
CMD npm run start