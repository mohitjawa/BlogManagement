const Joi = require("joi");
const CodeAndMessage = require("../error-code-message/error-code-message");

exports.signUpVal = (req, res, cb) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
  });

  const result = Schema.validate(req.body);
  if (result.error) {
    return res.status(CodeAndMessage.successOk).json({
      code: CodeAndMessage.validationErrCode,
      httpCode: CodeAndMessage.successOk,
      message: result.error.message,
    });
  } else {
    cb(null, true);
  }
};
exports.loginVal = (req, res, cb) => {
  const Schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = Schema.validate(req.body);
  if (result.error) {
    return res.status(CodeAndMessage.successOk).json({
      code: CodeAndMessage.validationErrCode,
      httpCode: CodeAndMessage.successOk,
      message: result.error.message,
    });
  } else {
    cb(null, true);
  }
};
exports.updatePostVal = (req, res, cb) => {
  const Schema = Joi.object({
    postId: Joi.string().required(),
    title: Joi.string().allow(),
    content: Joi.string().allow(),
    isDeleted: Joi.boolean().allow(),
  });

  const result = Schema.validate(req.body);
  if (result.error) {
    return res.status(CodeAndMessage.successOk).json({
      code: CodeAndMessage.validationErrCode,
      httpCode: CodeAndMessage.successOk,
      message: result.error.message,
    });
  } else {
    cb(null, true);
  }
};
exports.updateCommenttVal = (req, res, cb) => {
  const Schema = Joi.object({
    commentId: Joi.string().required(),
    content: Joi.string().allow(),
    isDeleted: Joi.boolean().allow(),
  });

  const result = Schema.validate(req.body);
  if (result.error) {
    return res.status(CodeAndMessage.successOk).json({
      code: CodeAndMessage.validationErrCode,
      httpCode: CodeAndMessage.successOk,
      message: result.error.message,
    });
  } else {
    cb(null, true);
  }
};
