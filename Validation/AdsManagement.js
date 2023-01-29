const Joi = require("joi");

const managementSchema = Joi.object({
  ad_name: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,30}$")).required(),
  shop_id: Joi.number().required(),
  banner_img: Joi.string().required(),
  description: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  ad_location: Joi.boolean().default(false),
  amount: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = managementSchema;
