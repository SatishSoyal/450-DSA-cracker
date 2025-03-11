const Joi = require('joi');

const signupValidaton = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(4).max(50).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request - password must be of atleast 4 characters", error });
    }
    next();
};

const loginValidaton = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(4).max(50).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

module.exports = {
    signupValidaton,
    loginValidaton,
};
