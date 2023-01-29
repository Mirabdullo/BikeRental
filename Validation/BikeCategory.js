const Joi = require("joi");

const managementSchema = Joi.object({
  category_name: Joi.string().required(),
  description: Joi.string().required(),

});

module.exports = managementSchema;
