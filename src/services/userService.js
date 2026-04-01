const userRepository = require('../repositories/userRepository');

function getUsers() {
  return userRepository.getAllUsers();
}

function getUserByCode(code) {
  return userRepository.getUserByCode(code);
}

function createUser(payload) {
  if (!payload.name || !payload.mail || !payload.code) {
    return {
      ok: false,
      status: 400,
      data: {
        message: 'Faltan campos requeridos: name, mail, code'
      }
    };
  }

  const existingUser = userRepository.getUserByCode(payload.code);
  if (existingUser) {
    return {
      ok: false,
      status: 409,
      data: {
        message: 'Ya existe un usuario con ese código'
      }
    };
  }

  const newUser = userRepository.createUser(payload);

  return {
    ok: true,
    status: 201,
    data: {
      id: newUser.id
    }
  };
}

function updateUserByCode(code, payload) {
  const updatedUser = userRepository.updateUserByCode(code, payload || {});

  if (!updatedUser) {
    return {
      ok: false,
      status: 404,
      data: {
        message: 'Usuario no encontrado'
      }
    };
  }

  return {
    ok: true,
    status: 200,
    data: updatedUser
  };
}

function deleteUserByCode(code) {
  const deletedUser = userRepository.deleteUserByCode(code);

  if (!deletedUser) {
    return {
      ok: false,
      status: 404,
      data: {
        message: 'Usuario no encontrado'
      }
    };
  }

  return {
    ok: true,
    status: 200,
    data: deletedUser
  };
}

module.exports = {
  getUsers,
  getUserByCode,
  createUser,
  updateUserByCode,
  deleteUserByCode
};
