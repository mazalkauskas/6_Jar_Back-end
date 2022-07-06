const Joi = require('joi');

const incomePostSchema = Joi.object({
  type: Joi.string().trim().required(),
  subtype: Joi.string().trim().required(),
  description: Joi.string().trim(),
  quantity: Joi.number().required(),
});

const expensePostSchema = Joi.object({
  type: Joi.string().trim().required(),
  subtype: Joi.string().trim().required(),
  description: Joi.string().trim(),
  quantity: Joi.number().required(),
});

module.exports = {
  incomePostSchema,
  expensePostSchema,
};
