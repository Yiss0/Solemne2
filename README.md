# Gestión de Tareas TaskManager Pro - TechNova Solutions

Pagina dedicada a administrar tareas locales de cada usuario.

## Ejecución Local

### Prerrequisitos

- Node.js (versión 18.x o superior)
- Angular CLI

Para poder ejecutar la aplicación en tu entorno local, sigue los siguientes pasos:

1. Clonar el repositorio
```bash
gi clone https://github.com/Yiss0/Solemne2
```
2. Instalar dependencias
```bash
npm install
```
3. Iniciar servidor de desarrollo
```bash
ng serve
```
4. Navega a `http://localhost:4200/`.

## Ejecución con Docker

### Prerrequisitos

- Docker Desktop

Para poder ejecutar la aplicación utilizando Docker, sigue los siguientes pasos:

1. Construir la imagen de Docker utilizando el archivo Dockerfile
```bash
docker build -t taskmanager-pro .
```
2. Ejecutar el contenedor
```bash
docker run -d -p 80:80 taskmanager-pro
```
3. Navega a `http://localhost:80`

## Lista de commits significativos

1. Commit inicial - Jueves 08 de Mayo de 2025 a las 11:49hrs.
2. Feature: Creación header, aside, footer - Domingo 11 de Mayo de 2025 a las 01:03hrs.
3. Feature: Diseño header, aside, footer - Domingo 11 de Mayo de 2025 a las 17:22hrs.
4. Feature: Modificación de colores de pagina y arreglos menores - Domingo 11 de Mayo de 2025 a las 11:27hrs.
5. Feature: Creación de task-list y task-item - Domingo 18 de Mayo de 2025 a las 22:05hrs.
6. Fix: Cambio en el diseño y eliminación de footer - Jueves 22 de Mayo de 2025 a las 22:32hrs.
7. Feature: Creación del componente task-alert y se integran iconos en task-alert y task-item - Domingo 25 de Mayo de 2025 a las 01:36hrs.
8. Feature: Agregación de función agregar tarea y estadistica - Viernes 06 de Junio a las 23:54hrs.
9. Feature: Creación de formatos de tareas - Domingo 08 de Junio a las 17:05hrs.
10. Featura: Creación de login y formato de rutas - Domingo 08 de Junio a las 20:21hrs.


## Creditos

Realizado por Jesús Contreras, correo de comunicación: `jicg151@gmail.com`.
