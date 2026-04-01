const http = require('http');
const url = require('url');

const PORT = 3000;
const HOST = 'localhost';

let id = 3;

// Almacenamiento en memoria de usuarios
let users = [
  { id: 1, code: '123.123-1', name: 'Fede Scarpa', mail: 'fscarpa@frba.utn.edu.ar' },
  { id: 2, code: '456.456-2', name: 'Leo Cesario', mail: 'lcesario@frba.utn.edu.ar' }
];

const server = http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = req.method;

  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /users - Obtener todos los usuarios
  if (path === 'users' && method === 'GET') {
    sendResponse(res, 200, users);
  }
  
  // GET /users/:code - Obtener un usuario por código
  else if (path.match(/^users\/(.+)$/) && method === 'GET') {
    const code = path.split('/')[1];
    const user = users.find(function(u) {
      return u.code === code;
    });
    
    if (user) {
      sendResponse(res, 200, user);
    } else {
      sendResponse(res, 404, { 
        message: 'Usuario no encontrado'
      });
    }
  }
  
  // POST /users - Crear un nuevo usuario
  else if (path === 'users' && method === 'POST') {
    requestBody(req, function(error, body) {
      if (error) {
        sendResponse(res, 400, {
          message: 'Error al parsear JSON',
          error: error.message
        });
        return;
      }
      
      // Validación básica
      if (!body.name || !body.age || !body.code) {
        sendResponse(res, 400, {
          message: 'Faltan campos requeridos: name, mail, code'
        });
        return;
      }
      
      // Verificar si el código ya existe
      const existingUser = users.find(function(u) {
        return u.code === body.code;
      });
      
      if (existingUser) {
        sendResponse(res, 409, {
          message: 'Ya existe un usuario con ese código'
        });
        return;
      }
      
      const newUser = {
        id: id++,
        code: body.code,
        name: body.name,
        mail: body.mail
      };
      
      users.push(newUser);
      
      sendResponse(res, 201, { id });
    });
  }
  
  // PUT /users/:code - Actualizar un usuario
  else if (path.match(/^users\/(.+)$/) && method === 'PUT') {
    const code = path.split('/')[1];
    
    requestBody(req, function(error, body) {
      if (error) {
        sendResponse(res, 400, {
          message: 'Error al parsear JSON',
          error: error.message
        });
        return;
      }
      
      let userIndex = -1;
      for (let i = 0; i < users.length; i++) {
        if (users[i].code === code) {
          userIndex = i;
          break;
        }
      }
      
      if (userIndex === -1) {
        sendResponse(res, 404, {
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      // Actualizar solo los campos proporcionados
      if (body.name) {
        users[userIndex].name = body.name;
      }
      if (body.mail) {
        users[userIndex].mail = body.mail;
      }
      
      sendResponse(res, 200, users[userIndex]);
    });
  }
  
  // DELETE /users/:code - Eliminar un usuario
  else if (path.match(/^users\/(.+)$/) && method === 'DELETE') {
    const code = path.split('/')[1];
    let userIndex = -1;
    
    for (let i = 0; i < users.length; i++) {
      if (users[i].code === code) {
        userIndex = i;
        break;
      }
    }
    
    if (userIndex === -1) {
      sendResponse(res, 404, {
        message: 'Usuario no encontrado'
      });
      return;
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    sendResponse(res, 200, deletedUser);
  }
  
  // Ruta no encontrada
  else {
    sendResponse(res, 404, {
      message: 'Ruta no encontrada'
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   GET    http://${HOST}:${PORT}/users`);
  console.log(`   GET    http://${HOST}:${PORT}/users/:code`);
  console.log(`   POST   http://${HOST}:${PORT}/users`);
  console.log(`   PUT    http://${HOST}:${PORT}/users/:code`);
  console.log(`   DELETE http://${HOST}:${PORT}/users/:code`);
});

// Funciones Auxiliares

function requestBody(req, callback) {
  let body = '';
  
  req.on('data', (chunk) => body += chunk.toString());
  
  req.on('end', () => {
    if (body) {
      try {
        const parsed = JSON.parse(body);
        callback(null, parsed);
      } catch (error) {
        callback(error, null);
      }
    } else {
      callback(null, {});
    }
  });
  
  req.on('error', (error) => callback(error, null));
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

