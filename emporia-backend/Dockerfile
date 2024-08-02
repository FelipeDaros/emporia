# Dockerfile.api
FROM node:18-alpine

# Instala o pacote openssl usando apk
RUN apk update && \
    apk add --no-cache openssl

WORKDIR /app

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install
RUN npx prisma generate

# Instala dotenv para ler o arquivo .env
RUN npm install dotenv

COPY . .

EXPOSE 3005

# RUN docker run --name some-postgres -e POSTGRES_PASSWORD=@@123 -e POSTGRES_DB=emporia -e TZ=America/Sao_Paulo -d postgres

CMD ["npm", "run", "start"]