# 🎨 Tests de UX (Experiencia de Usuario)

Esta carpeta contiene tests enfocados en medir y validar la experiencia del usuario.

## 🎯 Objetivo

Evaluar la usabilidad, rendimiento percibido, diseño y satisfacción del usuario al interactuar con la aplicación.

## 📋 Áreas de Prueba

### 1. Usabilidad
- ✅ Claridad de la navegación
- ✅ Consistencia visual
- ✅ Facilidad de completar tareas
- ✅ Feedback visual inmediato
- ✅ Manejo de errores amigable
- ✅ Tooltips y ayuda contextual

### 2. Performance Percibida
- ✅ Tiempo de carga inicial
- ✅ Indicadores de carga (spinners, skeletons)
- ✅ Transiciones suaves
- ✅ Respuesta a interacciones
- ✅ Optimización de imágenes

### 3. Diseño Responsive
- ✅ Móvil (320px - 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1024px+)
- ✅ Elementos táctiles (tamaño mínimo 44x44px)
- ✅ Orientación (portrait/landscape)

### 4. Flujos de Usuario
- ✅ Número de clicks para completar tarea
- ✅ Claridad de las CTA (Call to Action)
- ✅ Prevención de errores
- ✅ Confirmaciones antes de acciones destructivas
- ✅ Breadcrumbs y navegación clara

### 5. Feedback Visual
- ✅ Estados de hover, focus, active
- ✅ Mensajes de éxito/error claros
- ✅ Validación en tiempo real
- ✅ Animaciones y micro-interacciones
- ✅ Estados de carga

## 🛠️ Herramientas Recomendadas

### Automatizadas
- **Lighthouse** - Auditoría de performance y UX
- **WebPageTest** - Métricas de rendimiento
- **GTmetrix** - Análisis de velocidad
- **Chrome DevTools** - Performance profiling

### Manuales
- **Hotjar** - Heatmaps y grabaciones de sesión
- **Google Analytics** - Análisis de comportamiento
- **UserTesting** - Tests con usuarios reales
- **Maze** - Tests de usabilidad

## 📝 Checklist de UX

### Navegación
- [ ] Logo lleva al inicio
- [ ] Breadcrumbs en páginas internas
- [ ] Botón "Volver" visible
- [ ] Enlaces con estado hover/active
- [ ] Menú responsive en móvil

### Formularios
- [ ] Labels claros para cada campo
- [ ] Validación en tiempo real
- [ ] Mensajes de error específicos
- [ ] Campos con placeholder útil
- [ ] Autocompletado cuando sea posible
- [ ] Botón submit claramente visible

### Listados
- [ ] Carga de skeleton/placeholder
- [ ] Paginación intuitiva
- [ ] Filtros fáciles de usar
- [ ] Ordenamiento visible
- [ ] Mensaje cuando no hay resultados

### Tarjetas de Vivienda
- [ ] Información clave visible
- [ ] Imagen placeholder si no hay foto
- [ ] Precio destacado
- [ ] Botones de acción claros
- [ ] Hover effect

### Performance
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total Blocking Time < 300ms

## 📊 Métricas Clave

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Otras Métricas
- **Time to First Byte**: < 600ms
- **Speed Index**: < 3s
- **Total Page Size**: < 2MB

## 🏃 Ejecutar Tests

### Lighthouse
```bash
# Desde Chrome DevTools
# F12 > Lighthouse > Generate Report

# CLI
npm install -g lighthouse
lighthouse http://localhost:5173 --view
```

### Performance Testing
```bash
# Con Chrome DevTools
# F12 > Performance > Record

# Playwright Performance
npx playwright test --trace on
```

## 📝 Ejemplo de Test de Performance

```javascript
// tests/ux/performance.spec.js
const { test, expect } = require('@playwright/test');

test('medir performance de carga inicial', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('http://localhost:5173');
  
  // Esperar a que el contenido principal esté visible
  await page.waitForSelector('.vivienda-card', { timeout: 5000 });
  
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  
  console.log(`Tiempo de carga: ${loadTime}ms`);
  
  // Asegurar que carga en menos de 3 segundos
  expect(loadTime).toBeLessThan(3000);
});

test('verificar feedback visual en filtros', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Click en filtro
  const ciudadInput = page.locator('input[name="ciudad"]');
  await ciudadInput.fill('Alicante');
  
  // Verificar que hay feedback visual (loading)
  await expect(page.locator('.loading-indicator')).toBeVisible();
  
  // Verificar que se muestran resultados
  await expect(page.locator('.vivienda-card')).toBeVisible();
});
```

## 📋 Plantilla de Informe UX

```markdown
# Informe de UX Testing - [Fecha]

## Resumen Ejecutivo
- Estado general: ✅ / ⚠️ / ❌
- Puntos fuertes: 
- Áreas de mejora:

## Métricas de Performance
- LCP: XXs
- FID: XXms
- CLS: X.XX
- Puntuación Lighthouse: XX/100

## Hallazgos Principales
1. [Descripción del problema]
   - Severidad: Alta/Media/Baja
   - Impacto: 
   - Recomendación:

## Acciones Recomendadas
- [ ] Acción 1
- [ ] Acción 2
```
