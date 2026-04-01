const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:code', userController.getUserByCode);
router.post('/users', userController.createUser);
router.put('/users/:code', userController.updateUserByCode);
router.delete('/users/:code', userController.deleteUserByCode);

module.exports = router;
