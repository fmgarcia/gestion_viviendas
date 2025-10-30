# 👥 Gestión de Propietarios

## Descripción

Módulo completo de gestión de propietarios integrado en la aplicación de gestión inmobiliaria. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los propietarios de las viviendas.

## Características

### ✨ Funcionalidades Principales

1. **Listado de Propietarios**
   - Vista en tabla con información detallada
   - Vista en tarjetas para una mejor visualización
   - Búsqueda en tiempo real por nombre, email o teléfono
   - Contador de viviendas asociadas a cada propietario
   - Selector de vista (tabla/tarjetas)

2. **Crear Propietario**
   - Formulario con validación en tiempo real
   - Campos: nombre, DNI, email, teléfono, dirección
   - Validación de formato de email y teléfono
   - Feedback visual de errores

3. **Ver Detalles**
   - Información completa del propietario
   - Listado de viviendas asociadas
   - Enlaces directos a las viviendas
   - Opciones de edición y eliminación

4. **Editar Propietario**
   - Formulario precargado con datos actuales
   - Mismas validaciones que el formulario de creación
   - Confirmación de cambios

5. **Eliminar Propietario**
   - Modal de confirmación
   - Validación de relaciones (no se puede eliminar si tiene viviendas)
   - Feedback de errores

## Estructura de Archivos

```
frontend/src/
├── components/
│   ├── Layout.jsx              # Barra de navegación superior
│   └── PropietarioCard.jsx     # Tarjeta de propietario
├── pages/
│   ├── PropietariosList.jsx    # Listado con búsqueda y filtros
│   ├── PropietarioDetail.jsx   # Detalle del propietario
│   └── PropietarioForm.jsx     # Formulario crear/editar
├── services/
│   └── api.js                  # Funciones API (getPropietarios, etc.)
└── App.jsx                     # Rutas configuradas

backend/src/
├── controllers/
│   └── propietariosController.js  # Lógica de negocio
├── routes/
│   └── propietarios.js            # Endpoints REST
└── middlewares/
    └── validateBody.js            # Validación de datos
```

## Rutas Frontend

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/propietarios` | PropietariosList | Listado de propietarios |
| `/propietarios/nuevo` | PropietarioForm | Crear nuevo propietario |
| `/propietarios/:id` | PropietarioDetail | Ver detalles |
| `/propietarios/:id/editar` | PropietarioForm | Editar propietario |

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/propietarios` | Obtener todos los propietarios |
| GET | `/api/propietarios/:id` | Obtener un propietario por ID |
| POST | `/api/propietarios` | Crear nuevo propietario |
| PUT | `/api/propietarios/:id` | Actualizar propietario |
| DELETE | `/api/propietarios/:id` | Eliminar propietario |

## Modelo de Datos

```javascript
{
  id: Number,           // ID autogenerado
  nombre: String,       // Nombre completo (obligatorio)
  dni: String,          // DNI o NIE (opcional)
  email: String,        // Email (opcional, validado)
  telefono: String,     // Teléfono (opcional, validado)
  direccion: String,    // Dirección completa (opcional)
  viviendas: Array,     // Relación con viviendas
  createdAt: DateTime,  // Fecha de creación
  updatedAt: DateTime   // Fecha de actualización
}
```

## Validaciones

### Campos Obligatorios
- ✅ **nombre**: Mínimo 1 carácter

### Validaciones de Formato
- 📧 **email**: Formato válido de email (opcional)
- 📱 **telefono**: Entre 9 y 15 dígitos (opcional)

### Reglas de Negocio
- No se puede eliminar un propietario que tenga viviendas asociadas
- El nombre es el único campo obligatorio
- Los campos vacíos se omiten en el envío

## Navegación

La aplicación incluye una barra de navegación superior con dos opciones:
- **Viviendas**: Gestión de viviendas
- **Propietarios**: Gestión de propietarios

## Modos de Visualización

### Vista de Tabla
- Información completa en formato tabular
- Ordenación alfabética por nombre
- Acciones inline (ver, editar, eliminar)
- Ideal para gestión masiva

### Vista de Tarjetas
- Diseño visual atractivo
- Información resumida
- Avatar con inicial del nombre
- Ideal para navegación rápida

## Uso

### Crear un Propietario

1. Ir a `/propietarios`
2. Clic en "Nuevo Propietario"
3. Completar el formulario (solo nombre es obligatorio)
4. Clic en "Crear Propietario"

### Buscar Propietarios

1. En la página de listado
2. Escribir en el campo de búsqueda
3. Los resultados se filtran automáticamente

### Cambiar Vista

1. En la página de listado
2. Usar los botones de la esquina superior derecha
3. Elegir entre vista de tabla o tarjetas

### Ver Viviendas de un Propietario

1. Acceder al detalle del propietario
2. Scroll hasta la sección "Viviendas"
3. Clic en cualquier vivienda para ver sus detalles

## Características Técnicas

- ⚛️ React 18 con Hooks
- 🎨 Tailwind CSS para estilos
- 🔄 React Router para navegación
- 📡 Axios para peticiones HTTP
- ✅ Validación en tiempo real
- 🔍 Búsqueda instantánea
- 📱 Diseño responsive
- ♿ Accesibilidad considerada

## Próximas Mejoras

- [ ] Exportación a CSV
- [ ] Paginación en listado
- [ ] Filtros avanzados
- [ ] Ordenación por diferentes campos
- [ ] Importación masiva de propietarios
- [ ] Estadísticas de propietarios

## Capturas

### Listado en Tabla
Muestra todos los propietarios con información de contacto y número de viviendas.

### Listado en Tarjetas
Vista moderna con tarjetas individuales para cada propietario.

### Formulario
Formulario limpio con validación en tiempo real.

### Detalle
Información completa del propietario y sus viviendas asociadas.
