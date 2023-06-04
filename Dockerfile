#osnovna slika
FROM ubuntu

#direktorij iz katerega znotraj zabojnika poganjamo komande
WORKDIR /app

#kopira datoteke aplikacije v zabojniku
COPY ./node_server /app
RUN apt update
RUN apt -y upgrade
RUN apt -y install python3 pip nodejs npm
RUN npm install
#COPY ./prepoznava_obraza /app
# RUN make -C /app/prepoznava_obraza/
RUN pip install deepface
RUN chmod +x ./prepoznava_obraza/init.sh
RUN ./prepoznava_obraza/init.sh

#izpostavi port
EXPOSE 3001

#zazene node v zabojniku
#RUN chmod +x run.sh
CMD python3 ./prepoznava_obraza/prepoznava_obraza.py