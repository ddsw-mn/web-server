const userService = require('../services/userService');

function getUsers(_req, res) {
  const users = userService.getUsers();
  return res.status(200).json(users);
}

function getUserByCode(req, res) {
  const user = userService.getUserByCode(req.params.code);

  if (!user) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    });
  }

  return res.status(200).json(user);
}

function createUser(req, res) {
  const result = userService.createUser(req.body || {});
  return res.status(result.status).json(result.data);
}

function updateUserByCode(req, res) {
  const result = userService.updateUserByCode(req.params.code, req.body || {});
  return res.status(result.status).json(result.data);
}

function deleteUserByCode(req, res) {
  const result = userService.deleteUserByCode(req.params.code);
  return res.status(result.status).json(result.data);
}

module.exports = {
  getUsers,
  getUserByCode,
  createUser,
  updateUserByCode,
  deleteUserByCode
};
