# ⚙️ Tests Funcionales

Esta carpeta contiene tests end-to-end que prueban flujos completos de usuario en la aplicación.

## 🎯 Objetivo

Validar que la aplicación funciona correctamente desde la perspectiva del usuario final, probando la interacción entre frontend y backend.

## 📋 Casos de Prueba Sugeridos

### Flujo de Listado de Viviendas
- ✅ Cargar la página principal
- ✅ Visualizar tarjetas de viviendas
- ✅ Aplicar filtros (ciudad, precio, características)
- ✅ Cambiar ordenamiento
- ✅ Navegar entre páginas (paginación)
- ✅ Buscar por texto

### Flujo de Creación de Vivienda
- ✅ Navegar a "Nueva Vivienda"
- ✅ Rellenar formulario completo
- ✅ Validar campos obligatorios
- ✅ Seleccionar propietario
- ✅ Marcar características (piscina, garaje, etc.)
- ✅ Guardar vivienda
- ✅ Verificar redirección a detalle
- ✅ Comprobar que aparece en el listado

### Flujo de Visualización de Detalle
- ✅ Click en "Ver detalles" desde listado
- ✅ Visualizar toda la información
- ✅ Ver datos del propietario
- ✅ Acceder a botones de editar/eliminar

### Flujo de Edición de Vivienda
- ✅ Navegar a editar desde detalle
- ✅ Formulario pre-rellenado con datos actuales
- ✅ Modificar campos
- ✅ Guardar cambios
- ✅ Verificar actualización en detalle
- ✅ Verificar actualización en listado

### Flujo de Eliminación de Vivienda
- ✅ Click en eliminar desde detalle
- ✅ Mostrar confirmación
- ✅ Confirmar eliminación
- ✅ Verificar redirección a listado
- ✅ Comprobar que ya no aparece

### Flujo de Exportación CSV
- ✅ Click en "Exportar CSV"
- ✅ Aplicar filtros antes de exportar
- ✅ Descargar archivo
- ✅ Verificar formato del CSV
- ✅ Verificar datos correctos

### Flujo de Gestión de Propietarios
- ✅ Crear nuevo propietario
- ✅ Asignar vivienda a propietario
- ✅ Visualizar viviendas del propietario

## 🛠️ Herramientas Recomendadas

- **Playwright** - Testing E2E moderno y rápido
- **Cypress** - Testing E2E con excelente DX
- **Selenium WebDriver** - Testing cross-browser

## 📝 Ejemplo de Test (Playwright)

```javascript
// Ejemplo: tests/funcional/crear-vivienda.spec.js
const { test, expect } = require('@playwright/test');

test('crear nueva vivienda completa', async ({ page }) => {
  // Navegar a la página
  await page.goto('http://localhost:5173');
  
  // Click en "Nueva Vivienda"
  await page.click('text=Nueva Vivienda');
  
  // Rellenar formulario
  await page.fill('input[name="direccion"]', 'C/ Test 123');
  await page.fill('input[name="ciudad"]', 'Valencia');
  await page.fill('input[name="provincia"]', 'Valencia');
  await page.fill('input[name="precio"]', '150000');
  await page.selectOption('select[name="tipo"]', 'piso');
  await page.selectOption('select[name="tipoOperacion"]', 'venta');
  
  // Marcar características
  await page.check('input[name="piscina"]');
  await page.check('input[name="garaje"]');
  
  // Enviar formulario
  await page.click('button[type="submit"]');
  
  // Verificar redirección y mensaje
  await expect(page).toHaveURL(/\/vivienda\/\d+/);
  await expect(page.locator('text=C/ Test 123')).toBeVisible();
});
```

## 🏃 Ejecutar Tests

```bash
# Con Playwright
npx playwright test tests/funcional

# Con Cypress
npx cypress run --spec "tests/funcional/**/*.spec.js"

# Modo interactivo (Cypress)
npx cypress open
```

## 📊 Configuración

### Playwright
```javascript
// playwright.config.js
module.exports = {
  testDir: './tests/funcional',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ]
};
```

### Cypress
```javascript
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'tests/funcional/**/*.spec.js'
  }
};
```
