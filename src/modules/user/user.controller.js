const autoBind = require("auto-bind");
const { UserService } = require("./user.service");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }
  async getAllUser(req, res, next) {
    try {
      const {
        query: { search },
      } = req;
      const users = await this.#service.getAllUser(search || "");
      res.send({
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { UserController: new UserController() };
