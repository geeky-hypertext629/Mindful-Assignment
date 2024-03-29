const Joi = require("joi");

module.exports = {
    // Auth
    signup: {
        body: Joi.object({
            email: Joi.string()
                .trim(true)
                .required()
                .email({ tlds: { allow: false } }),
            password: Joi.string().trim(true).required().min(6).max(50),
            username: Joi.string().trim(true).required().min(6).max(50),
            gender: Joi.string().trim(true).required().min(3).max(50),
            phone: Joi.string().trim(true).required().min(3).max(50),
            city: Joi.string().trim(true).required().min(3).max(50),
            stateName: Joi.string().trim(true).required().min(3).max(50),
            heardFrom : Joi.array(),
        }),
    },

    login: {
        body: Joi.object({
            email: Joi.string()
                .trim(true)
                .email({ tlds: { allow: false } })
                .required(),
            password: Joi.string().trim(true).required().min(6).max(50),
        }),
    },

    // User,
    modifyUser: {
        body: Joi.object({
            currentPassword: Joi.string().trim(true).required().min(6).max(50),
            username: Joi.string().trim(true).optional().min(3).max(50),
            password: Joi.string().trim(true).optional().min(6).max(50),
        }),
    },

    // Todo
    addTodo: {
        body: Joi.object({
            user_name: Joi.string().trim(true).required().min(1).max(2048),
            email: Joi.string().trim(true).required().min(1).max(2048),
            mobile: Joi.string().trim(true).required().min(1).max(2048),
            done: Joi.boolean().default(false),
        }),
    },

    modifyTodo: {
        body: Joi.object({
            user_name: Joi.string().trim(true).required().min(1).max(2048),
            email: Joi.string().trim(true).required().min(1).max(2048),
            mobile: Joi.string().trim(true).required().min(1).max(2048),
            done: Joi.boolean().optional(),
        }),
    },
};
