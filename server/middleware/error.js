exports.apiError = (res, msg, statusCode = 400, timestamp = new Date()) => {
  res.status(statusCode).json({
    msg,
    error: {
      statusCode,
      timestamp,
    },
  });
};

exports.apiSuccess = (res, msg, statusCode = 200, timestamp = new Date()) => {
  res.status(statusCode).json({
    msg,
    statusCode,
    timestamp,
  });
};
