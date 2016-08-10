const mongodb = require('mongoose');
const bluebird = require('bluebird');
const taskSchema = require('./taskSchema');

mongodb.Promise = bluebird;

const Task = mongodb.model('Task', taskSchema);

class TaskService {

  findByName(name, response) {
    // TODO
  }

  save(task, response) {
    new Task(task).save().then(() => {
      response.status(200).send();
    }, reason => {
      response.status(400).send(reason);
    });
  }

}

module.exports = new TaskService();
