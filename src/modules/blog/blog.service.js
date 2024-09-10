const autoBind = require("auto-bind");
const { BlogModel } = require("./blog.model");
const createHttpError = require("http-errors");
const { BlogMessages } = require("./blog.messages");
class BlogService {
  #blogModel;
  constructor() {
    autoBind(this);
    this.#blogModel = BlogModel;
  }
  async getListOfAllBlogs(search) {
    if (search.trim()) {
      return await this.#blogModel.find({
        $text: {
          $search: search,
        },
      });
    }
    return await this.#blogModel.find();
  }
  async createBlog(dto) {
    return await this.#blogModel.create(dto);
  }
  async createComment(commentDto) {
    const blog = await this.findBlog(commentDto.blogId);
    let comment = null;
    let reply = null;
    if (commentDto.replyTo) {
      // ابتدا تلاش می‌کنیم که replyTo یک کامنت باشد
      comment = blog.comments.id(commentDto.replyTo);
      if (!comment) {
        // اگر کامنت نبود، به دنبال ریپلای می‌گردیم
        blog.comments.forEach((c) => {
          const foundReply = c.replies.id(commentDto.replyTo);
          if (foundReply) {
            reply = foundReply;
            comment = c; // کامنت مربوط به این ریپلای را ذخیره می‌کنیم
          }
        });
      }
      if (reply) {
        // اگر ریپلای پیدا شد، بررسی کنیم که آیا اجازه ریپلای دارد
        if (!reply.allowToReply) {
          throw new createHttpError.BadRequest("امکان پاسخ به ریپلای نیست");
        }
        // اضافه کردن ریپلای به ریپلای
        reply.replies.push({
          author: commentDto.author,
          text: commentDto.text,
        });
        reply.allowToReply = false; // غیر فعال کردن قابلیت ریپلای بیشتر
      } else if (comment) {
        // اگر کامنت پیدا شد، اضافه کردن ریپلای به کامنت
        comment.replies.push({
          author: commentDto.author,
          text: commentDto.text,
        });
      } else {
        throw new createHttpError.NotFound("کامنت یافت نشد");
      }
    } else {
      // اضافه کردن کامنت جدید
      blog.comments.push({
        author: commentDto.author,
        text: commentDto.text,
      });
    }
    await blog.save();
    return true;
  }
  async findBlog(blogId) {
    const blog = await BlogModel.findById(blogId);
    if (!blog) throw new createHttpError.BadRequest(BlogMessages.NotFound);
    return blog;
  }
}

module.exports = {
  BlogService: new BlogService(),
};
