var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.listen(port);

/**
 * Parse incoming request bodies in a middleware before your handlers,
 * available under the req.body property.
 */
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./Api/index'));

app.use('/', function (req, res, next) {
    res.status(200).send("Website metadata handler");
});

console.log('RESTful API server started on: ' + port);

module.exports = app;