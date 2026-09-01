# Books API - Backend RESTful

API RESTful modular y escalable para la gestión de libros, desarrollada con **Node.js**, **Express** y **TypeScript**, implementando una **arquitectura en capas** (Layered Architecture) y persistencia en memoria.

---

## 📖 Descripción del proyecto

Este proyecto implementa una API backend estructurada con separación estricta de responsabilidades, garantizando mantenibilidad, tipado estático y desacoplamiento entre componentes.

### Arquitectura del Sistema
El flujo de datos sigue un ciclo unidireccional estructurado en 7 capas:

1. **Entrada & Middlewares Globales (`app.ts`)**: Configuración principal de Express, parseo de cuerpo JSON (`express.json()`) y registro de logs de peticiones (`logger.middleware.ts`).
2. **Capa de Rutas (`book.routes.ts`)**: Enrutador principal bajo el prefijo `/api/books`, integrando validación previa de esquemas mediante `validateBook.middleware.ts`.
3. **Capa de Controladores (`book.controller.ts`)**: Recepción de `req.body`, `req.params` y `req.query`, validación básica de tipos HTTP y formateo de respuestas JSON (200, 201, 204).
4. **Capa de Servicios (`book.service.ts`)**: Lógica de negocio pura, aplicación de reglas de dominio, generación de identificadores únicos y emisión de excepciones tipadas (`HttpError`).
5. **Capa de Persistencia / Repositorio (`book.repository.ts`)**: Abstracción de acceso a datos (`findAll`, `findByID`, `create`, `remove`, `updateByID`).
6. **Fuente de Datos (`Data Layer`)**: Almacenamiento en memoria basado en un arreglo tipado `books: Book[]`.
7. **Manejo Centralizado de Errores (`error.middleware.ts`)**: Middleware global de captura de excepciones (`HttpError`), estandarizando respuestas de error con códigos de estado HTTP (400, 404, 500).

---

## 🛠️ Cómo instalar las dependencias

### Requisitos previos
- **Node.js** (versión 18.x o superior recomendada)
- **npm** (v9+), **yarn** o **pnpm**

### Instalación
1. Clona o descomprime el repositorio en tu máquina local:
   ```bash
   cd backend
   ```

2. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```
   *(O alternativamente: `yarn install` / `pnpm install`)*

---

## 🚀 Cómo ejecutar el proyecto

### Modo Desarrollo
Para ejecutar la aplicación con recarga automática en caliente (*hot-reload*) usando `ts-node-dev` o `tsx`:
```bash
npm run dev
```
El servidor se inicializará por defecto en `http://localhost:3000`.

### Compilación para Producción (Build)
Para compilar el código TypeScript a JavaScript optimizado en la carpeta `dist/`:
```bash
npm run build
```

### Modo Producción
Una vez compilado el proyecto, ejecuta:
```bash
npm start
```

---

## 📡 Endpoints disponibles

La URL base para todos los endpoints de recursos es:  
`http://localhost:3000/api/books`

### Tabla resumen de rutas

| Método | Endpoint | Middleware / Validación | Código Exitoso | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Ninguno | `200 OK` | Obtiene la lista completa de libros |
| `GET` | `/api/books/:id` | Validación de parámetro `id` | `200 OK` | Obtiene el detalle de un libro por su ID |
| `POST` | `/api/books` | `validateBook.middleware.ts` | `201 Created` | Registra un nuevo libro en el sistema |
| `PATCH` | `/api/books/:id` | Validación parcial de datos | `200 OK` | Actualiza atributos específicos de un libro |
| `DELETE`| `/api/books/:id` | Validación de parámetro `id` | `204 No Content` / `200 OK` | Elimina un libro del sistema |

---

### Detalle de Peticiones y Respuestas

#### 1. Obtener todos los libros
- **Ruta:** `GET /api/books`
- **Respuesta Exitosa (`200 OK`):**
  ```json
  [
    {
      "id": "1",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "year": 2008
    }
  ]
  ```

#### 2. Obtener un libro por ID
- **Ruta:** `GET /api/books/:id`
- **Respuesta Exitosa (`200 OK`):**
  ```json
  {
    "id": "1",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  }
  ```
- **Respuesta de Error (`404 Not Found`):**
  ```json
  {
    "status": "error",
    "statusCode": 404,
    "message": "Libro no encontrado"
  }
  ```

#### 3. Crear un nuevo libro
- **Ruta:** `POST /api/books`
- **Headers:** `Content-Type: application/json`
- **Cuerpo de la Petición (`Request Body`):**
  ```json
  {
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "year": 1999
  }
  ```
- **Respuesta Exitosa (`201 Created`):**
  ```json
  {
    "id": "generated-uuid-o-id",
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "year": 1999
  }
  ```
- **Respuesta de Error de Validación (`400 Bad Request`):**
  ```json
  {
    "status": "error",
    "statusCode": 400,
    "message": "El campo 'title' y 'author' son obligatorios"
  }
  ```

#### 4. Actualizar parcialmente un libro
- **Ruta:** `PATCH /api/books/:id`
- **Headers:** `Content-Type: application/json`
- **Cuerpo de la Petición (`Request Body`):**
  ```json
  {
    "year": 2020
  }
  ```
- **Respuesta Exitosa (`200 OK`):**
  ```json
  {
    "id": "1",
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "year": 2020
  }
  ```
- **Respuesta de Error (`404 Not Found`):**
  ```json
  {
    "status": "error",
    "statusCode": 404,
    "message": "Libro con id 1 no encontrado para actualizar"
  }
  ```

#### 5. Eliminar un libro
- **Ruta:** `DELETE /api/books/:id`
- **Respuesta Exitosa (`200 OK` / `204 No Content`):**
  ```json
  {
    "status": "success",
    "message": "Libro eliminado correctamente"
  }
  ```
- **Respuesta de Error (`404 Not Found`):**
  ```json
  {
    "status": "error",
    "statusCode": 404,
    "message": "Libro no encontrado"
  }
  ```

---

## ⚠️ Manejo Centralizado de Errores

Todas las excepciones no controladas o lanzadas explícitamente mediante `HttpError` en los servicios o controladores son interceptadas por `error.middleware.ts`, retornando una estructura unificada:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Descripción detallada del error"
}
```