const app = require('./app');

const PORT = 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   GET    http://${HOST}:${PORT}/users`);
  console.log(`   GET    http://${HOST}:${PORT}/users/:code`);
  console.log(`   POST   http://${HOST}:${PORT}/users`);
  console.log(`   PUT    http://${HOST}:${PORT}/users/:code`);
  console.log(`   DELETE http://${HOST}:${PORT}/users/:code`);
});

