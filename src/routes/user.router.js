const express = require('express');
const UserController = require('../controllers/user.controller');

const userController = UserController.instance();

const router = express.Router();

router.route('/')
  .get((req, res) => userController.getUsers(req, res))
  .post((req, res) => userController.createUser(req, res));

router.route('/:code')
  .get((req, res) => userController.getUserByCode(req, res))
  .put((req, res) => userController.updateUserByCode(req, res))
  .delete((req, res) => userController.deleteUserByCode(req, res));

module.exports = router;
