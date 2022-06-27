const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().lowercase().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().trim().required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(16).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
};
