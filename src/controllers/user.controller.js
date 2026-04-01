const UserService = require('../services/user.service');

class UserController {

  constructor({
    userService = UserService.instance()
  } = {}) {
    this.userService = userService;
  }

  getUsers(req, res, next) {
    try {
      return res.status(200).json(this.userService.getUsers());
    } catch (error) {
      next(error);
    }
  }
  
  getUserByCode(req, res, next) {
    try {
      return res.status(200).json(this.userService.getUserByCode(req.params.code));
    } catch (error) {
      next(error);
    }
  }
  
  createUser(req, res, next) {
    try {
      return res.status(201).json(this.userService.createUser(req.body));
    } catch (error) {
      next(error);
    }
  }
  
  updateUserByCode(req, res, next) {
    try {
      return res.status(200).json(this.userService.updateUserByCode(req.params.code, req.body));
    } catch (error) {
      next(error);
    }
  }
  
  deleteUserByCode(req, res, next) {
    try {
      return res.status(200).json(this.userService.deleteUserByCode(req.params.code));
    } catch (error) {
      next(error);
    }
  }
  
  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserController;
