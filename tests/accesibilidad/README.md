# ♿ Tests de Accesibilidad

Esta carpeta contiene tests para garantizar que la aplicación es accesible para todos los usuarios, incluyendo personas con discapacidades.

## 🎯 Objetivo

Cumplir con las pautas WCAG 2.1 (Web Content Accessibility Guidelines) y asegurar que la aplicación sea utilizable por personas con diferentes capacidades.

## 📋 Áreas de Prueba

### 1. Navegación por Teclado
- ✅ Todos los elementos interactivos son accesibles con Tab
- ✅ Orden lógico de tabulación
- ✅ Estados de focus visibles
- ✅ Skip links para contenido principal
- ✅ Atajos de teclado documentados
- ✅ Escape cierra modales/dropdowns

### 2. Lectores de Pantalla
- ✅ Texto alternativo en imágenes
- ✅ Etiquetas ARIA apropiadas
- ✅ Landmarks (header, nav, main, footer)
- ✅ Live regions para contenido dinámico
- ✅ Anuncios de cambios de estado
- ✅ Descripción de elementos complejos

### 3. Contraste de Colores
- ✅ Texto normal: ratio 4.5:1
- ✅ Texto grande: ratio 3:1
- ✅ Componentes UI: ratio 3:1
- ✅ Estados de focus visibles
- ✅ No depender solo del color

### 4. Formularios
- ✅ Labels asociados a inputs
- ✅ Mensajes de error descriptivos
- ✅ Instrucciones claras
- ✅ Validación accesible
- ✅ Agrupación lógica (fieldsets)
- ✅ Autocompletado semántico

### 5. Contenido Multimedia
- ✅ Transcripciones para audio
- ✅ Subtítulos para video
- ✅ Controles accesibles
- ✅ No autoplay con sonido

### 6. Estructura Semántica
- ✅ Jerarquía de encabezados (h1-h6)
- ✅ HTML semántico (article, section, nav, etc.)
- ✅ Listas para contenido listado
- ✅ Tablas con headers apropiados

## 🛠️ Herramientas Recomendadas

### Automatizadas
- **axe-core** - Testing de accesibilidad automatizado
- **Pa11y** - Auditoría de accesibilidad
- **WAVE** - Extensión de navegador
- **Lighthouse Accessibility** - Auditoría en Chrome DevTools

### Manuales
- **NVDA** - Lector de pantalla (Windows)
- **JAWS** - Lector de pantalla (Windows)
- **VoiceOver** - Lector de pantalla (Mac/iOS)
- **TalkBack** - Lector de pantalla (Android)

## 📝 Checklist WCAG 2.1 Nivel AA

### Perceptible
- [ ] 1.1.1: Texto alternativo
- [ ] 1.3.1: Información y relaciones
- [ ] 1.3.2: Secuencia significativa
- [ ] 1.3.4: Orientación
- [ ] 1.3.5: Identificar propósito de entrada
- [ ] 1.4.3: Contraste mínimo (4.5:1)
- [ ] 1.4.4: Redimensión de texto (200%)
- [ ] 1.4.10: Reflow
- [ ] 1.4.11: Contraste no textual
- [ ] 1.4.12: Espaciado de texto
- [ ] 1.4.13: Contenido en hover o focus

### Operable
- [ ] 2.1.1: Teclado
- [ ] 2.1.2: Sin trampa de teclado
- [ ] 2.1.4: Atajos de teclado
- [ ] 2.4.1: Saltar bloques
- [ ] 2.4.2: Título de página
- [ ] 2.4.3: Orden de foco
- [ ] 2.4.4: Propósito del enlace en contexto
- [ ] 2.4.5: Múltiples formas
- [ ] 2.4.6: Encabezados y etiquetas
- [ ] 2.4.7: Foco visible
- [ ] 2.5.1: Gestos de puntero
- [ ] 2.5.2: Cancelación de puntero
- [ ] 2.5.3: Etiqueta en nombre
- [ ] 2.5.4: Actuación por movimiento

