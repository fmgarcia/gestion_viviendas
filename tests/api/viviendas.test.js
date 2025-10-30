const request = require('supertest');
const app = require('../../backend/src/app');

describe('API de Viviendas - GET /api/viviendas', () => {
  
  it('debe devolver una lista de viviendas con éxito', async () => {
    const response = await request(app)
      .get('/api/viviendas')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination).toBeDefined();
    expect(response.body.pagination).toHaveProperty('page');
    expect(response.body.pagination).toHaveProperty('limit');
    expect(response.body.pagination).toHaveProperty('total');
  });

  it('debe filtrar viviendas por ciudad', async () => {
    const response = await request(app)
      .get('/api/viviendas?ciudad=Alicante')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    
    // Si hay resultados, verificar que todas sean de Alicante
    if (response.body.data.length > 0) {
      response.body.data.forEach(vivienda => {
        expect(vivienda.ciudad).toBe('Alicante');
      });
    }
  });

  it('debe filtrar viviendas por rango de precio', async () => {
    const response = await request(app)
      .get('/api/viviendas?precioMin=100000&precioMax=200000')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    
    if (response.body.data.length > 0) {
      response.body.data.forEach(vivienda => {
        const precio = parseFloat(vivienda.precio);
        expect(precio).toBeGreaterThanOrEqual(100000);
        expect(precio).toBeLessThanOrEqual(200000);
      });
    }
  });

  it('debe manejar paginación correctamente', async () => {
    const response = await request(app)
      .get('/api/viviendas?page=1&limit=2')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(2);
    expect(response.body.data.length).toBeLessThanOrEqual(2);
  });

  it('debe buscar viviendas por texto', async () => {
    const response = await request(app)
      .get('/api/viviendas?search=piscina')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('API de Viviendas - GET /api/viviendas/:id', () => {
  
  it('debe devolver una vivienda existente', async () => {
    // Primero obtenemos una vivienda del listado
    const listResponse = await request(app).get('/api/viviendas');
    
    if (listResponse.body.data.length > 0) {
      const viviendaId = listResponse.body.data[0].id;
      
      const response = await request(app)
        .get(`/api/viviendas/${viviendaId}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('direccion');
      expect(response.body.data).toHaveProperty('ciudad');
    }
  });

  it('debe devolver 404 para vivienda no encontrada', async () => {
    const response = await request(app)
      .get('/api/viviendas/999999999')
      .expect(404);
    
    expect(response.body.success).toBe(false);
  });
});

describe('API de Viviendas - POST /api/viviendas', () => {
  
  it('debe crear una vivienda con datos válidos', async () => {
    const nuevaVivienda = {
      direccion: 'C/ Test Jest 123',
      ciudad: 'Valencia',
      provincia: 'Valencia',
      codigoPostal: '46001',
      precio: 150000,
      tipo: 'piso',
      tipoOperacion: 'venta',
      habitaciones: 3,
      banos: 2,
      metrosCuadrados: 90,
      piscina: true,
      garaje: false,
      terraza: false,
      ascensor: true,
      trastero: false,
      propietarioId: 1
    };

    const response = await request(app)
      .post('/api/viviendas')
      .send(nuevaVivienda)
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.direccion).toBe(nuevaVivienda.direccion);
    expect(response.body.data.ciudad).toBe(nuevaVivienda.ciudad);
  });

  it('debe rechazar vivienda sin campos obligatorios', async () => {
    const viviendaIncompleta = {
      ciudad: 'Valencia',
      // Falta dirección, precio, etc.
    };

    const response = await request(app)
      .post('/api/viviendas')
      .send(viviendaIncompleta)
      .expect(400);
    
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
  });

  it('debe rechazar precio negativo', async () => {
    const viviendaInvalida = {
      direccion: 'C/ Test',
      ciudad: 'Valencia',
      provincia: 'Valencia',
      codigoPostal: '46001',
      precio: -1000, // Precio inválido
      tipo: 'piso',
      tipoOperacion: 'venta',
      propietarioId: 1
    };

    const response = await request(app)
      .post('/api/viviendas')
      .send(viviendaInvalida)
      .expect(400);
    
    expect(response.body.success).toBe(false);
  });
});

describe('API de Viviendas - DELETE /api/viviendas/:id', () => {
  
  it('debe eliminar una vivienda existente', async () => {
    // Crear una vivienda para eliminar
    const nuevaVivienda = {
      direccion: 'C/ Para Eliminar',
      ciudad: 'Valencia',
      provincia: 'Valencia',
      codigoPostal: '46001',
      precio: 100000,
      tipo: 'piso',
      tipoOperacion: 'venta',
      propietarioId: 1
    };

    const createResponse = await request(app)
      .post('/api/viviendas')
      .send(nuevaVivienda);
    
    const viviendaId = createResponse.body.data.id;

    // Eliminar la vivienda
    const deleteResponse = await request(app)
      .delete(`/api/viviendas/${viviendaId}`)
      .expect(200);
    
    expect(deleteResponse.body.success).toBe(true);

    // Verificar que ya no existe
    await request(app)
      .get(`/api/viviendas/${viviendaId}`)
      .expect(404);
  });
});
