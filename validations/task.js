const Joi = require('joi');
const { validateRequest } = require('./validate-request');

exports.createTaskSchema = (req, res, next) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(100).optional(),
        status: Joi.string().valid('pending', 'progress', 'completed').required(),
    })
    validateRequest(req, res, next, schema);
}

exports.updateTaskSchema = (req, res, next) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(100).optional(),
        status: Joi.string().valid('pending', 'progress', 'completed').required(),
    })
    validateRequest(req, res, next, schema);
}