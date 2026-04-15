const UserService = require('../services/user.service');

class UserController {

  constructor({
    userService = UserService.instance()
  } = {}) {
    this.userService = userService;
  }

  getUsers(req, res) {
    return this.userService
      .getUsers()
      .then(users => res.status(200).json(users));
  }
  
  getUserByCode(req, res) {
    return this.userService
      .getUserByCode(req.params.code)
      .then(user => res.status(200).json(user));
  }
  
  createUser(req, res) {
    return this.userService
      .createUser(req.body)
      .then(user => res.status(201).json(user));
  }
  
  updateUserByCode(req, res) {
    return this.userService
      .updateUserByCode(req.params.code, req.body)
      .then(user => res.status(200).json(user));
  }
  
  deleteUserByCode(req, res) {
    return this.userService
      .deleteUserByCode(req.params.code)
      .then(user => res.status(200).json(user));
  }
  
  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserController;
