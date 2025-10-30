# 🏠 Gestión de Viviendas

Aplicación completa para gestión de viviendas desarrollada con:
- **Backend**: Node.js + Express + Prisma ORM + MySQL
- **Frontend**: React + Vite + Tailwind CSS

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **NPM** >= 9.x
- **XAMPP** con MySQL corriendo
- **MySQL** en puerto 3306
- Usuario MySQL: `root` sin contraseña

## 🗄️ Configuración de la Base de Datos

### 1. Crear la base de datos en MySQL

Abre phpMyAdmin (http://localhost/phpmyadmin) o usa la consola de MySQL y ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS gestion_viviendas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Alternativamente, puedes importar el archivo `gestion_viviendas.sql` que contiene la estructura completa con datos de ejemplo.

## 🚀 Instalación y Configuración

### Backend

1. **Navegar a la carpeta del backend**
   ```bash
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   El archivo `.env` ya está configurado con:
   ```env
   DATABASE_URL="mysql://root@localhost:3306/gestion_viviendas"
   PORT=4000
   ```
   
   Si tu configuración de MySQL es diferente, modifica el `DATABASE_URL` según corresponda.

4. **Ejecutar migraciones de Prisma**
   
   Esto creará las tablas en la base de datos basándose en el schema de Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generar el cliente de Prisma**
   ```bash
   npx prisma generate
   ```

6. **Ejecutar el seed (datos de ejemplo)**
   
   Esto insertará datos de ejemplo en las tablas:
   ```bash
   npm run seed
   ```

7. **Iniciar el servidor backend**
   ```bash
   npm run dev
   ```
   
   El servidor estará corriendo en `http://localhost:4000`

### Frontend

1. **Abrir una nueva terminal** y navegar a la carpeta del frontend
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación se abrirá automáticamente en `http://localhost:5173`

## 📚 Scripts Disponibles

### Backend (`/backend`)

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm start` - Inicia el servidor en modo producción
- `npm run seed` - Ejecuta el seed de datos de ejemplo
- `npm run prisma:migrate` - Ejecuta migraciones de Prisma
- `npm run prisma:generate` - Genera el cliente de Prisma

### Frontend (`/frontend`)

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🔌 API Endpoints

### Viviendas

- **GET** `/api/viviendas` - Obtiene todas las viviendas con filtros y paginación
  - Query params: `page`, `limit`, `sort`, `search`, `ciudad`, `provincia`, `minPrecio`, `maxPrecio`, `minHabitaciones`, `piscina`, `tipo`, `tipoOperacion`, `estado`
  
- **GET** `/api/viviendas/:id` - Obtiene una vivienda por ID

- **POST** `/api/viviendas` - Crea una nueva vivienda
  - Body (JSON): Todos los campos de vivienda

- **PUT** `/api/viviendas/:id` - Actualiza una vivienda existente
  - Body (JSON): Campos a actualizar

- **DELETE** `/api/viviendas/:id` - Elimina una vivienda

- **GET** `/api/viviendas/export` - Exporta viviendas en formato CSV
  - Query params: Mismos que GET /api/viviendas

### Propietarios

- **GET** `/api/propietarios` - Obtiene todos los propietarios

- **GET** `/api/propietarios/:id` - Obtiene un propietario por ID

- **POST** `/api/propietarios` - Crea un nuevo propietario

- **PUT** `/api/propietarios/:id` - Actualiza un propietario

- **DELETE** `/api/propietarios/:id` - Elimina un propietario

## 📝 Ejemplos de Uso con cURL

### Obtener todas las viviendas (con paginación)
```bash
curl "http://localhost:4000/api/viviendas?page=1&limit=10"
```

### Buscar viviendas en Alicante con piscina
```bash
curl "http://localhost:4000/api/viviendas?ciudad=Alicante&piscina=true"
```

### Filtrar por rango de precio
```bash
curl "http://localhost:4000/api/viviendas?minPrecio=100000&maxPrecio=300000"
```

### Obtener una vivienda específica
```bash
curl "http://localhost:4000/api/viviendas/1"
```

### Crear una nueva vivienda
```bash
curl -X POST "http://localhost:4000/api/viviendas" ^
  -H "Content-Type: application/json" ^
  -d "{\"direccion\":\"C/ Nueva 1\",\"ciudad\":\"Valencia\",\"provincia\":\"Valencia\",\"precio\":150000,\"tipoOperacion\":\"venta\"}"
```

### Actualizar una vivienda
```bash
curl -X PUT "http://localhost:4000/api/viviendas/1" ^
  -H "Content-Type: application/json" ^
  -d "{\"precio\":230000,\"estado\":\"reservado\"}"
```

### Eliminar una vivienda
```bash
curl -X DELETE "http://localhost:4000/api/viviendas/1"
```

### Exportar viviendas a CSV
```bash
curl "http://localhost:4000/api/viviendas/export?ciudad=Alicante" --output viviendas.csv
```

## 🎨 Características del Frontend

### Listado de Viviendas
- ✅ Visualización en tarjetas con información resumida
- ✅ Filtros avanzados (búsqueda, ciudad, provincia, precio, habitaciones, características)
- ✅ Ordenamiento (precio, metros cuadrados, fecha)
- ✅ Paginación completa
- ✅ Exportación a CSV

### Detalle de Vivienda
- ✅ Vista completa de todos los campos
- ✅ Información del propietario
- ✅ Botones para editar y eliminar

### Formulario (Crear/Editar)
- ✅ Formulario completo con todos los campos
- ✅ Validación cliente y servidor
- ✅ Reutilizable para crear y editar
- ✅ Selección de propietario existente

## 🏗️ Estructura del Proyecto

```
gestion_viviendas/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Definición del modelo de datos
│   │   └── seed.js             # Datos de ejemplo
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── middlewares/        # Validaciones
│   │   ├── routes/             # Definición de rutas
│   │   ├── services/           # Cliente de Prisma
│   │   ├── utils/              # Utilidades (paginación)
│   │   ├── app.js              # Configuración de Express
│   │   └── index.js            # Punto de entrada
│   ├── .env                    # Variables de entorno
│   ├── package.json
│   └── nodemon.json
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Páginas de la aplicación
│   │   ├── services/           # Cliente API (Axios)
│   │   ├── App.jsx             # Componente principal
│   │   ├── main.jsx            # Punto de entrada
│   │   └── index.css           # Estilos Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── gestion_viviendas.sql       # Script SQL de la base de datos
└── README.md
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Express** - Framework web para Node.js
- **Prisma** - ORM moderno para Node.js y TypeScript
- **MySQL** - Base de datos relacional
- **Express Validator** - Validación de datos
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React 18** - Librería de interfaz de usuario
- **React Router DOM** - Enrutamiento
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos CSS
- **Axios** - Cliente HTTP

## 🐛 Solución de Problemas

### El backend no conecta con MySQL
- Verifica que XAMPP esté corriendo y MySQL iniciado
- Confirma que el puerto sea 3306
- Verifica las credenciales en el archivo `.env`

### Error en las migraciones de Prisma
- Asegúrate de que la base de datos esté creada
- Ejecuta: `npx prisma migrate reset` (esto borrará todos los datos)
- Vuelve a ejecutar las migraciones y el seed

### Error en el frontend
- Verifica que el backend esté corriendo en el puerto 4000
- Revisa la consola del navegador para errores específicos
- Asegúrate de haber instalado todas las dependencias

### Problemas con CORS
- Verifica que el frontend esté corriendo en puerto 5173 o 3000
- Revisa la configuración CORS en `backend/src/app.js`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

## 👨‍💻 Autor

Desarrollado para el proyecto intermodular IES 2025/26

---

**¡Listo para usar! 🎉**

Para cualquier duda o problema, revisa la documentación de las tecnologías utilizadas o contacta con el equipo de desarrollo.
