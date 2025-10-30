# 🔌 Tests de API

Esta carpeta contiene tests para probar los endpoints del backend de manera aislada.

## 🎯 Objetivo

Validar que la API REST responde correctamente a diferentes peticiones, maneja errores apropiadamente y devuelve los datos esperados en el formato correcto.

## 📋 Casos de Prueba Sugeridos

### Viviendas

#### GET /api/viviendas
- ✅ Obtener lista de viviendas sin filtros
- ✅ Paginación correcta (page, limit)
- ✅ Filtros por ciudad, provincia, precio
- ✅ Búsqueda por texto
- ✅ Ordenamiento (precio, metros, fecha)
- ✅ Respuesta con lista vacía
- ✅ Parámetros inválidos

#### GET /api/viviendas/:id
- ✅ Obtener vivienda existente
- ✅ Vivienda no encontrada (404)
- ✅ ID inválido

#### POST /api/viviendas
- ✅ Crear vivienda con datos válidos
- ✅ Validación de campos obligatorios
- ✅ Validación de tipos de datos
- ✅ Validación de rangos (precio > 0, habitaciones >= 0)
- ✅ Campos opcionales

#### PUT /api/viviendas/:id
- ✅ Actualizar vivienda existente
- ✅ Actualización parcial
- ✅ Vivienda no encontrada
- ✅ Validación de datos

#### DELETE /api/viviendas/:id
- ✅ Eliminar vivienda existente
- ✅ Vivienda no encontrada
- ✅ Cascada de eliminación con propietario

#### GET /api/viviendas/export
- ✅ Exportar CSV con todas las viviendas
- ✅ Exportar CSV con filtros
- ✅ Formato correcto del CSV

### Propietarios

#### GET /api/propietarios
- ✅ Obtener lista de propietarios
- ✅ Incluir viviendas del propietario

#### POST /api/propietarios
- ✅ Crear propietario con datos válidos
- ✅ Validación de email
- ✅ Campos obligatorios

## 🛠️ Herramientas Recomendadas

- **Jest** - Framework de testing
- **Supertest** - Testing de HTTP
- **Mock Data** - Datos de prueba

## 📝 Ejemplo de Test

```javascript
// Ejemplo: tests/api/viviendas.test.js
const request = require('supertest');
const app = require('../../backend/src/app');

describe('GET /api/viviendas', () => {
  it('debe devolver una lista de viviendas', async () => {
    const response = await request(app)
      .get('/api/viviendas')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination).toBeDefined();
  });

  it('debe filtrar por ciudad', async () => {
    const response = await request(app)
      .get('/api/viviendas?ciudad=Alicante')
      .expect(200);
    
    response.body.data.forEach(vivienda => {
      expect(vivienda.ciudad).toBe('Alicante');
    });
  });
});
```

## 🏃 Ejecutar Tests

```bash
# Ejecutar todos los tests de API
npm run test:api

# Ejecutar un archivo específico
npm test tests/api/viviendas.test.js

# Con cobertura
npm run test:api -- --coverage
```
