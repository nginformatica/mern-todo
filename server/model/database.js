import mongodb from 'mongoose';
import bluebird from 'bluebird';
import config from 'config';

export function connect() {
    const mongoUri = config.get('mongoUri');

    mongodb.Promise = bluebird;

    mongodb.connect(mongoUri);

    mongodb.connection.on('connected', () => {
        console.log('Connected successfully to ' + mongoUri);
    });

    mongodb.connection.on('error', () => {
        console.log('Failed to connect to ' + mongoUri);
    });

    mongodb.connection.on('disconnected', () => {
        console.log('Disconnected from ' + mongoUri);
    });

    process.on('SIGINT', () => {
        mongodb.connection.close(() => {
            process.exit(0);
        });
    });
}
