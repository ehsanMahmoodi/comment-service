const { randomInt } = require("crypto");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const path = require("path");
const randomNumberGenerator = (min = 10000, max = 99999) => {
  return randomInt(min, max);
};
const checkMongoDBValidId = (id) => {
  if (id && typeof id === "string") {
    if (isValidObjectId(id)) return true;
    throw new createHttpError.BadRequest("آیدی وارد شده نامعتبر هست.");
  }
  throw new createHttpError.BadRequest("آیدی وارد شده نامعتبر هست.");
};
const stringToArrayObjectId = async (data) => {
  if (typeof data === "string") {
    data = data.split(",").map((item) => {
      if (!isValidObjectId(item))
        throw new createHttpError.BadRequest(
          `آیدی وارد شده نامعتبر هست. id=>${item}`,
        );
      item = new Types.ObjectId(item);
      return item;
    });
  } else if (!Array.isArray(data)) {
    data = [];
  } else {
    data = data.map((item) => {
      if (!isValidObjectId(item))
        throw new createHttpError.BadRequest(
          `آیدی وارد شده نامعتبر هست. id=>${item}`,
        );
      item = new Types.ObjectId(item);
      return item;
    });
  }
  return data;
};
const listOfImagesFromRequest = (files, fileUploadPath) => {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((file) => file.replace(/\\/g, "/"));
  } else {
    return [];
  }
};
const deleteInvalidProperty = (list = {}) => {
  const listKeys = Object.keys(list);
  listKeys.map((key) => {
    if (!list[key]) delete list[key];
  });
  return list;
};
module.exports = {
  randomNumberGenerator,
  checkMongoDBValidId,
  stringToArrayObjectId,
  listOfImagesFromRequest,
  deleteInvalidProperty,
};
