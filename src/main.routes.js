const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { Authorization } = require("./common/guard/authorization.guard");
const { BlogRouter } = require("./modules/blog/blog.routes");
const router = Router();
router.use('/auth',AuthRouter)
router.use('/user',Authorization,UserRouter)
router.use('/blog',BlogRouter)
module.exports = {
  MainRouter: router,
};
