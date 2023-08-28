import * as Joi from 'joi';

// Validate the Summary data
const validateSummary = (summary: Summary) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        edition: Joi.string().required(),
        pages: Joi.string().required(),
        summary: Joi.string().required(),
    });

    return schema.validate(summary);
};


export {validateSummary}