export const GlopalErrorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  console.log(error);

  let path = error.path || undefined;
  let errormessage = error.message;
  res.status(statusCode).json({
    success: false,
    message: errormessage,
    path,
  });
};
