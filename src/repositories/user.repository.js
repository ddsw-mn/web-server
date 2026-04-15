const fs = require('fs');

class UserRepository {

  constructor() {
    this.users = [
      { "id": 1, "code": "123.123-1", "name": "Fede Scarpa", "mail": "fscarpa@frba.utn.edu.ar" },
      { "id": 2, "code": "456.456-2", "name": "Leo Cesario", "mail": "lcesario@frba.utn.edu.ar" }
    ];
    this.nextId = 3;
  }
  
  getAllUsers() {
    return new Promise((resolve, reject) => {
      asincronico(() => {
        resolve(this.users);
      });
    })
  }

  getUserByCode(code) {
    return new Promise((resolve, reject) => {
      asincronico(() => {
        resolve(this.users.find(user => user.code === code));
      });
    });
  }

  createUser(payload) {
    return new Promise((resolve, reject) => {
      asincronico(() => {
        const newUser = {
          id: this.nextId++,
          code: payload.code,
          name: payload.name,
          mail: payload.mail
        };
        this.users.push(newUser);
        resolve(newUser);
      });
    });
  }

  updateUserByCode(code, payload) {
    return new Promise((resolve, reject) => {
      asincronico(() => {
        const userIndex = this.users.findIndex(user => user.code === code);

        if (userIndex === -1) {
          resolve(null);
        } else {
          if (payload.name) {
            this.users[userIndex].name = payload.name;
          }

          if (payload.mail) {
            this.users[userIndex].mail = payload.mail;
          }

          resolve(this.users[userIndex]);
        }
      });
    });
  }

  deleteUserByCode(code) {
    return new Promise((resolve, reject) => {
      asincronico(() => {
        const userIndex = this.users.findIndex(user => user.code === code);

        if (userIndex === -1) {
          resolve(null);
        } else {
          resolve(this.users.splice(userIndex, 1)[0]);
        }
      });
    });
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

function asincronico(callback) {
  setTimeout(callback, 500);
}

module.exports = UserRepository;
