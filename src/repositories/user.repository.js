
class UserRepository {

  constructor() {
    this.nextId = 1;

    this.users = [];

    this.createUser({ code: '123.123-1', name: 'Fede Scarpa', mail: 'fscarpa@frba.utn.edu.ar' });
    this.createUser({ code: '456.456-2', name: 'Leo Cesario', mail: 'lcesario@frba.utn.edu.ar' });
  }
  
  getAllUsers() {
    return this.users;
  }

  getUserByCode(code) {
    return this.users.find(function(user) {
      return user.code === code;
    });
  }

  createUser(payload) {
    const newUser = {
      id: this.nextId++,
      code: payload.code,
      name: payload.name,
      mail: payload.mail
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUserByCode(code, payload) {
    const userIndex = this.users.findIndex(function(user) {
      return user.code === code;
    });

    if (userIndex === -1) {
      return null;
    }

    if (payload.name) {
      this.users[userIndex].name = payload.name;
    }

    if (payload.mail) {
      this.users[userIndex].mail = payload.mail;
    }

    return this.users[userIndex];
  }

  deleteUserByCode(code) {
    const userIndex = this.users.findIndex(user => user.code === code);

    if (userIndex === -1) {
      return null;
    }

    return this.users.splice(userIndex, 1)[0];
  }

  static instance() {
    this._instance ||= new this();

    return this._instance;
  }
}

module.exports = UserRepository;
