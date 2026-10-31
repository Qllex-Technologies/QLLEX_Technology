type LogLevel = "info" | "warn" | "error" | "debug";

interface LogMeta {
  [key: string]: unknown;
}

function formatLog(level: LogLevel, message: string, meta?: LogMeta): string {
  const payload = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    service: "qllex-api",
    message,
    ...(meta ? { meta } : {}),
  };
  return JSON.stringify(payload);
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    console.log(formatLog("info", message, meta));
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(formatLog("warn", message, meta));
  },
  error(message: string, meta?: LogMeta) {
    console.error(formatLog("error", message, meta));
  },
  debug(message: string, meta?: LogMeta) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatLog("debug", message, meta));
    }
  },
};
