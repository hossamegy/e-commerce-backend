const { BadRequest } = require('../errors/export-errors');

const handleValidationErrors = (error) => {
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        throw new BadRequest(`Validation failed: ${errorMessages.join(', ')}`);
    }
};

module.exports = handleValidationErrors;