const autoBind = require("auto-bind");
const { AuthMessage } = require("./auth.message");
const { AuthService } = require("./auth.service");
class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtp(req, res, next) {
    try {
      const {
        body: { phone },
      } = req;
      const user = await this.#service.sendOtp(phone);
      res.send({
        data: {
          message: AuthMessage.OtpSend,
          code: user?.otp?.code,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      const {
        body: { phone, code },
      } = req;
      const accessToken = await this.#service.checkOtp(phone, code);
      res.cookie('accessToken',accessToken,{
        expires:new Date("March 28,2025 18:23:00")
      }).send({
        message: AuthMessage.login,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  AuthController: new AuthController(),
};
