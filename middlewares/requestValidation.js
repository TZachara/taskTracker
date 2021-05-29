const { body, validationResult } = require('express-validator');
const requestTaskCreationRules = () => {
    return [
        body('title', 'Title is missing.').not().isEmpty(),
        body('description', 'Description is missing.').not().isEmpty(),
        body('status', 'Status is missing.').not().isEmpty(),
    ];
};

const requestTaskUpdateRules = requestTaskCreationRules;

const requestTaskStatusUpdateRules = () => {
    return [body('status', 'Status is missing.').not().isEmpty()];
};

const requestValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ msg: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};

module.exports = {
    requestTaskCreationRules,
    requestTaskUpdateRules,
    requestTaskStatusUpdateRules,
    requestValidation,
};
