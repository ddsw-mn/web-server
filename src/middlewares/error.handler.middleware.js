const { UserError } = require("../errors/user.errors");

function errorHandler(error, _req, res, next) {
  
  console.error(error);

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      message: 'Error al parsear JSON',
      error: error.message
    });
  }
  if (error instanceof UserError) {
    return res.status(error.status).json({
      message: error.message
    });
  }
  if (error instanceof Error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }

  return next(error);
}

module.exports = {
  errorHandler
};