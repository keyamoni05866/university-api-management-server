import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error.interface';
import config from '../config';
import zodErrorHandler from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpliFiedError = zodErrorHandler(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simpliFiedError = handleCastError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simpliFiedError = handleDuplicateError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
