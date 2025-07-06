# Utiliza una imagen base de Python. Se recomienda usar versiones slim o alpine para menor tamaño.
FROM python:3.9-slim-buster

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de requisitos e instala las dependencias.
# Esto aprovecha el cache de Docker: si requirements.txt no cambia, este paso no se reconstruye.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de tu aplicación al directorio de trabajo.
# El '.' al final de la segunda parte significa "todo lo que hay en el directorio actual (backend/)"
COPY . .

# Expone el puerto en el que Gunicorn va a escuchar.
# Por convención, Django/Flask con Gunicorn suelen usar el puerto 8000.
# Asegúrate de que este puerto coincida con el que configures en tu docker-compose.yml para este servicio.
EXPOSE 8000

# Comando para iniciar el servidor Gunicorn.
# DEBES REEMPLAZAR 'your_project_name.wsgi:application'
# o 'your_app_module:app' con la ruta correcta a tu objeto de aplicación.
#
# Ejemplos comunes:
# Para Django: CMD ["gunicorn", "--bind", "0.0.0.0:8000", "nombre_de_tu_proyecto.wsgi:application"]
# Para Flask:   CMD ["gunicorn", "--bind", "0.0.0.0:8000", "nombre_de_tu_modulo_principal:app"]
#                (Si tu archivo principal se llama app.py y tu objeto Flask es 'app', sería 'app:app')
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "tu_proyecto.wsgi:application"]