### Comprensible
- [ ] 3.1.1: Idioma de la página
- [ ] 3.2.1: Al recibir el foco
- [ ] 3.2.2: Al recibir entrada
- [ ] 3.2.3: Navegación consistente
- [ ] 3.2.4: Identificación consistente
- [ ] 3.3.1: Identificación de errores
- [ ] 3.3.2: Etiquetas o instrucciones
- [ ] 3.3.3: Sugerencia ante error
- [ ] 3.3.4: Prevención de errores

### Robusto
- [ ] 4.1.1: Análisis sintáctico
- [ ] 4.1.2: Nombre, función, valor
- [ ] 4.1.3: Mensajes de estado

## 📊 Niveles de Conformidad

- **Nivel A**: Requisitos mínimos básicos
- **Nivel AA**: Objetivo estándar (RECOMENDADO)
- **Nivel AAA**: Requisitos más estrictos

## 🏃 Ejecutar Tests

### axe-core con Playwright
```bash
npm install -D @axe-core/playwright
```

```javascript
// tests/accesibilidad/a11y.spec.js
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('página principal sin violaciones de accesibilidad', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Pa11y
```bash
npm install -g pa11y

# Ejecutar test
pa11y http://localhost:5173

# Con nivel WCAG
pa11y --standard WCAG2AA http://localhost:5173

# Guardar reporte
pa11y --reporter html http://localhost:5173 > report.html
```

### Lighthouse
```bash
lighthouse http://localhost:5173 --only-categories=accessibility --view
```

## 📝 Ejemplo de Tests

```javascript
// tests/accesibilidad/teclado.spec.js
const { test, expect } = require('@playwright/test');

test('navegación por teclado en formulario', async ({ page }) => {
  await page.goto('http://localhost:5173/vivienda/nuevo');
  
  // Comenzar desde el primer campo
  await page.keyboard.press('Tab');
  
  // Verificar que el foco está en el campo de dirección
  await expect(page.locator('input[name="direccion"]')).toBeFocused();
  
  // Continuar tabulando
  await page.keyboard.press('Tab');
  await expect(page.locator('input[name="ciudad"]')).toBeFocused();
  
  // Verificar que se puede enviar con Enter
  await page.fill('input[name="direccion"]', 'Test');
  await page.fill('input[name="ciudad"]', 'Test');
  // ... rellenar campos obligatorios
  
  await page.keyboard.press('Enter');
  // Verificar envío
});

test('estados de focus visibles', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  const link = page.locator('a').first();
  await link.focus();
  
  // Verificar que tiene outline visible
  const outlineWidth = await link.evaluate((el) => {
    return window.getComputedStyle(el).outlineWidth;
  });
  
  expect(outlineWidth).not.toBe('0px');
});
```

## 📋 Plantilla de Informe de Accesibilidad

```markdown
# Informe de Accesibilidad - [Fecha]

## Resumen Ejecutivo
- Nivel de conformidad alcanzado: A / AA / AAA
- Puntuación Lighthouse: XX/100
- Violaciones críticas: X
- Violaciones totales: X

## Violaciones Encontradas

### Críticas (Nivel A)
1. [Criterio WCAG]
   - Descripción:
   - Ubicación:
   - Solución:
   - Prioridad: Alta

### Importantes (Nivel AA)
1. [Criterio WCAG]
   - Descripción:
   - Ubicación:
   - Solución:
   - Prioridad: Media

## Tests Realizados
- [x] Navegación por teclado
- [x] Lector de pantalla (NVDA)
- [x] Contraste de colores
- [x] axe-core
- [x] Lighthouse

## Recomendaciones
1. [Acción prioritaria]
2. [Mejora sugerida]

## Próximos Pasos
- [ ] Corregir violaciones críticas
- [ ] Implementar mejoras
- [ ] Re-test después de correcciones
```

## 🔧 Configuración de Herramientas

### axe-core config
```javascript
// .axerc.js
module.exports = {
  tags: ['wcag2a', 'wcag2aa'],
  rules: {
    'color-contrast': { enabled: true },
    'html-has-lang': { enabled: true },
    'label': { enabled: true }
  }
};
```

### Pa11y config
```json
{
  "standard": "WCAG2AA",
  "timeout": 30000,
  "wait": 1000,
  "ignore": [
    "notice",
    "warning"
  ]
}
```
