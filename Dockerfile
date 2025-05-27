# Usa imagem leve do Node
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package.json package-lock.json ./

# Instala as dependências com npm ci (clean install)
RUN npm ci

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando para rodar com hot reload e polling para funcionar com volumes bind
CMD ["npm", "run", "start:dev"]
