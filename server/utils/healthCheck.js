const os = require('os');
const logger = require('./logger');

/**
 * Get system health information
 */
const getSystemHealth = () => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  return {
    status: 'healthy',
    uptime: {
      seconds: Math.floor(uptime),
      formatted: formatUptime(uptime),
    },
    timestamp: new Date().toISOString(),
    memory: {
      used: formatBytes(memoryUsage.heapUsed),
      total: formatBytes(memoryUsage.heapTotal),
      external: formatBytes(memoryUsage.external),
      rss: formatBytes(memoryUsage.rss),
      percentage: ((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100).toFixed(2) + '%',
    },
    system: {
      platform: process.platform,
      nodeVersion: process.version,
      cpus: os.cpus().length,
      totalMemory: formatBytes(os.totalmem()),
      freeMemory: formatBytes(os.freemem()),
      loadAverage: os.loadavg(),
    },
  };
};

/**
 * Check RabbitMQ connection health
 */
const checkRabbitMQHealth = async (blueBottle) => {
  try {
    if (!blueBottle) {
      return {
        status: 'disconnected',
        message: 'No RabbitMQ connection instance',
      };
    }

    // Try to get data to verify connection
    const data = await blueBottle.getData();

    if (data && data.cluster_name) {
      return {
        status: 'connected',
        cluster: data.cluster_name,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 'unknown',
      message: 'Unable to verify connection',
    };
  } catch (error) {
    logger.error('RabbitMQ health check failed:', error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

/**
 * Get comprehensive health status
 */
const getHealthStatus = async (blueBottle) => {
  const systemHealth = getSystemHealth();
  const rabbitmqHealth = await checkRabbitMQHealth(blueBottle);

  const isHealthy =
    systemHealth.status === 'healthy' &&
    (rabbitmqHealth.status === 'connected' || rabbitmqHealth.status === 'disconnected');

  return {
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks: {
      system: systemHealth,
      rabbitmq: rabbitmqHealth,
    },
  };
};

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format uptime to human-readable format
 */
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

module.exports = {
  getSystemHealth,
  checkRabbitMQHealth,
  getHealthStatus,
};
