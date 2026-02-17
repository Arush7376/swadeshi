module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  res.status(statusCode).json({ error: message });
};
