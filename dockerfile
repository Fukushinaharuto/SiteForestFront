FROM node:22.5-slim
WORKDIR /front

COPY  ./front .


RUN npm install
RUN npm install axios
RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

RUN npm install react@18 react-dom@18



RUN npm install @dnd-kit/core





EXPOSE 3000
CMD ["npm","run","dev"]