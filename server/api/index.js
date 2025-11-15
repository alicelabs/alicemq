require('dotenv').config();
const express = require('express');
const apiController = require('../controllers/apiController');
const bodyParser = require('body-parser');
const logger = require('../utils/logger');
const {
  errorHandler,
  handleUnhandledRejection,
  handleUncaughtException,
} = require('../utils/errors');
const { performanceMiddleware, performanceMonitor } = require('../utils/performance');
const { getHealthStatus, getSystemHealth } = require('../utils/healthCheck');

const app = express();

// Setup global error handlers
process.on('unhandledRejection', handleUnhandledRejection);
process.on('uncaughtException', handleUncaughtException);

// Middleware
app.use(bodyParser.json());
app.use(performanceMiddleware);

// Health check endpoints
app.get('/health', async (req, res) => {
  try {
    const health = await getHealthStatus(null); // BlueBottle instance would go here if available
    res.status(health.status === 'healthy' ? 200 : 503).json(health);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/health/system', (req, res) => {
  try {
    const systemHealth = getSystemHealth();
    res.json(systemHealth);
  } catch (error) {
    logger.error('System health check failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/metrics', (req, res) => {
  try {
    const metrics = performanceMonitor.getSummary();
    res.json(metrics);
  } catch (error) {
    logger.error('Metrics retrieval failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// API routes
app.get('/api/v1/overview', apiController.overview);
app.get('/api/v1/exchanges', apiController.exchanges);
app.get('/api/v1/queues', apiController.queues);
app.get('/api/v1/consumers', apiController.consumers);
// app.get('/api/v1/messages', apiController.messages)
app.get('/api/v1/channels', apiController.channels);
app.get('/api/v1/onload', apiController.onLoad);
app.get('/api/v1/bindings', apiController.bindings);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.API_PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`API server listening on port ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
