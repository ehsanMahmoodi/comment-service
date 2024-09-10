const NotfoundHandler = (app) => {
    app.use((req, res, next) => {
      res.status(404).send({
        errors: {
          statusCode: res.statusCode,
          message: `${req.url} route is not found with ${req.method.toUpperCase()} method `,
        },
      });
    });
  };
  module.exports = { NotfoundHandler };
  