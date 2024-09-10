const { Router } = require("express");
const { BlogController } = require("./blog.controller");
const { Authorization } = require("../../common/guard/authorization.guard");
const blogController = require("./blog.controller");

const router = Router();
router.get("/", BlogController.getListOfAllBlogs);
router.post(
  "/create",
  Authorization,
  BlogController.createBlog,
);
router.post('/:blogId/comment',Authorization,BlogController.createComment)
module.exports = {
  BlogRouter: router,
};
