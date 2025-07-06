# Usa una imagen base de Python ligera y oficial.
FROM python:3.11-slim-buster

# Establece variables de entorno para un rendimiento óptimo en Docker.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia el archivo de requerimientos y los instala.
# Esto se hace primero para aprovechar el cache de Docker.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el código de tu proyecto Django.
COPY . .

# Expone el puerto 8000 donde se ejecutará Gunicorn.
EXPOSE 8000

# Comando para iniciar el servidor.
# Usa "taskmanager", que es el nombre de tu proyecto.
CMD ["gunicorn", "taskmanager.wsgi:application", "--bind", "0.0.0.0:8000"]