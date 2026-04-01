let nextId = 3;

const users = [
  { id: 1, code: '123.123-1', name: 'Fede Scarpa', mail: 'fscarpa@frba.utn.edu.ar' },
  { id: 2, code: '456.456-2', name: 'Leo Cesario', mail: 'lcesario@frba.utn.edu.ar' }
];

function getAllUsers() {
  return users;
}

function getUserByCode(code) {
  return users.find(function(user) {
    return user.code === code;
  });
}

function createUser(payload) {
  const newUser = {
    id: nextId++,
    code: payload.code,
    name: payload.name,
    mail: payload.mail
  };

  users.push(newUser);
  return newUser;
}

function updateUserByCode(code, payload) {
  const userIndex = users.findIndex(function(user) {
    return user.code === code;
  });

  if (userIndex === -1) {
    return null;
  }

  if (payload.name) {
    users[userIndex].name = payload.name;
  }

  if (payload.mail) {
    users[userIndex].mail = payload.mail;
  }

  return users[userIndex];
}

function deleteUserByCode(code) {
  const userIndex = users.findIndex(function(user) {
    return user.code === code;
  });

  if (userIndex === -1) {
    return null;
  }

  return users.splice(userIndex, 1)[0];
}

module.exports = {
  getAllUsers,
  getUserByCode,
  createUser,
  updateUserByCode,
  deleteUserByCode
};
