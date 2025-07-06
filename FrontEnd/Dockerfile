# ETAPA 1: Construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia los archivos de configuración e instala dependencias.
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente del frontend.
COPY . .

# Construye la aplicación para producción.
RUN npm run build -- --configuration production

# ETAPA 2: Servidor Web (Serve)
FROM nginx:stable-alpine

# Copia los archivos de producción desde la etapa de construcción a la carpeta de Nginx.
# Usamos la ruta "dist/front-end/browser/" que ya confirmamos.
COPY --from=builder /app/dist/front-end/browser/ /usr/share/nginx/html

# Copia el archivo de configuración de Nginx para que las rutas de Angular funcionen.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80, que es el puerto por defecto de Nginx.
EXPOSE 80