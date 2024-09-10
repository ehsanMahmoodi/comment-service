const { Router } = require("express");
const { UserController } = require("./user.controller");

const router = Router();
router.get(
  "/get-all",
  UserController.getAllUser,
);
module.exports = {
  UserRouter: router,
};
