const Joi = require("joi");

const managementSchema = Joi.object({
  bike_category_id: Joi.number().required(),
  shop_id: Joi.number().required(),
  bike_name: Joi.string().required(),
  specs: Joi.string().required(),
  rent_price: Joi.number().required(),
  availability: Joi.boolean().default(false),
  user_id: Joi.number().required(),
});

module.exports = managementSchema;
