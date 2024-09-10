require("dotenv").config();
const express = require("express");
const { MainRouter } = require("./src/main.routes");
const { NotfoundHandler } = require("./src/common/exceptions/not-found");
const {
  AllExceptionHandler,
} = require("./src/common/exceptions/all-exception");
const { swaggerConfig } = require("./src/configs/swagger.config");
const cookieParser = require('cookie-parser')
const main = () => {
  // initial app
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser())
  // config's
  require("./src/configs/mongoose.config");
  swaggerConfig(app)
  // routes
  app.use(MainRouter);
  // error-handling
  NotfoundHandler(app);
  AllExceptionHandler(app);
  // server-connection
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
};
main();
