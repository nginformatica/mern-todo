const mongodb = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/test';

class Database {

  connect() {
    mongodb.connect(databaseURL);

    mongodb.connection.on('connected', () => {
      console.log('Connected successfully to ' + databaseURL);
    });

    mongodb.connection.on('error', () => {
      console.log('Failed to connect to ' + databaseURL);
    });

    mongodb.connection.on('disconnected', () => {
      console.log('Disconnected from ' + databaseURL);
    });

    process.on('SIGINT', () => {
      mongodb.connection.close(() => {
        process.exit(0);
      });
    });
  }

}

module.exports = new Database();
