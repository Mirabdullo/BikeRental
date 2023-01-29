const Joi = require("joi");

const managementSchema = Joi.object({
  bike_id: Joi.number().required(),
  client_id: Joi.number().required(),
  rental_start_date: Joi.date().required(),
  rental_end_date: Joi.date().required(),
  total_amount: Joi.number().required(),
  payment_status: Joi.boolean().default(false),
  rental_status: Joi.boolean().default(false),
  remarks: Joi.string().required(),
  user_id: Joi.number().required(),
});

module.exports = managementSchema;
