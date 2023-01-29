const Joi = require("joi");

const managementSchema = Joi.object({
  group_name: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,30}$")).required(),
  description: Joi.string().required(),
  allow_add: Joi.boolean().default(false),
  allow_edit: Joi.boolean().default(false),
  allow_delete: Joi.boolean().default(false),
  allow_print: Joi.boolean().default(false),
  allow_import: Joi.boolean().default(false),
  allow_export: Joi.boolean().default(false),
});

module.exports = managementSchema;
