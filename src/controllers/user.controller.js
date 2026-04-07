const UserService = require('../services/user.service');

class UserController {

  constructor({
    userService = UserService.instance()
  } = {}) {
    this.userService = userService;
  }

  getUsers(req, res, next) {
    this.userService.getUsers((err, users) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(users);
      }
    });
  }
  
  getUserByCode(req, res, next) {
    this.userService.getUserByCode(req.params.code, (err, user) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
  
  createUser(req, res, next) {
    this.userService.createUser(req.body, (err, user) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(user);
      }
    });
  }
  
  updateUserByCode(req, res, next) {
    this.userService.updateUserByCode(req.params.code, req.body, (err, user) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
  
  deleteUserByCode(req, res, next) {
    this.userService.deleteUserByCode(req.params.code, (err, user) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
  
  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserController;
