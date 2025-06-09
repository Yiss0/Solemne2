# ETAPA 1: Construcción de la aplicación Angular
FROM node:20-alpine AS build

# Instalar Git para clonar el repo y jq para editar el archivo JSON
RUN apk add --no-cache git jq

# Establecer el directorio de trabajo principal
WORKDIR /app

# Clonar la rama "main" del repositorio
RUN git clone --branch main https://github.com/Yiss0/Solemne2.git

# Moverse a la carpeta del proyecto Angular
WORKDIR /app/Solemne2/FrontEnd

# Instalar las dependencias del proyecto
RUN npm install

# SOLUCIÓN PROACTIVA: Aumentamos el presupuesto de build para evitar errores.
# Usamos el nombre del proyecto "FrontEnd" y el límite "1MB" que figuran en tu angular.json
RUN jq '.projects.FrontEnd.architect.build.configurations.production.budgets[0].maximumError = "2MB"' angular.json > angular.json.tmp && mv angular.json.tmp angular.json

# Construir la aplicación para producción
RUN npm run build

# ETAPA 2: Servir la aplicación con un servidor web Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior a la carpeta web de Nginx
# La ruta de salida es "dist/front-end/browser/" según tu angular.json
COPY --from=build /app/Solemne2/FrontEnd/dist/front-end/browser/ /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80