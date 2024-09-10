const autoBind = require("auto-bind");
const { BlogService } = require("./blog.service");
const { BlogMessages } = require("./blog.messages");
class BlogController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = BlogService;
  }
  async createBlog(req, res, next) {
    try {
      const {
        body: { title, text },
      } = req;
      const newBlog = await this.#service.createBlog({
        title,
        text,
        author: req?.user?._id,
      });
      res.send({
        data: {
          message: BlogMessages.Created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfAllBlogs(req, res, next) {
    try {
      const {
        query: { search },
      } = req;
      const blogs = await this.#service.getListOfAllBlogs(search || "");
      res.send({
        data: { blogs },
      });
    } catch (error) {
      next(error);
    }
  }
  async createComment(req, res, next) {
    try {
      const {
        body: { text, replyTo, isShow },
        params: { blogId },
      } = req;
      await this.#service.createComment({author:req.user._id, text, replyTo, isShow,blogId})
      res.send({
        message:
          "نظر شما با موفقیت ثبت شد پس از تایید نهایی داخل سایت قرار میگیرد.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  BlogController: new BlogController(),
};
