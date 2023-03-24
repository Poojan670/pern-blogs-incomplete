const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerFile = require("../../swagger-output.json"),
  transactionMiddleware = require("../../middleware/transaction"),
  user = require("../../src/router/user"),
  category = require("../../src/router/category"),
  tags = require("../../src/router/tags");

module.exports = function (app) {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.use("/images", express.static("images"));
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, {
      swaggerOptions: { persistAuthorization: true },
    })
  );

  app.use(transactionMiddleware);

  app.use("", user);
  app.use("", category);
  app.use("", tags);

  app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
        timestamp: new Date(),
      },
    });
  });
};
