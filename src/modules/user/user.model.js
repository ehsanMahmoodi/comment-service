const { Schema, model, Types } = require("mongoose");
const otpSchema = new Schema({
  code: { type: String, default: 0 },
  expires: { type: Number, default: 0 },
});
const userSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: { type: String, default: "", lowercase: true },
    phone: { type: String, required: true, unique: true },
    verifiedPhone: { type: Boolean, default: false },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: { type: otpSchema },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthDay: { type: String, default: "" },
    role: { type: String, default: "USER" },
    courses: { type: [Types.ObjectId], ref: "course", default: [] },
  },
  {
    timestamps: true,
  },
);
userSchema.index({
  firstName: "text",
  lastName: "text",
  username: "text",
  email: "text",
  phone: "text",
});
const UserModel = model("user", userSchema);
module.exports = { UserModel };
