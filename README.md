# PracticaDockerBBDD

Este proyecto es una práctica de despliegue con Docker que integra una aplicación web completa con autenticación de usuarios y persistencia de sesiones. Está compuesto por un frontend estático servido por Express, una API REST básica, una base de datos PostgreSQL y un proxy Nginx con HTTPS.

El objetivo principal es mostrar cómo levantar una aplicación web con autenticación usando contenedores, cómo almacenar usuarios en base de datos y cómo mantener sesiones activas entre páginas.

---

## Requisitos

- Docker
- Docker Compose

---

## Cómo iniciar el servidor

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Luego abrir en el navegador:

```
https://localhost
```

Si el navegador muestra un aviso de certificado, es porque se usa un certificado propio. Aceptar para continuar.

---

## Servicios que se levantan

El archivo `docker-compose.yml` levanta tres servicios:

### 1. Base de datos (PostgreSQL)
- Contenedor: `electro_db`
- Crea el esquema inicial mediante `db/init.sql`
- Guarda usuarios y sesiones

### 2. Aplicación Node.js (Express)
- Contenedor: `electro_app`
- Sirve el frontend estático desde `app/public`
- Expone endpoints REST para registro, login, sesión y logout
- Usa `express-session` y `connect-pg-simple` para persistir sesiones en PostgreSQL

### 3. Nginx (Proxy HTTPS)
- Contenedor: `electro_nginx`
- Escucha en `https://localhost` (puerto 443)
- Reenvía tráfico a la app Node

---

## Funcionamiento general

1. El usuario se registra en `register.html`
2. El usuario inicia sesión en `login.html`
3. Al iniciar sesión se crea una sesión en PostgreSQL
4. Las páginas de detalle (`electrodomestico1.html`, etc.) verifican la sesión con `/api/me`
5. Si no hay sesión, redirigen al login

---

## Endpoints principales

| Método | Ruta           | Descripción                           |
|-------|----------------|---------------------------------------|
| POST  | /api/register  | Crear un usuario en la base de datos  |
| POST  | /api/login     | Validar credenciales e iniciar sesión |
| GET   | /api/me        | Consultar si hay sesión activa        |
| POST  | /api/logout    | Cerrar sesión                         |

---

## Estructura del proyecto

```
app/
  public/         Frontend estático (HTML, CSS, JS)
  server.js       Servidor Express y API
db/
  init.sql        SQL inicial para crear tabla users
nginx/
  nginx.conf      Configuración del proxy HTTPS
docker-compose.yml
```

---

## Sesiones y base de datos

Las sesiones se guardan en PostgreSQL usando `connect-pg-simple`.
Si la tabla `session` no existe, debe crearse manualmente o añadirse al `init.sql`.

---

## Comandos útiles

Ver contenedores activos:

```bash
docker ps
```

Entrar a la base de datos:

```bash
docker exec -it electro_db psql -U electro_user -d electro_db
```

Ver estado de sesión en el navegador:

```
https://localhost/api/me
```

---