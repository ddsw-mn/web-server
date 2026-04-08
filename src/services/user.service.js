const UserRepository = require('../repositories/user.repository');
const { UserAlreadyExistsError, UserMissingFieldsError, UserNotFoundError } = require('../errors/user.errors');

class UserService {

  constructor({
    userRepository = UserRepository.instance() 
  } = {}) {
    this.userRepository = userRepository;
  }

  getUsers() {
    return this.userRepository.getAllUsers();
  }

  getUserByCode(code) {
    return this.userRepository.getUserByCode(code)
      .then(user => this.validateUserExists(code, user));
  }

  createUser(payload) {
    if (!payload.name || !payload.mail || !payload.code) {
      return Promise.reject(new UserMissingFieldsError(payload));
    }
    return this.userRepository.getUserByCode(payload.code)
      .then(user => {
        if (user) {
          throw new UserAlreadyExistsError(payload.code);
        }
        return this.userRepository.createUser(payload);
      });
  }

  updateUserByCode(code, payload) {
    return this.userRepository.updateUserByCode(code, payload)
      .then(user => this.validateUserExists(code, user));
  }

  deleteUserByCode(code) {
    return this.userRepository.deleteUserByCode(code)
      .then(user => this.validateUserExists(code, user));
  }

  validateUserExists(code, user) {
    if (!user) {
      throw new UserNotFoundError(code);
    }
    return user;
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserService;
