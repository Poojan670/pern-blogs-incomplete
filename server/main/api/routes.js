const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerFile =require('../../swagger-output.json'),
    user = require('../../src/router/user'),
    category = require('../../src/router/category');


module.exports = function (app) {
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001']
    }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static('public'));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { swaggerOptions: { persistAuthorization: true } }))


    app.use('', user)
    app.use('', category)
}