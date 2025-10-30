# 🧪 Tests - Gestión de Viviendas

Esta carpeta contiene todos los tests organizados por tipo de prueba.

## 📁 Estructura

### `/api` - Tests de API
Pruebas de los endpoints del backend:
- Tests de integración de la API REST
- Validación de respuestas JSON
- Códigos de estado HTTP
- Manejo de errores
- Autenticación y autorización

**Herramientas sugeridas:** Jest, Supertest, Postman/Newman

### `/funcional` - Tests Funcionales
Pruebas end-to-end del flujo completo de la aplicación:
- Flujos de usuario completos
- Interacción entre frontend y backend
- Operaciones CRUD completas
- Validación de datos
- Navegación entre páginas

**Herramientas sugeridas:** Playwright, Cypress, Selenium

### `/ux` - Tests de UX
Pruebas de experiencia de usuario:
- Usabilidad de la interfaz
- Tiempos de respuesta
- Feedback visual
- Flujos de navegación
- Pruebas A/B
- Performance percibida

**Herramientas sugeridas:** Lighthouse, WebPageTest, User Testing

### `/accesibilidad` - Tests de Accesibilidad
Pruebas de cumplimiento de estándares de accesibilidad:
- Cumplimiento WCAG 2.1 (Niveles A, AA, AAA)
- Navegación por teclado
- Lectores de pantalla
- Contraste de colores
- Etiquetas ARIA
- Formularios accesibles

**Herramientas sugeridas:** axe-core, Pa11y, WAVE, Lighthouse Accessibility

## 🚀 Ejecución de Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests de API
npm run test:api

# Ejecutar tests funcionales
npm run test:funcional

# Ejecutar tests de UX
npm run test:ux

# Ejecutar tests de accesibilidad
npm run test:a11y
```

## 📊 Cobertura

Los tests deben cubrir:
- ✅ Funcionalidades críticas (crear, leer, actualizar, eliminar viviendas)
- ✅ Validaciones de formularios
- ✅ Manejo de errores
- ✅ Casos extremos (edge cases)
- ✅ Compatibilidad con navegadores
- ✅ Responsive design
- ✅ Accesibilidad básica

## 📝 Convenciones

- Usar nombres descriptivos para los archivos de test
- Cada test debe ser independiente
- Limpiar datos de prueba después de cada test
- Documentar casos de prueba complejos
- Mantener los tests actualizados con los cambios del código
