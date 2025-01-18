const CustomError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(err.statusCode).json({ message: err.message});
    }
    return res.status(500).send('Something went wrong try again later');
}

module.exports = errorHandler;