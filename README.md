# Aplicación de Gestión de Tareas

Este repositorio contiene una aplicación completa para la gestión de tareas, desarrollada con Angular en el frontend y Django en el backend.

## 🚀 Tecnologías Utilizadas

* **Frontend**: [Angular 19](https://angular.dev/)
* **Backend**: [Django 5.2.3](https://www.djangoproject.com/)
* **Base de Datos**: Por defecto, Django utiliza SQLite, pero puede ser configurada para otras bases de datos.
* **Contenerización**: Docker y Docker Compose

## 📦 Estructura del Repositorio

El repositorio se organiza en dos directorios principales:

* `BackEnd/`: Contiene todo el código de la aplicación Django (API REST).
* `FrontEnd/`: Contiene el código fuente de la aplicación Angular.

## ⚙️ Ejecución Local

Para ejecutar la aplicación de forma local, asegúrate de tener instalados los prerrequisitos y sigue los pasos a continuación.

### Prerrequisitos

* **Python**: Versión 3.11 o superior.
* **pip**: Gestor de paquetes de Python.
* **Node.js**: Versión 20 o superior.
* **npm**: Gestor de paquetes de Node.js (viene con Node.js).
* **Angular CLI**: Instálalo globalmente con `npm install -g @angular/cli`.

### Pasos de Ejecución

1.  **Clonar el Repositorio**:
    ```bash
    git clone [https://github.com/Yiss0/Solemne2.git](https://github.com/Yiss0/Solemne2.git)
    cd Solemne2
    ```

2.  **Configuración y Ejecución del Backend (Django)**:
    * Navega al directorio del backend:
        ```bash
        cd BackEnd
        ```
    * Crea y activa un entorno virtual (recomendado):
        ```bash
        python -m venv venv
        # En Windows
        .\venv\Scripts\activate
        # En macOS/Linux
        source venv/bin/activate
        ```
    * Instala las dependencias de Python:
        ```bash
        pip install -r requirements.txt
        ```
        Las dependencias incluyen:
        ```
        asgiref==3.8.1
        Django==5.2.3
        django-cors-headers==4.7.0
        djangorestframework==3.16.0
        djangorestframework_simplejwt==5.5.0
        PyJWT==2.9.0
        sqlparse==0.5.3
        tzdata==2025.2
        gunicorn==20.1.0
        ```
    * Ejecuta las migraciones de la base de datos:
        ```bash
        python manage.py migrate
        ```
    * Inicia el servidor de desarrollo de Django:
        ```bash
        python manage.py runserver
        ```
        El backend estará disponible en `http://localhost:8000`.

3.  **Configuración y Ejecución del Frontend (Angular)**:
    * Abre una nueva terminal y navega al directorio del frontend desde la raíz del repositorio:
        ```bash
        cd FrontEnd
        ```
    * Instala las dependencias de Node.js/npm:
        ```bash
        npm install
        ```
        Las dependencias incluyen:
        ```
        @angular/common@^19.2.0
        @angular/compiler@^19.2.0
        @angular/core@^19.2.0
        @angular/forms@^19.2.0
        @angular/platform-browser@^19.2.0
        @angular/platform-browser-dynamic@^19.2.0
        @angular/router@^19.2.0
        jspdf@^3.0.1
        rxjs@~7.8.0
        tslib@^2.3.0
        zone.js@~0.15.0
        ```
    * Inicia el servidor de desarrollo de Angular:
        ```bash
        ng serve --open
        ```
        La aplicación de frontend se abrirá automáticamente en tu navegador en `http://localhost:4200`.

## 🐳 Ejecución con Docker

Puedes ejecutar toda la aplicación utilizando Docker y Docker Compose, lo cual es ideal para entornos de desarrollo y producción.

### Prerrequisitos

* **Docker Desktop**: Asegúrate de tener Docker Engine y Docker Compose instalados. Puedes descargarlo desde [Docker Official Website](https://www.docker.com/products/docker-desktop/).

### Pasos de Ejecución

1.  **Construir y Levantar los Servicios**:
    Desde la raíz del repositorio (`Solemne2/`), ejecuta el siguiente comando para construir las imágenes de Docker y levantar ambos servicios:
    ```bash
    docker-compose up --build -d
    ```
    * El flag `--build` reconstruye las imágenes si hay cambios en los Dockerfiles o en el código fuente.
    * El flag `-d` ejecuta los contenedores en segundo plano.

    Este comando construirá:
    * **backend**: Una imagen Python basada en `python:3.11-slim-buster` que instala las dependencias de `requirements.txt` y expone el puerto `8000`.
    * **frontend**: Una imagen Nginx basada en `node:20-alpine` para la construcción y `nginx:stable-alpine` para servir la aplicación Angular, exponiendo el puerto `80` internamente.

2.  **Acceso a la Aplicación**:
    * El **Frontend (Angular)** estará disponible en tu navegador en: [http://localhost:4200](http://localhost:4200)
    * El **Backend (Django)** estará disponible en: [http://localhost:8000](http://localhost:8000)

3.  **Detener los Servicios**:
    Para detener y remover los contenedores y las redes creadas por Docker Compose, ejecuta:
    ```bash
    docker-compose down
    ```

## 🔗 Enlace al Repositorio

Puedes encontrar el código fuente de este proyecto en GitHub:

* [Repositorio de Gestión de Tareas](https://github.com/Yiss0/Solemne2)
