

import Joi from '@hapi/joi';

//Register Validation

const registerValidation = (data) => {
    const schema = Joi.object( {
            name: Joi.string()
                .min(6),
            email: Joi.string()
                .min(6)
                .required()
                .email(),
            username: Joi.string()
                    .min(6)
                    .max(12)
                    .required(),
            password: Joi.string()
                    .min(6)
                    .required(),  
        }
    )
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object( {
            username: Joi.string()
                    .min(5)
                    .max(12)
                    .required(),
            password: Joi.string()
                    .min(6)
                    .required(),  
        }
    )
    return schema.validate(data);
}

const usernameValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
                .min(6)
                .required()
    })
    return schema.validate(data);
}

export {
    registerValidation as registerValidation,
    loginValidation as loginValidation,
    usernameValidation as usernameValidation
}