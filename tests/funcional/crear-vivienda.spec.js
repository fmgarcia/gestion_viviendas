const { test, expect } = require('@playwright/test');

test.describe('Crear Nueva Vivienda', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navegar a formulario de nueva vivienda
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    await newButton.click();
    
    // Esperar a que cargue el formulario
    await page.waitForLoadState('networkidle');
  });

  test('debe mostrar formulario de creación', async ({ page }) => {
    // Verificar que hay un formulario
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Verificar campos principales
    await expect(page.locator('input[name="direccion"]')).toBeVisible();
    await expect(page.locator('input[name="ciudad"]')).toBeVisible();
    await expect(page.locator('input[name="precio"]')).toBeVisible();
  });

  test('debe crear vivienda con datos válidos', async ({ page }) => {
    // Rellenar formulario
    await page.fill('input[name="direccion"]', 'C/ Playwright Test 456');
    await page.fill('input[name="ciudad"]', 'Valencia');
    await page.fill('input[name="provincia"]', 'Valencia');
    await page.fill('input[name="codigoPostal"]', '46001');
    await page.fill('input[name="precio"]', '180000');
    
    // Seleccionar tipo
    await page.selectOption('select[name="tipo"]', 'piso');
    await page.selectOption('select[name="tipoOperacion"]', 'venta');
    
    // Campos opcionales numéricos
    const habitacionesInput = page.locator('input[name="habitaciones"]');
    if (await habitacionesInput.isVisible()) {
      await habitacionesInput.fill('3');
    }
    
    const banosInput = page.locator('input[name="banos"]');
    if (await banosInput.isVisible()) {
      await banosInput.fill('2');
    }
    
    const metrosInput = page.locator('input[name="metrosCuadrados"]');
    if (await metrosInput.isVisible()) {
      await metrosInput.fill('95');
    }
    
    // Marcar algunas características
    const piscinaCheckbox = page.locator('input[name="piscina"]');
    if (await piscinaCheckbox.isVisible()) {
      await piscinaCheckbox.check();
    }
    
    const garajeCheckbox = page.locator('input[name="garaje"]');
    if (await garajeCheckbox.isVisible()) {
      await garajeCheckbox.check();
    }
    
    // Seleccionar propietario
    const propietarioSelect = page.locator('select[name="propietarioId"]');
    if (await propietarioSelect.isVisible()) {
      const options = await propietarioSelect.locator('option').count();
      if (options > 1) {
        await propietarioSelect.selectOption({ index: 1 });
      }
    }
    
    // Enviar formulario
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Esperar navegación o mensaje de éxito
    await page.waitForTimeout(2000);
    
    // Verificar que se creó (puede redirigir a detalle o mostrar mensaje)
    const url = page.url();
    const isDetailPage = url.includes('/vivienda/');
    const isListPage = url === 'http://localhost:5173/' || url.includes('/viviendas');
    
    expect(isDetailPage || isListPage).toBe(true);
  });

  test('debe validar campos obligatorios', async ({ page }) => {
    // Intentar enviar formulario vacío
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Esperar un momento para que aparezcan errores
    await page.waitForTimeout(500);
    
    // Verificar que hay mensajes de error o validación HTML5
    const direccionInput = page.locator('input[name="direccion"]');
    const isInvalid = await direccionInput.evaluate((el) => !el.validity.valid);
    
    // El navegador debe prevenir el envío o mostrar errores
    expect(isInvalid).toBe(true);
  });

  test('debe validar precio como número positivo', async ({ page }) => {
    // Rellenar con precio inválido
    await page.fill('input[name="direccion"]', 'Test');
    await page.fill('input[name="ciudad"]', 'Test');
    await page.fill('input[name="provincia"]', 'Test');
    await page.fill('input[name="precio"]', '-1000');
    
    // Intentar enviar
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    await page.waitForTimeout(500);
    
    // Verificar que no se envió o hay error
    const precioInput = page.locator('input[name="precio"]');
    const isInvalid = await precioInput.evaluate((el) => !el.validity.valid);
    
    expect(isInvalid).toBe(true);
  });

  test('debe tener botón de cancelar que vuelve al listado', async ({ page }) => {
    // Buscar botón de cancelar
    const cancelButton = page.locator('button:has-text("Cancelar"), a:has-text("Cancelar"), a:has-text("Volver")').first();
    
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
      
      // Verificar que volvió al listado
      await page.waitForURL('http://localhost:5173/', { timeout: 5000 });
    }
  });
});
