const fs = require('fs/promises');

const encoding = 'utf-8';
const filename = 'data/users.json';

class UserRepository {

  constructor() {
    this.getAllUsers()
      .then(users => {
        this.nextId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
      });
  }
  
  getAllUsers() {
    return fs.readFile(filename, { encoding })
      .then(data => JSON.parse(data || '[]'))
  }

  getUserByCode(code) {
    return this.getAllUsers()
      .then(users => users.find(user => user.code === code));
  }

  createUser(payload) {
    const newUser = {
      id: this.nextId++,
      code: payload.code,
      name: payload.name,
      mail: payload.mail
    };
    return this.getAllUsers()
      .then(users => users.concat(newUser))
      .then(users => this.saveUsers(users))
      .then(() => newUser);
  }

  updateUserByCode(code, payload) {
    return this.getAllUsers()
      .then(users => users.mapIf(
        user => user.code === code, 
        user => ({...user, name: payload.name, mail: payload.mail})
      ))
      .then(users => this.saveUsers(users))
      .then(() => this.getUserByCode(code));
  }

  deleteUserByCode(code) {
    return this.getAllUsers()
      .then(users => {
        const userIndex = users.findIndex(user => user.code === code);
        if (userIndex === -1) {
          return Promise.resolve(null);
        } else {
          const deletedUser = users.splice(userIndex, 1)[0];
          return this.saveUsers(users).then(() => deletedUser);
        }
      });
  }

  saveUsers(users = []) {
    return fs.writeFile(filename, JSON.stringify(users, null, 2), { encoding })
      .then(() => users)
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserRepository;
