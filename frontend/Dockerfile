# Usar una imagen base con Node.js
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install

# Copiar el resto de los archivos del frontend
COPY . ./

# Construir el proyecto
RUN yarn build

# Exponer el puerto que tu frontend use (cambiado a 3000 como ejemplo)
EXPOSE 3000

# Comando para iniciar el servicio
CMD ["pm2-runtime", "start", "yarn", "--name", "frontend", "--", "start"]
