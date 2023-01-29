const Joi = require("joi");


function koaError (status,dat){
    return {
        status: status,
        data: "",
        error: {
            stackMsg: '',
            systemName: "",
            friendlyMsg: dat,
            action: 'none',
            show: true
        },
        success: "Not success",
        notification: ""
    }
}

const validationPhoneNumber = (phone) => {
    const checkPhone = Joi.string()
      .regex(/^\+998?(99|91|90|93|94|95|97|98|88|33|74|92|77|55){1}?\d{7}?$/)
      .validate(phone);
    return checkPhone.error ? false : true;
  };
  
  const validationEmail = (email) => {
    const checkEmail = Joi.string().email().validate(email);
    return checkEmail.error ? false : true;
  };

module.exports = {koaError, validationEmail,validationPhoneNumber}