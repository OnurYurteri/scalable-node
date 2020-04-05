const { transports, createLogger, format } = require('winston');
const appRoot = require('app-root-path');

const winstonOptions = {
  file: {
    level: 'info',
    // filename: `${appRoot}/logs/app.log`,
    format: format.combine(format.timestamp(), format.json()),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const getLogger = (options) => {
  // eslint-disable-next-line new-cap
  return createLogger({
    transports: [new transports.File(options.file), new transports.Console(options.console)],
    exitOnError: false, // do not exit on handled exceptions
  });
};

const serverLogger = getLogger({
  file: { ...winstonOptions.file, filename: `${appRoot}/_logs/server.log` },
  console: { ...winstonOptions.console },
});

serverLogger.stream = {
  write: (message) => {
    serverLogger.info(message);
  },
};

exports.server = serverLogger;

exports.app = getLogger({
  file: { ...winstonOptions.file, filename: `${appRoot}/_logs/app.log` },
  console: { ...winstonOptions.console },
});

exports.user = getLogger({
  file: { ...winstonOptions.file, filename: `${appRoot}/_logs/user.log` },
  console: { ...winstonOptions.console },
});
