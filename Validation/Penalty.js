const Joi = require("joi");

const managementSchema = Joi.object({
  rental_id: Joi.number().required(),
  penalty_amount: Joi.number().required(),
  payment_status: Joi.boolean().default(false),
  remarks: Joi.string().required(),
  paid_by: Joi.string().required(),
  user_id: Joi.number().required(),
});

module.exports = managementSchema;
