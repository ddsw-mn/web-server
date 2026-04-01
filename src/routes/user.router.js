const express = require('express');
const UserController = require('../controllers/user.controller');

const userController = UserController.instance();

const router = express.Router();

router.route('/users')
  .get((req, res, next) => userController.getUsers(req, res, next))
  .post((req, res, next) => userController.createUser(req, res, next));

router.route('/users/:code')
  .get((req, res, next) => userController.getUserByCode(req, res, next))
  .put((req, res, next) => userController.updateUserByCode(req, res, next))
  .delete((req, res, next) => userController.deleteUserByCode(req, res, next));

module.exports = router;
