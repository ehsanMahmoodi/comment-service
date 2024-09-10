const { Schema, model, Types } = require("mongoose");
const replySchema = new Schema(
  {
    author: { type: Types.ObjectId, required: true, ref: "user" },
    text: { type: String, required: true },
    isShow: { type: Boolean, default: false },
    allowToReply: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
    id: false,
    timestamps: { createdAt: true },
  }
);

const commentSchema = new Schema(
  {
    author: { type: Types.ObjectId, required: true, ref: "user" },
    text: { type: String, required: true },
    isShow: { type: Boolean, default: false },
    replies: [replySchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
    id: false,
    timestamps: { createdAt: true },
  }
);
const blogSchema = new Schema(
  {
    author: { type: Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true },
    text: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    versionKey: false,
    id: false,
  }
);
function autoPopulate(next) {
  this.populate([
    { path: "author", select: { _id: 1, firstName: 1, lastName: 1 } },
    { path: "comments.author", select: { _id: 1, firstName: 1, lastName: 1 } },
    {
      path: "comments.replies.author",
      select: { _id: 1, firstName: 1, lastName: 1 },
    },
  ]);
  next();
}
blogSchema.virtual("Author", {
  ref: "user",
  foreignField: "_id",
  localField: "author",
});
blogSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);
const BlogModel = model("blog", blogSchema);
module.exports = { BlogModel };
