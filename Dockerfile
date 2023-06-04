#osnovna slika
FROM node:current-alpine

#direktorij iz katerega znotraj zabojnika poganjamo komande
WORKDIR /app

#kopira datoteke aplikacije v zabojniku
COPY ./node_server /app
RUN npm install
#COPY ./prepoznava_obraza /app
# RUN make -C /app/prepoznava_obraza/
# RUN ./prepoznava_obraza/prepoznava_obraza.py

#izpostavi port
EXPOSE 3001

#zazene node v zabojniku
CMD npm run start