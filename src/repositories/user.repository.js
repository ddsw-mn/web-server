const fs = require('fs');

const encoding = 'utf-8';
const filename = 'data/users.json';

class UserRepository {

  constructor() {
    this.getAllUsers((err, users) => {
      if (err) {
        console.error('Error al inicializar el repositorio de usuarios:', err);
        this.nextId = 1;
      } else {
        this.nextId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
      }
    });
  }
  
  getAllUsers(callback) {
    fs.readFile(filename, { encoding }, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, JSON.parse(data || '[]'));
      }
    });
  }

  getUserByCode(code, callback) {
    this.getAllUsers((err, users) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users.find(user => user.code === code));
      }
    });
  }

  createUser(payload, callback) {
    this.getAllUsers((err, users) => {
      if (err) {
        callback(err, null);
      } else {
        const newUser = {
          id: this.nextId++,
          code: payload.code,
          name: payload.name,
          mail: payload.mail
        };
        users.push(newUser);
        this.saveUsers(users, (err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, newUser);
          }
        });
      }
    });
  }

  updateUserByCode(code, payload, callback) {
    this.getAllUsers((err, users) => {
      if (err) {
        callback(err, null);
      } else {
        const userIndex = users.findIndex(user => user.code === code);

        if (userIndex === -1) {
          callback(null, null);
        } else {
          if (payload.name) {
            users[userIndex].name = payload.name;
          }

          if (payload.mail) {
            users[userIndex].mail = payload.mail;
          }

          this.saveUsers(users, (err, data) => callback(err, users[userIndex]));
        }
      }
    });
  }

  deleteUserByCode(code, callback) {
    this.getAllUsers((err, users) => {
      if (err) {
        callback(err, null);
      } else {
        const userIndex = users.findIndex(user => user.code === code);

        if (userIndex === -1) {
          callback(null, null);
        } else {
          const deletedUser = users.splice(userIndex, 1)[0];
          this.saveUsers(users, (err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, deletedUser);
            }
          });
        }
      }
    });
  }

  saveUsers(users = [], callback = () => {}) {
    fs.writeFile(filename, JSON.stringify(users, null, 2), { encoding }, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, users);
      }
    });
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserRepository;
