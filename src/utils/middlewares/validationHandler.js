const boom = require('@hapi/boom');
const joi = require('joi');

const validate = (data, schema) => {
    const { error } = joi.object(schema).validate(data);
    console.log(error)
    return error;
}


const validationHandler = (schema, check = "body") => {
    return function (req, res, next) {
        
        const failed = validate(req[check], schema);

        const {output: { error } } = boom.badRequest(failed)

        error ? next(output) : next()
    }
}

module.exports = validationHandler