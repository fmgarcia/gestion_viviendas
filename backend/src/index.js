require('dotenv').config();
const app = require('./app');
const prisma = require('./services/prismaClient');

const PORT = process.env.PORT || 4000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log('='.repeat(50));
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT recibido. Cerrando servidor...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Servidor cerrado');
    process.exit(0);
  });
});
