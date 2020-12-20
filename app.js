const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

const {initialize: initializeUnleashClient} = require('unleash-client');
const {start: startUnleashServer} = require('./helpers/unleash');

startUnleashServer()
    .then(()=> {
        const client = initializeUnleashClient({
            appName: 'my-project-feature-flags',
            instanceId: 'randomInt',
            url: 'http://localhost:4242/api/',
        });
        client.on('error', (e)=> console.error(e))
    })
    .catch(err => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
