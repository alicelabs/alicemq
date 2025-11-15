const logger = require('./logger');

/**
 * Base application error class
 */
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * RabbitMQ connection error
 */
class RabbitMQError extends AppError {
  constructor(message = 'RabbitMQ connection error') {
    super(message, 503, true);
  }
}

/**
 * API error
 */
class APIError extends AppError {
  constructor(message = 'API request failed', statusCode = 500) {
    super(message, statusCode, true);
  }
}

/**
 * Validation error
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400, true);
  }
}

/**
 * Not found error
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, true);
  }
}

/**
 * Async error wrapper - catches errors in async route handlers
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Error logging utility
 */
const logError = (error, context = {}) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
    isOperational: error.isOperational,
    ...context,
  };

  if (error.isOperational) {
    logger.warn('Operational error occurred', errorInfo);
  } else {
    logger.error('Programming or unknown error occurred', errorInfo);
  }
};

/**
 * Express error handler middleware
 */
const errorHandler = (err, req, res, _next) => {
  // Log the error
  logError(err, {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        details: err,
      }),
    },
  });
};

/**
 * Handle unhandled promise rejections
 */
const handleUnhandledRejection = (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  // Don't exit in production, but log the error
  if (process.env.NODE_ENV === 'development') {
    throw reason;
  }
};

/**
 * Handle uncaught exceptions
 */
const handleUncaughtException = (error) => {
  logger.error('Uncaught Exception:', {
    message: error.message,
    stack: error.stack,
  });
  // In production, gracefully shutdown
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
};

module.exports = {
  AppError,
  RabbitMQError,
  APIError,
  ValidationError,
  NotFoundError,
  asyncHandler,
  logError,
  errorHandler,
  handleUnhandledRejection,
  handleUncaughtException,
};
