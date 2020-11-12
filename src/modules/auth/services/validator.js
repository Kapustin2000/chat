import Joi from 'joi';

const RegisterValidation = (data) => {

    const schema = Joi.object({
       name: Joi.string().min(3).required(),
       email: Joi.string().email().required(),
       password: Joi.string().required()
    });

    return schema.validate(data);
};


const LoginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(data);
};

export { RegisterValidation, LoginValidation};
