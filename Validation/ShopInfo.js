const Joi = require("joi");

const managementSchema = Joi.object({
  shop_name: Joi.string(),
  owner_name: Joi.string(),
  address: Joi.string(),
  email_address: Joi.string().email(),
  contact_no: Joi.string().regex(/^\+998?(99|91|90|93|94|95|97|98|88|33|74|92|77|55){1}?\d{7}?$/),
  website: Joi.string(),
  updated_id: Joi.number(),
});

module.exports = managementSchema;
