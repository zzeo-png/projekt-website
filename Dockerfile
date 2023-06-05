FROM ubuntu

# Install dependencies
RUN apt update && apt upgrade -y && apt install -y python3 python3-pip npm

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Copy application files
COPY ./node_server /app
COPY ./prepoznava_obraza /app/prepoznava_obraza

# Install Node.js dependencies
RUN npm install

# Install Python dependencies
RUN pip3 install deepface

# Set executable permissions and run initialization script
RUN chmod +x ./prepoznava_obraza/init.sh
RUN ./prepoznava_obraza/init.sh

# Expose port
EXPOSE 3001

# Run the application
#CMD python3 ./prepoznava_obraza/prepoznava_obraza.py
RUN chmod +x ./run.sh
RUN ./run.sh