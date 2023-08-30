#!/bin/bash

# Navegar al directorio del backend
cd backend

# Instala las dependencias
yarn install

# Construye el proyecto si es necesario
# (esto depende de cómo esté configurado tu proyecto backend)
# yarn build

# Inicia el backend con pm2
PORT=8080 DATABASE_URL=mongodb+srv://joelvegas:Ia72S4axkrdrwYdK@cluster0.ftus1wu.mongodb.net/?retryWrites=true&w=majority pm2 start yarn --name "backend" -- start


# Volver al directorio principal
cd ..

# Navegar al directorio del frontend
cd frontend

# Instala las dependencias
yarn install

# Construye el proyecto (si usas algo como React, Vue, Angular, etc.)
yarn build

# Sirve el frontend (esto puede variar dependiendo de cómo sirvas tu frontend)
# Por ejemplo, si usas `serve` para servir tu frontend:
# pm2 start serve --name "frontend" -- -s build
# (Asegúrate de tener `serve` instalado globalmente o en tu proyecto)

# O si tu frontend tiene un comando 'start' propio:
pm2 start yarn --name "frontend" -- start
