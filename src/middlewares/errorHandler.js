function errorHandler(error, _req, res, next) {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      message: 'Error al parsear JSON',
      error: error.message
    });
  }

  return next(error);
}

module.exports = {
  errorHandler
};