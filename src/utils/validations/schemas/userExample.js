const joi = require('joi');

const UUID4Schema = joi.string().regex(/^[0-9a-fA-F]{25}$/).message('Invalid company id.')
const companyNameSchema = joi.string().max(50).regex(/^[\w'\-,.0-9][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a name, if you think its an error please contact with an administrator.');
const companyDescriptionSchema = joi.string().max(100).regex(/^[\w'\-,.0-9][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('Character not valid on description');
const arraySchema = joi.string().min(1).regex(/^\d+(,\d+)*$/).message('Array values must be numeric');
const accionesSchema = joi.string().min(1).regex(/^[0-9]{1,4}$/).message('Array values must be numeric');


const createCompanySchema = {
    
    name: companyNameSchema.required(),
    description: companyDescriptionSchema.required(),
    elements: arraySchema.required(),
    Acciones_en_circulacion: accionesSchema.required()
   
};


const updateCompanySchema = {
    _id: UUID4Schema.required() ,
    name: companyNameSchema,
    description: companyDescriptionSchema,
    elements: arraySchema
   
};
const getCompany = {
    name: companyNameSchema.required()
}


module.exports = {
    getCompany,
    UUID4Schema,
    createCompanySchema,
    updateCompanySchema
};