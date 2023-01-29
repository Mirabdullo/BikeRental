const Joi = require("joi");

const managementSchema = Joi.object({
  rental_id: Joi.number().required(),
  payment_type: Joi.number().required(),
  paid_by: Joi.string().required(),
  payment_date: Joi.date().required(),
  remarks: Joi.string().required(),
  user_id: Joi.number().required(),
});

module.exports = managementSchema;
