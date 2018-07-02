'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const boom = require('boom');

const initRoute = require('./api/init-route');
const formatHttpErrorMessage = require('./utils/format-http-error-message');

const app = express();
const router = express.Router({
    caseSensitive: true,
    strict: false
});

const { env } = process;
const PORT = env.HTTP_PORT || 80;

app.use(express.static('build'));
app.use('/rss', express.static('rss'));

// Почти все middlewares и роуты ожидают `req.body`
app.use(bodyParser.json());
// Настраиваем логирование: стандартный Apache combined вывод
app.use(morgan('combined'));
// Настраиваем роутер
app.use(initRoute(router));
// Если предыдущие middleware завершились с ошибкой, отсылает ответ с кодом ошибки
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    const httpError = err.isBoom ? err : boom.boomify(err, { statusCode: 500 });
    const errorMessage = formatHttpErrorMessage(req, httpError);

    logger.error(errorMessage, httpError);

    if (!res.headersSent) {
        res.status(httpError.output.statusCode).json(httpError.output.payload);
    }
});

app.listen(PORT, () => console.info(`listening on ${PORT}`));
