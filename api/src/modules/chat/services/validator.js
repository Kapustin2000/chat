import Joi from 'joi';

const JoinValidation = (data) => {
    const schema = Joi.object({
       type: Joi.string().required(),
       user_id: Joi.required()
    });

    return schema.validate(data);
};

export { JoinValidation};
