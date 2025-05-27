# Usa uma imagem leve do Node
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências de forma limpa e confiável
RUN npm ci

# Copia o restante do código do projeto
COPY . .

# Expõe a porta que o NestJS usa por padrão (ajuste conforme sua config)
EXPOSE 3000

# Comando para rodar o NestJS com hot reload
CMD ["npm", "run", "start:dev"]
