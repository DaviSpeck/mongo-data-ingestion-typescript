# Use a imagem do Node.js mais recente com TypeScript
FROM node:23.6.0

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências e instalá-las
COPY package.json yarn.lock ./
RUN yarn install

# Copiar o restante do código para dentro do contêiner
COPY . .

# Garantir que o diretório de saída existe
RUN mkdir -p dist

# Compilar o TypeScript para JavaScript
RUN yarn build || { echo "Build failed"; exit 1; }

# Verificar que o arquivo dist/server.js foi gerado
RUN test -f dist/server.js || { echo "dist/server.js not found"; exit 1; }

# Expõe a porta
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/server.js"]