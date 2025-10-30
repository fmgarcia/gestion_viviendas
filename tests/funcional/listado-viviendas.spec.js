const { test, expect } = require('@playwright/test');

test.describe('Listado de Viviendas', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe cargar la página principal correctamente', async ({ page }) => {
    // Verificar título
    await expect(page).toHaveTitle(/Gestión de Viviendas/i);
    
    // Verificar que hay un encabezado principal
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('debe mostrar tarjetas de viviendas', async ({ page }) => {
    // Esperar a que carguen las tarjetas
    await page.waitForSelector('.vivienda-card, [class*="card"]', { timeout: 10000 });
    
    // Verificar que hay al menos una tarjeta
    const cards = page.locator('.vivienda-card, [class*="card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe filtrar viviendas por ciudad', async ({ page }) => {
    // Buscar el input de ciudad (puede tener diferentes atributos)
    const ciudadInput = page.locator('input[name="ciudad"], input[placeholder*="ciudad" i]').first();
    
    // Verificar que el input existe
    await expect(ciudadInput).toBeVisible();
    
    // Ingresar texto
    await ciudadInput.fill('Alicante');
    
    // Esperar a que se actualicen los resultados (pequeña pausa para el debounce)
    await page.waitForTimeout(500);
    
    // Verificar que se muestran resultados
    const cards = page.locator('.vivienda-card, [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
  });

  test('debe navegar a detalle de vivienda', async ({ page }) => {
    // Esperar a que carguen las tarjetas
    await page.waitForSelector('.vivienda-card, [class*="card"]', { timeout: 10000 });
    
    // Click en el primer botón de "Ver detalles" o "Ver más"
    const detailButton = page.locator('button:has-text("Ver"), a:has-text("Ver")').first();
    await detailButton.click();
    
    // Verificar que navegó a una página de detalle (URL cambió)
    await page.waitForURL(/\/vivienda\/\d+/, { timeout: 5000 });
    
    // Verificar que hay contenido de detalle
    const content = page.locator('main, .container, [class*="detail"]');
    await expect(content).toBeVisible();
  });

  test('debe mostrar paginación si hay muchas viviendas', async ({ page }) => {
    // Buscar elementos de paginación
    const pagination = page.locator('[class*="pagination"], nav[aria-label*="pagination" i]');
    
    // Si existe paginación, verificar que tiene botones
    const paginationExists = await pagination.count() > 0;
    
    if (paginationExists) {
      const buttons = pagination.locator('button, a');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    }
  });

  test('debe tener botón para crear nueva vivienda', async ({ page }) => {
    // Buscar botón de crear nueva vivienda
    const newButton = page.locator('button:has-text("Nueva"), a:has-text("Nueva")').first();
    
    await expect(newButton).toBeVisible();
    
    // Click en el botón
    await newButton.click();
    
    // Verificar que navega a formulario de creación
    await page.waitForURL(/\/(vivienda\/nuevo|nueva-vivienda|crear)/, { timeout: 5000 });
  });

  test('debe poder exportar a CSV', async ({ page }) => {
    // Buscar botón de exportar
    const exportButton = page.locator('button:has-text("Exportar"), button:has-text("CSV")').first();
    
    if (await exportButton.isVisible()) {
      // Configurar listener para la descarga
      const downloadPromise = page.waitForEvent('download');
      
      // Click en exportar
      await exportButton.click();
      
      // Esperar descarga
      const download = await downloadPromise;
      
      // Verificar que el archivo tiene extensión CSV
      expect(download.suggestedFilename()).toMatch(/\.csv$/i);
    }
  });
});
