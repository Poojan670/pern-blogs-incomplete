const express = require('express'),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerFile =require('../../swagger-output.json'),
    user = require('../../src/router/user');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static('public'));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { swaggerOptions: { persistAuthorization: true } }))


    app.use('', user)
}