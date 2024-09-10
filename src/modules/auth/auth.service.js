const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const { randomNumberGenerator } = require("../../common/utils/functions");
const createHttpError = require("http-errors");
const { AuthMessage } = require("./auth.message");
const jwt = require("jsonwebtoken");
class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  async sendOtp(phone) {
    const user = await this.#model.findOne({ phone });
    const now = new Date().getTime();
    const otp = {
      code: randomNumberGenerator(10000, 99999),
      expires: now + 1000 * 60 * 2,
    };
    if (!user) {
      return await this.#model.create({ phone, otp });
    }
    if (user.otp && user.otp.expires > now) {
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOtp(phone, code) {
    const user = await this.#checkUserExistByPhone(phone);
    const now = new Date().getTime();
    if (user.otp && user.otp.expires < now) {
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
    }
    if (user.otp && user.otp.code !== code) {
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeIncorrect);
    }
    user.verifiedPhone = true;
    await user.save();
    const accessToken = this.signAccessToken({
      userId: user._id,
    });
    return accessToken;
  }
  signAccessToken(payload) {
    return jwt.sign(payload, process.env.Access_TOKEN_SECRET_KEY, {
      expiresIn: "1y",
    });
  }
  async #checkUserExistByPhone(phone) {
    const user = await this.#model.findOne({ phone });
    if (!user) throw new createHttpError.NotFound(AuthMessage.UserNotFound);
    return user;
  }
}
module.exports = {
  AuthService: new AuthService(),
};
