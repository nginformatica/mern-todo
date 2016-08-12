import mongodb from 'mongoose';
import bluebird from 'bluebird';
import config from '../config';

mongodb.Promise = bluebird;

export function connect() {
  mongodb.connect(config.mongoUri);

  mongodb.connection.on('connected', () => {
    console.log('Connected successfully to ' + config.mongoUri);
  });

  mongodb.connection.on('error', () => {
    console.log('Failed to connect to ' + config.mongoUri);
  });

  mongodb.connection.on('disconnected', () => {
    console.log('Disconnected from ' + config.mongoUri);
  });

  process.on('SIGINT', () => {
    mongodb.connection.close(() => {
      process.exit(0);
    });
  });
}
