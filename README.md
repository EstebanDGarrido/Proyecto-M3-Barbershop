# Proyecto M3 Barbershop

Aplicacion web full stack para una barberia, enfocada en la gestion de turnos de clientes.

Permite registrar usuarios, iniciar sesion, crear reservas dentro de un rango de fechas y horarios definidos, consultar turnos y cancelarlos.

## Tabla de contenido

- [Descripcion general](#descripcion-general)
- [Problema que resuelve](#problema-que-resuelve)
- [Funcionalidades](#funcionalidades)
- [Reglas de negocio de turnos](#reglas-de-negocio-de-turnos)
- [Arquitectura y stack](#arquitectura-y-stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API Backend](#api-backend)
- [Instalacion y ejecucion local](#instalacion-y-ejecucion-local)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Flujo funcional completo](#flujo-funcional-completo)
- [Estado actual y posibles mejoras](#estado-actual-y-posibles-mejoras)

## Descripcion general

**M3 Barbershop** es una pagina web para administrar reservas de una barberia.

El frontend (React + Vite) ofrece la experiencia de usuario: registro, login, navegacion, creacion de turnos, visualizacion y cancelacion.

El backend (Node.js + Express + TypeORM + PostgreSQL) centraliza la logica de negocio, validaciones y persistencia de datos.

## Problema que resuelve

En lugar de gestionar turnos por mensajes o de forma manual, la app permite:

- Centralizar la informacion de clientes y reservas.
- Evitar reservas fuera del rango permitido.
- Validar horarios para mantener orden operativo.
- Dar autonomia al cliente para consultar y cancelar sus propios turnos.

## Funcionalidades

### Frontend

- Landing page con acceso a:
  - Registro.
  - Login.
  - Ingreso como invitado.
- Registro de usuario con validaciones en cliente.
- Login de usuario con persistencia en `localStorage` (`actualUser`).
- Navegacion dinamica segun sesion activa.
- Creacion de nuevos turnos.
- Vista de "Mis Reservas" para listar turnos del usuario logueado.
- Cancelacion de turnos activos.
- Vistas informativas (`Home`, `About`, `Contact`) y pagina `404`.

### Backend

- API REST para usuarios y turnos.
- Validacion de datos con middlewares antes de llegar a controladores.
- Persistencia con TypeORM sobre PostgreSQL.
- Relacion entre entidades:
  - `User` <-> `Credential` (1:1).
  - `User` <-> `Appointment` (1:N).
- Cambio de estado de turnos (`active` / `cancelled`) sin borrar registros.

## Reglas de negocio de turnos

En el backend y frontend se aplican restricciones de agenda:

- La fecha debe estar entre **manana** y **14 dias** hacia adelante.
- No se aceptan turnos en fin de semana.
- Horarios permitidos en bloques de 30 minutos:
  - Desde `09:00` hasta `17:30`.
- La descripcion del turno debe tener entre 4 y 50 caracteres (backend).
- Un turno cancelado cambia su estado a `cancelled`.

## Arquitectura y stack

### Frontend

- React 19
- React Router DOM
- Axios
- CSS Modules
- Vite

### Backend

- Node.js
- Express 5
- TypeScript
- TypeORM
- PostgreSQL (`pg`)
- `dotenv`, `cors`, `morgan`

## Estructura del proyecto

```txt
Proyecto-M3-Barbershop/
|-- .gitignore
|-- README.md
|-- front/
|   |-- vite-project/
|   |   |-- src/
|   |   |   |-- components/
|   |   |   |-- helpers/
|   |   |   |-- views/
|   |   |   |-- App.jsx
|   |   |   |-- main.jsx
|   |   |-- package.json
|-- back/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- dtos/
|   |   |-- entities/
|   |   |-- interfaces/
|   |   |-- middlewares/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- index.ts
|   |   |-- server.ts
|   |-- package.json
|   |-- tsconfig.json
```

## API Backend

Base URL local:

- `http://localhost:3000`

### Usuarios

- `GET /users`
  - Lista todos los usuarios.
- `GET /users/:id`
  - Devuelve un usuario por ID junto con sus turnos.
- `POST /users/register`
  - Registra un usuario nuevo.
  - Body esperado:
    - `name`, `email`, `birthdate`, `nDni`, `username`, `password`.
- `POST /users/login`
  - Valida credenciales.
  - Respuesta incluye:
    - `login: true`
    - `actualUser`

### Turnos

- `GET /appointments`
  - Lista todos los turnos.
- `GET /appointments/:turnId`
  - Devuelve un turno por ID.
- `POST /appointments/schedule`
  - Crea un turno nuevo.
  - Body esperado:
    - `date`, `time`, `description`, `userId`.
- `PUT /appointments/cancel/:turnId`
  - Cambia el estado del turno a cancelado.

## Instalacion y ejecucion local

### 1) Clonar repositorio

```bash
git clone <URL_DEL_REPO>
cd Proyecto-M3-Barbershop
```

### 2) Levantar backend

```bash
cd back
npm install
```

Crear archivo `.env` en `back/` y luego ejecutar:

```bash
npm run dev
```

Servidor esperado en:

- `http://localhost:3000`

### 3) Levantar frontend

En otra terminal:

```bash
cd front/vite-project
npm install
npm run dev
```

Aplicacion frontend (Vite):

- URL mostrada por consola (normalmente `http://localhost:5173`)

## Variables de entorno

Archivo: `back/.env`

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=barbershop
```

Nota: si no defines estas variables, el backend usa valores por defecto del archivo `back/src/config/envs.ts`.

## Scripts

### Backend (`back/package.json`)

- `npm run dev`: inicia con nodemon + ts-node.
- `npm run build`: compila TypeScript a `dist`.
- `npm run start`: ejecuta build compilada.
- `npm run build:start`: compila y ejecuta en un solo comando.

### Frontend (`front/vite-project/package.json`)

- `npm run dev`: servidor de desarrollo con Vite.
- `npm run build`: build de produccion.
- `npm run preview`: previsualizacion del build.
- `npm run lint`: analisis de codigo con ESLint.

## Flujo funcional completo

1. Un visitante entra a la landing.
2. Puede registrarse o iniciar sesion.
3. Al loguearse, se guarda el usuario en `localStorage`.
4. Con sesion activa, accede a:
   - `Reservas` para ver sus turnos.
   - `Nueva Reserva` para crear un turno.
5. El frontend envia solicitudes a la API.
6. El backend valida datos, aplica reglas y persiste en PostgreSQL.
7. El usuario puede cancelar un turno y el estado cambia a `cancelled`.

## Estado actual y posibles mejoras

Estado actual:

- Sistema funcional para registro, login y gestion de turnos.
- Validaciones aplicadas en frontend y backend.
- Persistencia con modelo relacional claro.

Mejoras recomendadas:

- Implementar autenticacion con JWT y rutas protegidas por token.
- Hashear passwords (ej. `bcrypt`) en lugar de guardarlas en texto plano.
- Evitar uso de `synchronize: true` en entornos productivos.
- Agregar tests (unitarios e integracion).
- Incorporar manejo global de errores y logs estructurados.
