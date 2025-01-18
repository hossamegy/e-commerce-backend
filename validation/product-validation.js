const Joi = require('joi');

const productSchema = Joi.object({
    imagePath: Joi.string(),
    name: Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required(),
    
    price: Joi.number()
        .min(5)
        .max(999999)
        .required(),
    
    discount: Joi.number()
        .min(0)
        .max(100)
        .default(0),  
    
    category: Joi.string()
        .valid('laptop', 'mobile', 'clothes', 'others')
        .required(),
    
    company: Joi.string()
        .trim()
        .min(1)
        .max(200)
        .required(),
    
    quantity: Joi.number()
        .min(1)
        .max(100000)
        .required(),
    
    date: Joi.date()
        .iso()
        .required(),
    
    description: Joi.string()
        .trim()
        .max(500),
    
    available: Joi.boolean()
        .default(true),

    rate: Joi.number()
        .min(0)
        .max(5)
        .default(null),

    review: Joi.string()
        .trim()
        .min(3)
        .max(300)
});


const productValidation = (reqBody) => {
    const { error } = productSchema.validate(reqBody, { abortEarly: false });
    return error;
};

module.exports = productValidation;