const AllExceptionHandler = (app) => {
    app.use((err, req, res, next) => {
      let status = err.status || err.statusCode || err.code;
      if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
      return res.status(status).json({
        errors: {
          statusCode: status,
          message: err.message || err.stack || "Internal Server Error",
        },
      });
    });
  };
  module.exports = { AllExceptionHandler };
  