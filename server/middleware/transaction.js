const { db } = require("../src/model/index");

const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];

const transactionMiddleware = async (req, res, next) => {
  if (safeMethods.includes(req.method.toUpperCase())) {
    next();
    return;
  }

  const t = await db.sequelize.transaction();
  req.transaction = t;
  res.on("finish", () => {
    if (res.statusCode < 400) {
      t.commit();
    } else {
      t.rollback();
    }
  });
  next();
};

module.exports = transactionMiddleware;
