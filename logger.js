const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

setInterval(() => {
  try {
    // Clear error.log file
    fs.writeFileSync("./logs/error.log", "");
    // Clear combined.log file
    fs.writeFileSync("./logs/combined.log", "");
  } catch (err) {
    logger.error(`Error clearing log files: ${err.message}`);
  }
}, 86400000);

module.exports = logger;
