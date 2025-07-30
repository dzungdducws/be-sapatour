const Joi = require("joi");

exports.registerSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(10).required(),
  password: Joi.string().min(6).required(),
  isBusiness: Joi.allow(), 
});

exports.loginSchema = Joi.object({
  emailOrPhoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});
