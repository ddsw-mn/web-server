const UserRepository = require('../repositories/user.repository');
const { UserAlreadyExistsError, UserMissingFieldsError, UserNotFoundError } = require('../errors/user.errors');

class UserService {

  constructor({
    userRepository = UserRepository.instance() 
  } = {}) {
    this.userRepository = userRepository;
  }

  getUsers(callback) {
    this.userRepository.getAllUsers(callback);
  }

  getUserByCode(code, callback) {
    this.userRepository.getUserByCode(code, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        this.validateUserExists(code, user, callback);
      }
    });
  }

  createUser(payload, callback) {
    if (!payload.name || !payload.mail || !payload.code) {
      callback(new UserMissingFieldsError(payload), null);
    } else {
      this.userRepository.getUserByCode(payload.code, (err, user) => {
        if (err) {
          callback(err, null);
        } else if (user) {
          callback(new UserAlreadyExistsError(payload.code), null);
        } else {
          this.userRepository.createUser(payload, callback);
        }
      });
    }
  }

  updateUserByCode(code, payload, callback) {
    this.userRepository.updateUserByCode(code, payload || {}, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        this.validateUserExists(code, user, callback);
      }
    });
  }

  deleteUserByCode(code, callback) {
    this.userRepository.deleteUserByCode(code, (err, user) => {
      if (err) {
        callback(err, null);
      } else {
        this.validateUserExists(code, user, callback);
      }
    });
  }

  validateUserExists(code, user, callback) {
    if (!user) {
      callback(new UserNotFoundError(code), null);
    } else {
      callback(null, user);
    }
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserService;
