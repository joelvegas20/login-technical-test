# Usar una imagen base con Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install

# Copiar el resto de los archivos del backend
COPY . ./

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar el servicio
CMD ["pm2-runtime", "start", "yarn", "--name", "backend", "--", "start"]
