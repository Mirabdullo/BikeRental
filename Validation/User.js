const Joi = require("joi");

const managementSchema = Joi.object({
  username: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,30}$")),
  password: Joi.string(),
  avatar: Joi.string(),
  fullname: Joi.string(),
  contact: Joi.string().regex(/^\+998?(99|91|90|93|94|95|97|98|88|33|74|92|77|55){1}?\d{7}?$/),
  email: Joi.string().email(),
  user_category_id: Joi.number(),
  status: Joi.boolean().default(false),
});

module.exports = managementSchema;
