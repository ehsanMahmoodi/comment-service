const AuthMessage = Object.freeze({
  login: "با موفقیت وارد شدید.",
  OtpCodeNotExpired: "رمز یکبار مصرف منقضی نشده است.",
  OtpCodeExpired: "رمز یکبار مصرف منقضی شده است.",
  OtpSend: "رمز یکبار مصرف برایتان ارسال شد.",
  UserNotFound: "کاربر یافت نشد.",
  OtpCodeIncorrect: "رمز یکبار مصرف اشتباه است",
  Unauthorized: "لطفا وارد حساب کاربری خود شوید.",
  NOTFOUND: "حساب کاربری یافت نشد.",
});
module.exports = { AuthMessage };
