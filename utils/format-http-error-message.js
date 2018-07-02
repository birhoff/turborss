const EOL = require('os').EOL;

/**
 * Формирует описание HTTP-ошибки.
 *
 * @param {Object} req
 * @param {Error} err
 * @returns {string}
 */
module.exports = (req, err) => {
    const statusCode = err.output.statusCode;
    const errorType = err.output.payload.error;
    // Убираем error.message из stack trace
    const errStack = err.stack ? err.stack.split(EOL).splice(1) : '';

    return [
        `HttpError ${statusCode} (${errorType}) [${req.method} ${req.originalUrl}]: ${err.message}`,
        errStack
    ].join(EOL);
};
