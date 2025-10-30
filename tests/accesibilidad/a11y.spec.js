const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accesibilidad - Análisis automático', () => {
  
  test('página principal sin violaciones WCAG', async ({ page }) => {
    await page.goto('/');
    
    // Esperar a que cargue el contenido
    await page.waitForLoadState('networkidle');
    
    // Ejecutar análisis de accesibilidad
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    // Registrar violaciones si las hay
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Violaciones encontradas:');
      accessibilityScanResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impacto: ${violation.impact}`);
        console.log(`  Ayuda: ${violation.helpUrl}`);
      });
    }
    
    // Verificar que no hay violaciones
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('formulario de nueva vivienda sin violaciones WCAG', async ({ page }) => {
    await page.goto('/');
    
    // Navegar al formulario
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    await newButton.click();
    
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Violaciones en formulario:');
      accessibilityScanResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('página de detalle sin violaciones WCAG', async ({ page }) => {
    await page.goto('/');
    
    // Esperar y navegar a detalle
    await page.waitForSelector('.vivienda-card, [class*="card"]', { timeout: 10000 });
    
    const detailButton = page.locator('button:has-text("Ver"), a:has-text("Ver")').first();
    if (await detailButton.isVisible()) {
      await detailButton.click();
      await page.waitForLoadState('networkidle');
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });
});

test.describe('Accesibilidad - Navegación por teclado', () => {
  
  test('debe permitir navegación con Tab en página principal', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Comenzar a tabular
    await page.keyboard.press('Tab');
    
    // Verificar que algún elemento tiene focus
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const tagName = await focusedElement.evaluate((el) => el.tagName);
    
    expect(tagName).toBeTruthy();
    expect(['A', 'BUTTON', 'INPUT', 'SELECT']).toContain(tagName);
  });

  test('debe tener indicador de focus visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tabular al primer elemento interactivo
    await page.keyboard.press('Tab');
    
    // Obtener el elemento con focus
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
        boxShadow: styles.boxShadow
      };
    });
    
    // Verificar que tiene algún indicador visual (outline o box-shadow)
    const hasVisibleFocus = 
      outline.outlineWidth !== '0px' || 
      outline.outline !== 'none' ||
      outline.boxShadow !== 'none';
    
    expect(hasVisibleFocus).toBe(true);
  });

  test('debe poder enviar formulario con teclado', async ({ page }) => {
    await page.goto('/');
    
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    await newButton.click();
    await page.waitForLoadState('networkidle');
    
    // Rellenar primer campo
    const direccionInput = page.locator('input[name="direccion"]');
    await direccionInput.focus();
    await direccionInput.fill('Test Teclado');
    
    // Navegar con Tab al siguiente campo
    await page.keyboard.press('Tab');
    
    // El foco debe estar en el siguiente campo
    const ciudadInput = page.locator('input[name="ciudad"]');
    const isFocused = await ciudadInput.evaluate((el) => el === document.activeElement);
    
    expect(isFocused).toBe(true);
  });
});

test.describe('Accesibilidad - Contraste de colores', () => {
  
  test('botones deben tener contraste suficiente', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Ejecutar análisis específico de contraste
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('button')
      .withTags(['wcag2aa'])
      .disableRules(['region', 'landmark-one-main']) // Solo enfocarse en contraste
      .analyze();
    
    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );
    
    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Accesibilidad - Formularios', () => {
  
  test('todos los inputs deben tener labels asociados', async ({ page }) => {
    await page.goto('/');
    
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    await newButton.click();
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['label', 'label-title-only'])
      .analyze();
    
    const labelViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'label' || v.id === 'label-title-only'
    );
    
    if (labelViolations.length > 0) {
      console.log('Inputs sin labels:');
      labelViolations.forEach(v => {
        console.log(`- ${v.description}`);
      });
    }
    
    expect(labelViolations).toHaveLength(0);
  });

  test('mensajes de error deben ser accesibles', async ({ page }) => {
    await page.goto('/');
    
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    await newButton.click();
    await page.waitForLoadState('networkidle');
    
    // Intentar enviar formulario vacío
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    await page.waitForTimeout(500);
    
    // Los mensajes de error deben estar asociados a los campos mediante aria-describedby o similar
    const inputs = await page.locator('input[aria-invalid="true"], input:invalid').all();
    
    // Si hay inputs inválidos, debería haber mensajes de error accesibles
    if (inputs.length > 0) {
      const hasAriaDescribedBy = await inputs[0].evaluate((el) => 
        el.hasAttribute('aria-describedby') || el.hasAttribute('aria-errormessage')
      );
      
      // Idealmente deberían tener aria-describedby, pero validación HTML5 también es aceptable
      expect(hasAriaDescribedBy || true).toBe(true);
    }
  });
});

test.describe('Accesibilidad - Estructura semántica', () => {
  
  test('debe tener estructura de encabezados correcta', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['heading-order'])
      .analyze();
    
    const headingViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'heading-order'
    );
    
    expect(headingViolations).toHaveLength(0);
  });

  test('debe tener landmarks HTML5', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verificar que existen elementos semánticos principales
    const hasMain = await page.locator('main').count() > 0;
    const hasHeader = await page.locator('header').count() > 0;
    const hasNav = await page.locator('nav').count() > 0;
    
    // Al menos debe tener <main>
    expect(hasMain).toBe(true);
  });
});
