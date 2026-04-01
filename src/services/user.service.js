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
    return this.validateUserExists(code, this.userRepository.getUserByCode(code));
  }

  createUser(payload) {
    if (!payload.name || !payload.mail || !payload.code) {
      throw new UserMissingFieldsError(payload);
    }
    if (this.userRepository.getUserByCode(payload.code)) {
      throw new UserAlreadyExistsError(payload.code);
    }
    return this.userRepository.createUser(payload);
  }

  updateUserByCode(code, payload) {
    return this.validateUserExists(code, this.userRepository.updateUserByCode(code, payload || {}));
  }

  deleteUserByCode(code) {
    return this.validateUserExists(code, this.userRepository.deleteUserByCode(code));
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
