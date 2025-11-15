const logger = require('./logger');

/**
 * Performance monitoring class
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.requestCount = 0;
    this.errorCount = 0;
  }

  /**
   * Start timing an operation
   */
  startTimer(label) {
    const startTime = process.hrtime.bigint();
    return {
      end: () => {
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
        this.recordMetric(label, duration);
        return duration;
      },
    };
  }

  /**
   * Record a metric
   */
  recordMetric(label, value) {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, {
        count: 0,
        total: 0,
        min: Infinity,
        max: -Infinity,
        avg: 0,
      });
    }

    const metric = this.metrics.get(label);
    metric.count++;
    metric.total += value;
    metric.min = Math.min(metric.min, value);
    metric.max = Math.max(metric.max, value);
    metric.avg = metric.total / metric.count;

    // Log slow operations (> 1000ms)
    if (value > 1000) {
      logger.warn(`Slow operation detected: ${label}`, {
        duration: value.toFixed(2) + 'ms',
      });
    }
  }

  /**
   * Get metrics for a specific label
   */
  getMetric(label) {
    return this.metrics.get(label) || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    const metrics = {};
    this.metrics.forEach((value, key) => {
      metrics[key] = {
        ...value,
        avg: parseFloat(value.avg.toFixed(2)),
        min: parseFloat(value.min.toFixed(2)),
        max: parseFloat(value.max.toFixed(2)),
      };
    });

    return {
      requests: {
        total: this.requestCount,
        errors: this.errorCount,
        errorRate:
          this.requestCount > 0
            ? ((this.errorCount / this.requestCount) * 100).toFixed(2) + '%'
            : '0%',
      },
      operations: metrics,
    };
  }

  /**
   * Increment request count
   */
  incrementRequests() {
    this.requestCount++;
  }

  /**
   * Increment error count
   */
  incrementErrors() {
    this.errorCount++;
  }

  /**
   * Reset all metrics
   */
  reset() {
    this.metrics.clear();
    this.requestCount = 0;
    this.errorCount = 0;
    logger.info('Performance metrics reset');
  }

  /**
   * Get summary report
   */
  getSummary() {
    const metrics = this.getAllMetrics();
    const memoryUsage = process.memoryUsage();

    return {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
        heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
        external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
      },
      metrics,
    };
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

/**
 * Express middleware to track request performance
 */
const performanceMiddleware = (req, res, next) => {
  const timer = performanceMonitor.startTimer(`${req.method} ${req.path}`);
  performanceMonitor.incrementRequests();

  // Override res.json to capture response time
  const originalJson = res.json;
  res.json = function (data) {
    const duration = timer.end();
    res.setHeader('X-Response-Time', `${duration.toFixed(2)}ms`);
    return originalJson.call(this, data);
  };

  // Track errors
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      performanceMonitor.incrementErrors();
    }
  });

  next();
};

/**
 * Utility to time async functions
 */
const timeAsync = async (label, fn) => {
  const timer = performanceMonitor.startTimer(label);
  try {
    const result = await fn();
    const duration = timer.end();
    logger.debug(`${label} completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
};

module.exports = {
  performanceMonitor,
  performanceMiddleware,
  timeAsync,
  PerformanceMonitor,
};
