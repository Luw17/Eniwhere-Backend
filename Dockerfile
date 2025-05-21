# Usa uma imagem leve do Node
FROM node:20-alpine

# Cria e define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (aproveita cache de build)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do código do projeto
COPY . .

# Expõe a porta que o NestJS usa por padrão
EXPOSE 3000

# Comando para rodar o NestJS com hot reload
CMD ["npm", "run", "start:dev"]
