import winston from 'winston';
const loggerOptions = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'admin-service'},
  transports: [
    new winston.transports.File({filename: './logs/error.log', level: 'error'}),
    new winston.transports.File({filename: './logs/combined.log'}),
  ],
};
export const logger : winston.Logger = winston.createLogger(loggerOptions);
