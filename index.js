const express = require('express');

const PORT = 3000;
const HOST = 'localhost';

let id = 3;

// Almacenamiento en memoria de usuarios
let users = [
  { id: 1, code: '123.123-1', name: 'Fede Scarpa', mail: 'fscarpa@frba.utn.edu.ar' },
  { id: 2, code: '456.456-2', name: 'Leo Cesario', mail: 'lcesario@frba.utn.edu.ar' }
];

const app = express();

app.use(express.json());

// Habilitar CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  return next();
});

// GET /users - Obtener todos los usuarios
app.get('/users', function(req, res) {
  res.status(200).json(users);
});

// GET /users/:code - Obtener un usuario por código
app.get('/users/:code', function(req, res) {
  const user = users.find(function(u) {
    return u.code === req.params.code;
  });

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(404).json({
    message: 'Usuario no encontrado'
  });
});

// POST /users - Crear un nuevo usuario
app.post('/users', function(req, res) {
  const body = req.body || {};

  // Validación básica
  if (!body.name || !body.mail || !body.code) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: name, mail, code'
    });
  }

  // Verificar si el código ya existe
  const existingUser = users.find(function(u) {
    return u.code === body.code;
  });

  if (existingUser) {
    return res.status(409).json({
      message: 'Ya existe un usuario con ese código'
    });
  }

  const newUser = {
    id: id++,
    code: body.code,
    name: body.name,
    mail: body.mail
  };

  users.push(newUser);

  return res.status(201).json({ id: newUser.id });
});

// PUT /users/:code - Actualizar un usuario
app.put('/users/:code', function(req, res) {
  const body = req.body || {};
  const userIndex = users.findIndex(function(user) {
    return user.code === req.params.code;
  });

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    });
  }

  // Actualizar solo los campos proporcionados
  if (body.name) {
    users[userIndex].name = body.name;
  }
  if (body.mail) {
    users[userIndex].mail = body.mail;
  }

  return res.status(200).json(users[userIndex]);
});

// DELETE /users/:code - Eliminar un usuario
app.delete('/users/:code', function(req, res) {
  const userIndex = users.findIndex(function(user) {
    return user.code === req.params.code;
  });

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return res.status(200).json(deletedUser);
});

// Manejo de JSON inválido
app.use(function(error, _req, res, next) {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      message: 'Error al parsear JSON',
      error: error.message
    });
  }

  return next(error);
});

// Ruta no encontrada
app.use(function(_req, res) {
  return res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   GET    http://${HOST}:${PORT}/users`);
  console.log(`   GET    http://${HOST}:${PORT}/users/:code`);
  console.log(`   POST   http://${HOST}:${PORT}/users`);
  console.log(`   PUT    http://${HOST}:${PORT}/users/:code`);
  console.log(`   DELETE http://${HOST}:${PORT}/users/:code`);
});

