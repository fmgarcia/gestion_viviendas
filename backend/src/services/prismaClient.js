const { PrismaClient } = require('@prisma/client');

// Instancia única de Prisma Client para reutilizar en toda la aplicación
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Logs para desarrollo
});

module.exports = prisma;
