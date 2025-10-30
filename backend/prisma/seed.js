const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos...');

  // Limpiar datos existentes (opcional)
  await prisma.vivienda.deleteMany();
  await prisma.propietario.deleteMany();

  // Crear propietarios
  console.log('📋 Creando propietarios...');
  const propietario1 = await prisma.propietario.create({
    data: {
      nombre: 'Inmobiliaria Sol SL',
      email: 'contacto@sol.com',
      telefono: '600111222',
      direccion: 'Calle Mayor 1, Ciudad'
    }
  });

  const propietario2 = await prisma.propietario.create({
    data: {
      nombre: 'Particular García',
      email: 'fran.garcia@example.com',
      telefono: '600999888',
      direccion: 'Av. Central 10'
    }
  });

  console.log('✅ Propietarios creados');

  // Crear viviendas
  console.log('🏠 Creando viviendas...');
  
  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0001',
      direccion: 'C/ Gran Vía 12, 3ºA',
      ciudad: 'Alicante',
      provincia: 'Alicante',
      codigoPostal: '03001',
      tipo: 'piso',
      habitaciones: 3,
      banos: 2,
      metrosCuadrados: 95,
      anoConstruccion: 2005,
      planta: 3,
      piscina: false,
      garaje: true,
      trastero: true,
      terraza: true,
      ascensor: true,
      calefaccion: 'individual_gas',
      precio: 220000.00,
      moneda: 'EUR',
      tipoOperacion: 'venta',
      estado: 'disponible',
      lat: 38.3452,
      lng: -0.4810,
      descripcion: 'Piso luminoso, cerca del centro, buenas comunicaciones.',
      propietarioId: propietario2.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0002',
      direccion: 'Urb. Las Palmeras, Calle Lago 5',
      ciudad: 'Benidorm',
      provincia: 'Alicante',
      codigoPostal: '03501',
      tipo: 'chalet',
      habitaciones: 4,
      banos: 3,
      metrosCuadrados: 180,
      anoConstruccion: 1998,
      planta: null,
      piscina: true,
      garaje: true,
      trastero: true,
      terraza: false,
      ascensor: false,
      calefaccion: 'central',
      precio: 480000.00,
      moneda: 'EUR',
      tipoOperacion: 'venta',
      estado: 'disponible',
      lat: 38.5406,
      lng: -0.1223,
      descripcion: 'Chalet independiente con jardín y piscina privada.',
      propietarioId: propietario1.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0003',
      direccion: 'C/ Puerto, 6, 1º',
      ciudad: 'Alicante',
      provincia: 'Alicante',
      codigoPostal: '03002',
      tipo: 'estudio',
      habitaciones: 0,
      banos: 1,
      metrosCuadrados: 30,
      anoConstruccion: 2010,
      planta: 1,
      piscina: false,
      garaje: false,
      trastero: false,
      terraza: true,
      ascensor: true,
      calefaccion: 'individual_electrica',
      precio: 650.00,
      moneda: 'EUR',
      tipoOperacion: 'alquiler',
      estado: 'disponible',
      lat: 38.3459,
      lng: -0.4816,
      descripcion: 'Estudio reformado, amueblado, ideal para estudiante.',
      propietarioId: propietario2.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0004',
      direccion: 'Av. Mediterráneo 45, 5ºB',
      ciudad: 'Valencia',
      provincia: 'Valencia',
      codigoPostal: '46001',
      tipo: 'atico',
      habitaciones: 2,
      banos: 2,
      metrosCuadrados: 85,
      anoConstruccion: 2018,
      planta: 5,
      piscina: false,
      garaje: true,
      trastero: false,
      terraza: true,
      ascensor: true,
      calefaccion: 'individual_gas',
      precio: 285000.00,
      moneda: 'EUR',
      tipoOperacion: 'venta',
      estado: 'disponible',
      lat: 39.4699,
      lng: -0.3763,
      descripcion: 'Ático moderno con terraza amplia y vistas al mar.',
      propietarioId: propietario1.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0005',
      direccion: 'C/ Colón 8',
      ciudad: 'Alicante',
      provincia: 'Alicante',
      codigoPostal: '03003',
      tipo: 'local',
      habitaciones: 0,
      banos: 1,
      metrosCuadrados: 120,
      anoConstruccion: 1995,
      planta: 0,
      piscina: false,
      garaje: false,
      trastero: false,
      terraza: false,
      ascensor: false,
      calefaccion: 'ninguna',
      precio: 1500.00,
      moneda: 'EUR',
      tipoOperacion: 'alquiler',
      estado: 'disponible',
      lat: 38.3460,
      lng: -0.4815,
      descripcion: 'Local comercial en zona céntrica con gran escaparate.',
      propietarioId: propietario1.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0006',
      direccion: 'Urb. Los Pinos, C/ Roble 12',
      ciudad: 'Elche',
      provincia: 'Alicante',
      codigoPostal: '03201',
      tipo: 'adosado',
      habitaciones: 3,
      banos: 2,
      metrosCuadrados: 140,
      anoConstruccion: 2010,
      planta: null,
      piscina: true,
      garaje: true,
      trastero: true,
      terraza: true,
      ascensor: false,
      calefaccion: 'individual_gas',
      precio: 195000.00,
      moneda: 'EUR',
      tipoOperacion: 'venta',
      estado: 'disponible',
      lat: 38.2669,
      lng: -0.6983,
      descripcion: 'Adosado con piscina comunitaria y jardín privado.',
      propietarioId: propietario2.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0007',
      direccion: 'Plaza España 3, 2ºC',
      ciudad: 'Murcia',
      provincia: 'Murcia',
      codigoPostal: '30001',
      tipo: 'piso',
      habitaciones: 4,
      banos: 2,
      metrosCuadrados: 110,
      anoConstruccion: 2000,
      planta: 2,
      piscina: false,
      garaje: true,
      trastero: true,
      terraza: false,
      ascensor: true,
      calefaccion: 'central',
      precio: 950.00,
      moneda: 'EUR',
      tipoOperacion: 'alquiler',
      estado: 'disponible',
      lat: 37.9922,
      lng: -1.1307,
      descripcion: 'Piso amplio en pleno centro, perfecto para familias.',
      propietarioId: propietario1.id
    }
  });

  await prisma.vivienda.create({
    data: {
      referencia: 'REF-0008',
      direccion: 'C/ Altea 20',
      ciudad: 'Benidorm',
      provincia: 'Alicante',
      codigoPostal: '03502',
      tipo: 'piso',
      habitaciones: 2,
      banos: 1,
      metrosCuadrados: 70,
      anoConstruccion: 2015,
      planta: 1,
      piscina: true,
      garaje: true,
      trastero: false,
      terraza: true,
      ascensor: true,
      calefaccion: 'individual_electrica',
      precio: 165000.00,
      moneda: 'EUR',
      tipoOperacion: 'venta',
      estado: 'reservado',
      lat: 38.5384,
      lng: -0.1312,
      descripcion: 'Piso cerca de la playa con piscina comunitaria.',
      propietarioId: propietario2.id
    }
  });

  console.log('✅ Viviendas creadas');
  console.log('🎉 Seed completado con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
