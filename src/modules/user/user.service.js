const autoBind = require("auto-bind");
const { UserModel } = require("./user.model");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async getAllUser(search) {
    if (search) {
      return await this.#model.find(
        {
          $text: {
            $search: search,
          },
        },
        {
          otp: 0,
          __v: 0,
        }
      );
    }
    return await this.#model.find({}, { otp: 0, __v: 0 });
  }
  async;
}
module.exports = { UserService: new UserService() };
