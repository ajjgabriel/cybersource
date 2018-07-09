/**
 * Created by smaheshw on 18/4/18.
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    expressValidation = require('express-validation'),
    expressWinston = require('express-winston');
    cors = require('cors'),
    routes = require('../server/routes/index.route'),
    httpStatus = require('http-status'),
    apiError = require('../server/helpers/apiError'),
    winstonInstance = require('./winston'),
    app = express();

app.use(expressWinston.logger({
    winstonInstance,
    meta: false, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new apiError(unifiedErrorMessage, err.status, true);
    return next(error);
} else if (!(err instanceof apiError)) {
    const error = new apiError(err.message, err.status, err.isPublic);
    return next(error);
}
return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new apiError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => //
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
);

module.exports = app;