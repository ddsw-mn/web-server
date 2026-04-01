class UserError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class UserNotFoundError extends UserError {
  constructor(code) {
    super(404, `Usuario con código ${code} no encontrado`);
  }
}

class UserAlreadyExistsError extends UserError {
  constructor(code) {
    super(409, `Ya existe un usuario con código ${code}`);
  }
}

class UserMissingFieldsError extends UserError {
  constructor(payload) {
    const fields = ['code', 'mail', 'name'].filter(field => !payload[field]);
    super(400, `Faltan campos requeridos: ${fields.join(', ')}.`);
  }
}

module.exports = {
  UserError,
  UserNotFoundError,
  UserAlreadyExistsError,
  UserMissingFieldsError
};