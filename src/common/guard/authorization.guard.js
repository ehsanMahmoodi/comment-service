const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { GuardMessages } = require("./guard.messages");
const { UserModel } = require("../../modules/user/user.model");
const Authorization = async (req, res, next) => {
  try {
    const data = getToken(req);

    const user = await UserModel.findOne(
      { _id: data?.userId },
      {
        firstName: 1,
        lastName: 1,
        _id: 1,
      }
    );
    if (!user) throw new createHttpError.Unauthorized(GuardMessages.NOTFOUND);
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
function getToken(req = {}) {
  const { accessToken } = req.cookies;
  const data = jwt.verify(accessToken, process.env.Access_TOKEN_SECRET_KEY);
  if (!data) throw new createHttpError.Unauthorized(GuardMessages.Unauthorized);
  return data;
}

module.exports = { Authorization };
