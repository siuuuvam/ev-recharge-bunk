class Logger {
  constructor(module) {
    this.module = module;
  }

  log(action, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      module: this.module,
      action,
      ...details
    };
    console.log(`[${logEntry.timestamp}] [${this.module}] ${action}`, details);
    return logEntry;
  }

  error(action, error) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      module: this.module,
      action,
      error: error.message || error
    };
    console.error(`[ERROR] [${this.module}] ${action}`, error);
    return logEntry;
  }

  info(message) {
    console.info(`[INFO] [${this.module}] ${message}`);
  }
}
