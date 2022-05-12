const { validationResult } = require('express-validator')

function doValidations(req, res, next) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).json({
            err: {
                message: "Bad Request: There was an error with your request",
                validationErrors: errors.array()
            }
        })
    }
}

module.exports = {
    doValidations
}