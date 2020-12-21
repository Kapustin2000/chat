import Joi from 'joi';

const JoinValidation = (data) => {
    const schema = Joi.object({
       type: Joi.number().min(3).required()
    });

    return schema.validate(data);
};

export { JoinValidation};
