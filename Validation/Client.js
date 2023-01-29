const Joi = require("joi");

const managementSchema = Joi.object({
  client_code: Joi.string(),
  avatar: Joi.string(),
  client_name: Joi.string(),
  email_address: Joi.string().email(),
  contact_number: Joi.string().regex(/^\+998?(99|91|90|93|94|95|97|98|88|33|74|92|77|55){1}?\d{7}?$/),
  complete_address: Joi.string(),
  username: Joi.string(),
  password: Joi.string(),
  status: Joi.boolean().default(false),
});

module.exports = managementSchema;
